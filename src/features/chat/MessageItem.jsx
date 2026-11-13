import React, { useState } from 'react';
import { Heart, ThumbsUp } from 'lucide-react';
import { getUserMeta } from './chatConstants';

export default function MessageItem({ message, onLike }) {
  const [isLiking, setIsLiking] = useState(false);
  const meta = getUserMeta(message.sender);

  const handleLikeClick = () => {
    setIsLiking(true);
    onLike(message.id);
    setTimeout(() => setIsLiking(false), 300);
  };

  // Helper to highlight mentions in message text
  const renderMessageContent = (text) => {
    if (!text) return null;

    // Regex to match @mentions
    const mentionRegex = /(@[A-Za-z0-9_-]+)/g;
    const parts = text.split(mentionRegex);

    return parts.map((part, i) => {
      if (part.startsWith('@')) {
        return (
          <span
            key={i}
            className="inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded-md text-blue-700 bg-blue-50 font-medium text-xs border border-blue-200/60 shadow-xs"
          >
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="group flex items-start gap-3.5 px-4 py-2 hover:bg-slate-50/80 transition-colors rounded-xl">
      {/* Avatar Bubble */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 shadow-sm transition-transform group-hover:scale-105"
        style={{ backgroundColor: message.avatarColor || meta.color }}
        title={`${message.sender} (${meta.role})`}
      >
        {meta.initials}
      </div>

      {/* Message Content Container */}
      <div className="flex-1 min-w-0">
        {/* Header: Sender Name & Timestamp */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm font-semibold text-slate-900 hover:underline cursor-pointer">
            {message.sender}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {message.timestamp}
          </span>
        </div>

        {/* Message Bubble & Action Bar */}
        <div className="flex items-center justify-between gap-3">
          {/* Message Text Bubble (Clean rounded white bubble matching reference mockup) */}
          <div className="inline-block max-w-2xl bg-white border border-slate-200/80 rounded-2xl px-4 py-2.5 text-sm text-slate-800 shadow-xs leading-relaxed break-words">
            {renderMessageContent(message.text)}
          </div>

          {/* Right-end Like Button & Count (Mandatory Assignment 1 Requirement) */}
          <div className="flex items-center gap-1 shrink-0 self-center">
            <button
              type="button"
              onClick={handleLikeClick}
              aria-label={`Like message from ${message.sender}`}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-150 ${
                (message.likes || 0) > 0
                  ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-xs hover:bg-rose-100'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700 hover:bg-slate-50'
              } ${isLiking ? 'scale-110' : ''}`}
            >
              <Heart
                className={`w-3.5 h-3.5 transition-transform ${
                  (message.likes || 0) > 0 ? 'fill-rose-500 text-rose-500' : ''
                } ${isLiking ? 'animate-like' : ''}`}
              />
              <span className="font-semibold tabular-nums text-xs" data-testid={`like-count-${message.id}`}>
                {message.likes || 0}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
