import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Search, Sparkles, X } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import type { AiSearchResponse } from "@/types/ai";

interface AISearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const MIN_QUERY_LENGTH = 2;
const SEARCH_DEBOUNCE_MS = 280;

export default function AISearchOverlay({ open, onClose }: AISearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<AiSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const requestCounterRef = useRef(0);

  const trimmedQuery = useMemo(() => query.trim(), [query]);
  const shortcutLabel = useMemo(() => {
    if (typeof navigator === "undefined") return "Ctrl + K";
    return /mac/i.test(navigator.platform) ? "Cmd + K" : "Ctrl + K";
  }, []);

  const runSearch = useCallback(async (nextQuery: string) => {
    const requestId = ++requestCounterRef.current;
    setLoading(true);
    setError(null);

    try {
      const response = await apiRequest("POST", "/api/ai/search", {
        query: nextQuery,
        limit: 8,
      });
      const payload = (await response.json()) as AiSearchResponse;

      if (requestId !== requestCounterRef.current) {
        return;
      }

      setResult(payload);
    } catch (searchError) {
      if (requestId !== requestCounterRef.current) {
        return;
      }

      const message =
        searchError instanceof Error ? searchError.message : "Search request failed.";
      setError(message);
      setResult(null);
    } finally {
      if (requestId === requestCounterRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    window.setTimeout(() => inputRef.current?.focus(), 0);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return undefined;
    if (trimmedQuery.length < MIN_QUERY_LENGTH) {
      setResult(null);
      setError(null);
      setLoading(false);
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      void runSearch(trimmedQuery);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeout);
  }, [open, runSearch, trimmedQuery]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[115] bg-primary/95 backdrop-blur-md px-4 sm:px-6 lg:px-12 pt-24 pb-10 overflow-y-auto"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-2xl border border-white/15 bg-black/30 shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
            <Search className="h-5 w-5 text-white/70" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && trimmedQuery.length >= MIN_QUERY_LENGTH) {
                  void runSearch(trimmedQuery);
                }
              }}
              placeholder="Search anything about the site..."
              className="flex-1 bg-transparent text-white placeholder:text-white/45 outline-none text-base"
              type="search"
            />
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
              ESC
            </button>
          </div>

          <div className="px-4 py-3 border-b border-white/10 bg-black/25">
            <p className="text-sm text-white/80 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent2" />
              AI-powered site search with referenced results
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-white/45">
              Shortcut: {shortcutLabel}
            </p>
          </div>

          <div className="p-4 space-y-4">
            {trimmedQuery.length < MIN_QUERY_LENGTH && (
              <p className="text-sm text-white/70">
                Type at least {MIN_QUERY_LENGTH} characters to search.
              </p>
            )}

            {loading && (
              <p className="text-sm text-white/70 animate-pulse">
                Searching and ranking references...
              </p>
            )}

            {error && (
              <div className="rounded-lg border border-red-400/35 bg-red-500/10 px-3 py-2 text-sm text-red-100">
                {error}
              </div>
            )}

            {result && (
              <>
                <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-3">
                  <p className="text-sm text-white/80">{result.summary}</p>
                  <p className="mt-2 text-xs text-white/50 uppercase tracking-[0.08em]">
                    Provider: {result.provider}
                  </p>
                </div>

                <div className="space-y-3">
                  {result.results.length === 0 && !loading && (
                    <p className="text-sm text-white/70">No references found for this query yet.</p>
                  )}

                  {result.results.map((entry) => {
                    const external =
                      entry.url.startsWith("http://") || entry.url.startsWith("https://");

                    return (
                      <article
                        key={entry.id}
                        className="rounded-lg border border-white/10 bg-black/25 px-3 py-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            {external ? (
                              <a
                                href={entry.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-semibold text-accent2 hover:text-accent1 transition-colors inline-flex items-center gap-1"
                              >
                                {entry.title}
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            ) : (
                              <Link
                                href={entry.url}
                                className="text-sm font-semibold text-accent2 hover:text-accent1 transition-colors"
                                onClick={() => {
                                  onClose();
                                  window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                              >
                                {entry.title}
                              </Link>
                            )}
                            <p className="text-xs text-white/75 leading-relaxed">{entry.excerpt}</p>
                          </div>

                          <span className="text-[10px] uppercase tracking-[0.08em] text-white/45">
                            {entry.sourceType}
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
