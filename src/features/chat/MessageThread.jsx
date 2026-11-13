import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import { MessageSquare } from 'lucide-react';

export default function MessageThread({ messages, onLikeMessage, typingUsers = [], channelName = 'Introductions' }) {
  const bottomRef = useRef(null);

  // Auto scroll to bottom whenever messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingUsers]);

  return (
    <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
      {/* Channel Welcome Banner */}
      <div className="px-4 py-6 mb-4 border-b border-slate-100 text-slate-500">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Welcome to #{channelName}!
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-lg">
          This is the start of the #{channelName} channel. Send a message to chat with your teammates or mention them using @.
        </p>
      </div>

      {/* Date Divider */}
      <div className="relative my-4 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <span className="relative bg-slate-50 px-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
          Today
        </span>
      </div>

      {/* Message List */}
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          onLike={onLikeMessage}
        />
      ))}

      {/* Typing Indicator */}
      {typingUsers.length > 0 && (
        <div className="flex items-center gap-2 px-4 py-2 text-xs text-slate-400 italic">
          <span className="inline-flex gap-1 items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
          <span>{typingUsers.join(', ')} is typing...</span>
        </div>
      )}

      {/* Anchor for auto scroll */}
      <div ref={bottomRef} />
    </div>
  );
}
