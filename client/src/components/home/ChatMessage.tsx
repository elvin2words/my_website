import React from "react";

export default function ChatMessage({ from, text, actions }) {
  const isUser = from === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-3 py-2 rounded-lg max-w-[80%] text-sm ${
          isUser
            ? "bg-indigo-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        <p>{text}</p>
        {actions && (
          <div className="flex flex-wrap gap-2 mt-2">
            {actions.map((a, idx) => (
              <a
                key={idx}
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 text-xs bg-white border rounded-md hover:bg-gray-100"
              >
                {a.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
