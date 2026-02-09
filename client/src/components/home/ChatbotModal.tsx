import React, { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { apiRequest } from "@/lib/queryClient";
import type { AiAction, AiChatHistoryItem, AiChatResponse, AiReference } from "@/types/ai";

interface ChatbotModalProps {
  onClose: () => void;
}

interface ChatUiMessage {
  id: string;
  from: "user" | "bot";
  text: string;
  actions?: AiAction[];
  references?: AiReference[];
  pending?: boolean;
}

const createMessageId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
const STREAM_CHUNK_SIZE = 3;
const STREAM_INTERVAL_MS = 18;

export default function ChatbotModal({ onClose }: ChatbotModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<number | null>(null);
  const unmountedRef = useRef(false);
  const [messages, setMessages] = useState<ChatUiMessage[]>([
    {
      id: createMessageId(),
      from: "bot",
      text: "Ask me anything about Elvin, projects, services, or where to find things on this site.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vh, setVh] = useState(window.innerHeight);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const clearTypingTimer = () => {
    if (typingTimerRef.current !== null) {
      window.clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      unmountedRef.current = true;
      clearTypingTimer();
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    const handleResize = () => {
      setVh(window.visualViewport?.height || window.innerHeight);
    };
    window.visualViewport?.addEventListener("resize", handleResize);
    return () => window.visualViewport?.removeEventListener("resize", handleResize);
  }, []);

  const streamBotReply = async (pendingId: string, payload: AiChatResponse) => {
    const fullReply = payload.reply?.trim() || "";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!fullReply || prefersReducedMotion) {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === pendingId
            ? {
                id: pendingId,
                from: "bot",
                text: fullReply || "No response generated.",
                actions: payload.actions,
                references: payload.references,
              }
            : message,
        ),
      );
      return;
    }

    clearTypingTimer();
    let cursor = 0;

    await new Promise<void>((resolve) => {
      typingTimerRef.current = window.setInterval(() => {
        if (unmountedRef.current) {
          clearTypingTimer();
          resolve();
          return;
        }

        cursor = Math.min(fullReply.length, cursor + STREAM_CHUNK_SIZE);
        const partial = fullReply.slice(0, cursor);
        const done = cursor >= fullReply.length;

        setMessages((prev) =>
          prev.map((message) =>
            message.id === pendingId
              ? {
                  id: pendingId,
                  from: "bot",
                  text: partial,
                  pending: !done,
                  actions: done ? payload.actions : undefined,
                  references: done ? payload.references : undefined,
                }
              : message,
          ),
        );

        if (done) {
          clearTypingTimer();
          resolve();
        }
      }, STREAM_INTERVAL_MS);
    });
  };

  const sendMessage = async () => {
    const userText = input.trim();
    if (!userText || isSending) return;

    const userMessage: ChatUiMessage = {
      id: createMessageId(),
      from: "user",
      text: userText,
    };
    const pendingId = createMessageId();
    const pendingMessage: ChatUiMessage = {
      id: pendingId,
      from: "bot",
      text: "",
      pending: true,
    };

    const history: AiChatHistoryItem[] = messages
      .filter((message) => !message.pending)
      .map((message) => ({
        role: message.from === "user" ? "user" : "assistant",
        content: message.text,
      }));

    setInput("");
    setError(null);
    setIsSending(true);
    setMessages((prev) => [...prev, userMessage, pendingMessage]);

    try {
      const response = await apiRequest("POST", "/api/ai/chat", {
        message: userText,
        history,
      });
      const payload = (await response.json()) as AiChatResponse;
      await streamBotReply(pendingId, payload);
    } catch (chatError) {
      const message =
        chatError instanceof Error ? chatError.message : "AI chat is temporarily unavailable.";
      setError(message);
      setMessages((prev) =>
        prev.map((entry) =>
          entry.id === pendingId
            ? {
                id: pendingId,
                from: "bot",
                text: "I could not reach AI services right now. Please try again in a moment.",
              }
            : entry,
        ),
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 p-3 bg-black/65 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        style={{ height: vh * 0.77, maxHeight: vh - 32 }}
        className="bg-gradient-to-b from-gray-900 to-gray-800 w-full max-w-md rounded-2xl shadow-xl flex flex-col overflow-hidden"
      >
        <div className="flex justify-between items-center px-4 py-3 border-b shrink-0">
          <h2 className="font-semibold text-lg">Ask Elvin AI</h2>
          <button onClick={onClose}>
            <X size={22} className="text-gray-600 hover:text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-accent6">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              from={message.from}
              text={message.text}
              actions={message.actions}
              references={message.references}
              pending={message.pending}
            />
          ))}
          <div ref={chatEndRef} />
        </div>

        {error && (
          <div className="px-3 py-2 text-xs text-red-200 border-t border-white/10 bg-red-500/10">
            {error}
          </div>
        )}

        <div className="flex items-center p-3 border-t shrink-0">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && void sendMessage()}
            placeholder="Ask something..."
            disabled={isSending}
            className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800 disabled:opacity-65"
          />
          <button
            onClick={() => void sendMessage()}
            disabled={isSending || !input.trim()}
            className="ml-2 p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-65 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
