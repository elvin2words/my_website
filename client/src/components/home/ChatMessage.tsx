import React from "react";
import { ExternalLink } from "lucide-react";
import { Link } from "wouter";
import type { AiAction, AiReference } from "@/types/ai";

interface ChatMessageProps {
  from: "user" | "bot";
  text: string;
  actions?: AiAction[];
  references?: AiReference[];
  pending?: boolean;
}

export default function ChatMessage({
  from,
  text,
  actions,
  references,
  pending = false,
}: ChatMessageProps) {
  const isUser = from === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-3 py-2 rounded-lg max-w-[88%] text-sm ${
          isUser
            ? "bg-indigo-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        <p>{text}</p>

        {pending && (
          <p className="mt-2 text-xs text-gray-500 animate-pulse">Thinking...</p>
        )}

        {actions && actions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {actions.map((action) => {
              const external =
                action.link.startsWith("http://") || action.link.startsWith("https://");

              if (external) {
                return (
                  <a
                    key={`${action.label}-${action.link}`}
                    href={action.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 text-xs bg-white border rounded-md hover:bg-gray-100 inline-flex items-center gap-1"
                  >
                    {action.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                );
              }

              return (
                <Link
                  key={`${action.label}-${action.link}`}
                  href={action.link}
                  className="px-2 py-1 text-xs bg-white border rounded-md hover:bg-gray-100 inline-flex items-center"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  {action.label}
                </Link>
              );
            })}
          </div>
        )}

        {references && references.length > 0 && (
          <div className="mt-3 pt-2 border-t border-black/10 space-y-1.5">
            <p className="text-[11px] uppercase tracking-[0.08em] text-gray-500">References</p>
            {references.slice(0, 3).map((reference) => {
              const external =
                reference.url.startsWith("http://") || reference.url.startsWith("https://");

              if (external) {
                return (
                  <a
                    key={reference.id}
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs text-indigo-700 hover:text-indigo-800 underline"
                  >
                    {reference.title}
                  </a>
                );
              }

              return (
                <Link
                  key={reference.id}
                  href={reference.url}
                  className="block text-xs text-indigo-700 hover:text-indigo-800 underline"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  {reference.title}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
