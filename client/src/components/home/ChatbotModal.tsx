import React, { useCallback, useEffect, useRef, useState } from "react";
import { X, Send } from "lucide-react";
import ChatMessage from "./ChatMessage";
import type { AiAction, AiChatHistoryItem, AiReference } from "@/types/ai";

interface ChatbotModalProps {
  onClose: () => void;
}

interface ChatEntry {
  from: "user" | "bot";
  text: string;
  actions?: AiAction[];
  references?: AiReference[];
}

interface LocalReply {
  text: string;
  actions?: AiAction[];
  context?: string;
}

const LOCAL_FALLBACKS = [
  {
    keywords: ["hello", "hi", "hey"],
    reply: {
      text: "Hey, I am ElvinBot. I can share Elvin's work, projects, and services.",
      actions: [
        { label: "View Resume", link: "/resume" },
        { label: "Contact", link: "/contact-profile-card" },
      ],
    },
  },
  {
    keywords: ["services", "work", "do"],
    reply: {
      text: "Elvin works across engineering, software, and creative technology.",
      actions: [
        { label: "Engineering", link: "/engineer" },
        { label: "Developer", link: "/developer" },
        { label: "Creative", link: "/creative/portfolio" },
      ],
      context: "services",
    },
  },
  {
    keywords: ["hire", "job", "contact"],
    reply: {
      text: "You can hire Elvin for engineering, software, and creative project delivery.",
      actions: [
        { label: "Contact Card", link: "/contact-profile-card" },
        { label: "Resume", link: "/resume" },
      ],
    },
  },
  {
    keywords: ["engineering", "power", "solar", "grid"],
    reply: {
      text: "Elvin focuses on power systems, smart grids, and renewable energy solutions.",
      context: "engineering",
    },
  },
  {
    keywords: ["photography", "photo", "gallery"],
    reply: {
      text: "You can explore visual work and photography from the gallery and design circles.",
      actions: [{ label: "Open Gallery", link: "/creative/gallery" }],
      context: "photography",
    },
  },
  {
    keywords: ["resume", "cv"],
    reply: {
      text: "You can view Elvin's resume from the resume page.",
      actions: [{ label: "Open Resume", link: "/resume" }],
      context: "resume",
    },
  },
];

function getLocalReply(message: string, currentContext: string | null): LocalReply {
  const lower = message.toLowerCase();
  const match = LOCAL_FALLBACKS.find((entry) =>
    entry.keywords.some((keyword) => lower.includes(keyword)),
  );

  if (match) {
    return match.reply;
  }

  if (["more", "tell me more", "details", "elaborate"].some((token) => lower.includes(token))) {
    if (currentContext === "services") {
      return {
        text: "Elvin can support end-to-end delivery, from concept design to technical implementation.",
      };
    }
    if (currentContext === "engineering") {
      return {
        text: "Engineering work includes analysis, system design, and practical project execution.",
      };
    }
    if (currentContext === "photography") {
      return {
        text: "For visual work, check the gallery and design sections for current creative outputs.",
        actions: [{ label: "View Design Circle", link: "/creative/portfolio" }],
      };
    }
  }

  return {
    text: "I could not reach the AI server, so I switched to local mode. Ask about services, projects, resume, engineering, or contact.",
  };
}

async function requestBackendReply(message: string, history: AiChatHistoryItem[]) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`AI chat request failed with status ${response.status}`);
    }

    const data = (await response.json()) as {
      reply?: unknown;
      actions?: unknown;
      references?: unknown;
    };
    return {
      text: typeof data.reply === "string" ? data.reply : "",
      actions: Array.isArray(data.actions) ? data.actions : [],
      references: Array.isArray(data.references) ? data.references : [],
    };
  } finally {
    clearTimeout(timeout);
  }
}

export default function ChatbotModal({ onClose }: ChatbotModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const historyRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<ChatEntry[]>([
    { from: "bot", text: "Hey, I am ElvinBot. Ask me anything about Elvin." },
  ]);
  const [input, setInput] = useState("");
  const [context, setContext] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [vh, setVh] = useState(
    typeof window === "undefined" ? 720 : window.visualViewport?.height || window.innerHeight,
  );

  const focusInput = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
    const cursorPosition = inputRef.current.value.length;
    inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
  }, []);

  const appendLocalFallback = useCallback((messageText: string, activeContext: string | null) => {
    const localReply = getLocalReply(messageText, activeContext);
    if (localReply.context) {
      setContext(localReply.context);
    }

    setMessages((previous) => [
      ...previous,
      {
        from: "bot",
        text: localReply.text,
        actions: localReply.actions,
      },
    ]);
  }, []);

  const sendMessage = useCallback(async () => {
    const messageText = input.trim();
    if (!messageText || isSending) return;

    const userMessage: ChatEntry = { from: "user", text: messageText };
    const nextConversation = [...messages, userMessage];
    const history: AiChatHistoryItem[] = nextConversation.map((entry) => ({
      role: entry.from === "user" ? "user" : "assistant",
      content: entry.text,
    }));

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setIsSending(true);
    requestAnimationFrame(focusInput);

    try {
      const backendReply = await requestBackendReply(messageText, history);
      if (!backendReply.text) {
        appendLocalFallback(messageText, context);
      } else {
        setMessages((previous) => [
          ...previous,
          {
            from: "bot",
            text: backendReply.text,
            actions: backendReply.actions,
            references: backendReply.references,
          },
        ]);
      }
    } catch {
      appendLocalFallback(messageText, context);
    } finally {
      setIsSending(false);
      requestAnimationFrame(focusInput);
    }
  }, [appendLocalFallback, context, focusInput, input, isSending, messages]);

  const handleHistoryWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    const historyElement = historyRef.current;
    if (!historyElement) return;

    const canScrollDown =
      event.deltaY > 0 &&
      historyElement.scrollTop + historyElement.clientHeight < historyElement.scrollHeight;
    const canScrollUp = event.deltaY < 0 && historyElement.scrollTop > 0;

    if (canScrollDown || canScrollUp) {
      historyElement.scrollTop += event.deltaY;
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

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
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  useEffect(() => {
    const handleResize = () => {
      setVh(window.visualViewport?.height || window.innerHeight);
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 p-3 bg-black/65 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        onWheelCapture={handleHistoryWheel}
        style={{ height: vh * 0.77, maxHeight: vh - 32 }}
        className="bg-gradient-to-b from-gray-900 to-gray-800 w-full max-w-md rounded-2xl shadow-xl flex flex-col overflow-hidden"
      >
        <div className="flex justify-between items-center px-4 py-3 border-b shrink-0">
          <h2 className="font-semibold text-lg">Ask ElvinBot 🤖</h2>
          <button onClick={onClose}>
            <X size={22} className="text-gray-600 hover:text-white" />
          </button>
        </div>

        <div
          ref={historyRef}
          tabIndex={0}
          className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-accent6 overscroll-contain touch-pan-y"
        >
          {messages.map((message, index) => (
            <ChatMessage
              key={`${message.from}-${index}-${message.text.slice(0, 12)}`}
              from={message.from}
              text={message.text}
              actions={message.actions}
              references={message.references}
            />
          ))}

          {isSending && <ChatMessage from="bot" text="" pending />}
          <div ref={chatEndRef} />
        </div>

        <div className="flex items-center p-3 border-t shrink-0">
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask something..."
            className="flex-1 rounded-lg border border-gray-600 bg-gray-900/80 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={sendMessage}
            disabled={isSending}
            className="ml-2 p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-60"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
