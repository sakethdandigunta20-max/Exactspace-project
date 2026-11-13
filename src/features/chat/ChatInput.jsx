import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, AtSign } from 'lucide-react';
import MentionList from './MentionList';
import EmojiPicker from './EmojiPicker';
import { OFFICIAL_USER_LIST } from './chatConstants';

export default function ChatInput({ onSendMessage, onTyping }) {
  const [text, setText] = useState('');
  const [showMentionList, setShowMentionList] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [mentionStartIndex, setMentionStartIndex] = useState(-1);
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const textareaRef = useRef(null);
  const containerRef = useRef(null);

  // Filter users based on query
  const filteredUsers = OFFICIAL_USER_LIST.filter((user) =>
    user.toLowerCase().startsWith(mentionQuery.toLowerCase())
  );

  // Handle outside clicks to close popovers
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowMentionList(false);
        setShowEmojiPicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTextChange = (e) => {
    const val = e.target.value;
    const cursor = e.target.selectionStart;
    setText(val);

    if (onTyping) {
      onTyping(val.length > 0);
    }

    // Check if user just typed '@' or is typing a mention
    const textBeforeCursor = val.slice(0, cursor);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');

    if (lastAtIndex !== -1) {
      // Check if character before '@' is start of text or whitespace
      const charBeforeAt = textBeforeCursor[lastAtIndex - 1];
      const isWordBoundary = !charBeforeAt || /\s/.test(charBeforeAt);

      if (isWordBoundary) {
        const query = textBeforeCursor.slice(lastAtIndex + 1);
        // Only consider it a mention query if it doesn't contain spaces
        if (!/\s/.test(query)) {
          setShowMentionList(true);
          setMentionQuery(query);
          setMentionStartIndex(lastAtIndex);
          setSelectedMentionIndex(0);
          return;
        }
      }
    }

    setShowMentionList(false);
  };

  const insertMention = (userName) => {
    if (mentionStartIndex !== -1) {
      const before = text.slice(0, mentionStartIndex);
      const after = text.slice(mentionStartIndex + 1 + mentionQuery.length);
      const newText = `${before}@${userName} ${after}`;
      setText(newText);
      setShowMentionList(false);

      // Return focus and reposition cursor
      setTimeout(() => {
        if (textareaRef.current) {
          const newCursorPos = before.length + userName.length + 2;
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
        }
      }, 0);
    }
  };

  const handleSelectEmoji = (emoji) => {
    const cursor = textareaRef.current?.selectionStart || text.length;
    const before = text.slice(0, cursor);
    const after = text.slice(cursor);
    setText(`${before}${emoji}${after}`);
    setShowEmojiPicker(false);

    setTimeout(() => {
      if (textareaRef.current) {
        const newPos = cursor + emoji.length;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newPos, newPos);
      }
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (showMentionList && filteredUsers.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedMentionIndex((prev) => (prev + 1) % filteredUsers.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedMentionIndex((prev) =>
          prev === 0 ? filteredUsers.length - 1 : prev - 1
        );
        return;
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        insertMention(filteredUsers[selectedMentionIndex]);
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setShowMentionList(false);
        return;
      }
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    // Extract any @mentions present in the message
    const mentionMatches = [...trimmed.matchAll(/@([A-Za-z0-9_-]+)/g)].map((m) => m[1]);

    onSendMessage(trimmed, mentionMatches);
    setText('');
    setShowMentionList(false);
    setShowEmojiPicker(false);
    if (onTyping) onTyping(false);

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Button to trigger @ mention popup explicitly
  const triggerMentionPopup = () => {
    const cursor = textareaRef.current?.selectionStart || text.length;
    const before = text.slice(0, cursor);
    const after = text.slice(cursor);
    const newText = `${before}@${after}`;
    setText(newText);
    setMentionStartIndex(cursor);
    setMentionQuery('');
    setShowMentionList(true);
    setSelectedMentionIndex(0);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(cursor + 1, cursor + 1);
      }
    }, 0);
  };

  return (
    <div ref={containerRef} className="relative p-4 bg-white border-t border-slate-200">
      {/* Mention Dropdown */}
      {showMentionList && (
        <MentionList
          query={mentionQuery}
          selectedIndex={selectedMentionIndex}
          onSelectUser={insertMention}
          onClose={() => setShowMentionList(false)}
        />
      )}

      {/* Emoji Picker Popover */}
      {showEmojiPicker && (
        <EmojiPicker
          onSelectEmoji={handleSelectEmoji}
          onClose={() => setShowEmojiPicker(false)}
        />
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        {/* Main Input Box (designed exactly as in team-chat-intro.gif) */}
        <div className="relative flex-1 flex items-center bg-slate-50 border border-slate-300 rounded-2xl shadow-inner focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-500 focus-within:bg-white transition-all">
          <input
            ref={textareaRef}
            type="text"
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder="Type Message"
            className="w-full py-3.5 pl-4 pr-24 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
            aria-label="Type your message"
          />

          {/* Inline Action Buttons (Right end of textbox) */}
          <div className="absolute right-2 flex items-center gap-1 text-slate-400">
            {/* Mention Button */}
            <button
              type="button"
              onClick={triggerMentionPopup}
              title="Mention a team member (@)"
              className="p-1.5 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <AtSign className="w-4 h-4" />
            </button>

            {/* Emoji Button (matching the smiley icon in team-chat-intro.gif) */}
            <button
              type="button"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              title="Add Emoji"
              className="p-1.5 rounded-lg hover:text-amber-500 hover:bg-amber-50 transition-colors"
            >
              <Smile className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim()}
          className={`h-11 px-5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all duration-150 ${
            text.trim()
              ? 'bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-md shadow-blue-500/20 cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-75'
          }`}
          aria-label="Send message"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Helper hint */}
      <div className="flex items-center justify-between mt-2 text-[11px] text-slate-400 px-1">
        <span>
          Tip: Type <kbd className="font-mono bg-slate-100 text-slate-600 px-1 py-0.5 rounded border border-slate-200">@</kbd> to mention a team member, or use the emoji picker.
        </span>
        <span className="hidden sm:inline">
          Press <kbd className="font-mono bg-slate-100 text-slate-600 px-1 py-0.5 rounded border border-slate-200">Enter</kbd> to send
        </span>
      </div>
    </div>
  );
}
