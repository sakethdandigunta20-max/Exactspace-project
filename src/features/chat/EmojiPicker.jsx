import React, { useState, useMemo } from 'react';
import { POPULAR_EMOJIS } from './chatConstants';
import { Smile, Search, X } from 'lucide-react';

const CATEGORIES = ['All', 'Reactions', 'Smileys', 'Celebration', 'Objects', 'Food & Drink'];

export default function EmojiPicker({ onSelectEmoji, onClose }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmojis = useMemo(() => {
    return POPULAR_EMOJIS.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.emoji.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div
      className="absolute bottom-full right-4 mb-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl"
      role="dialog"
      aria-label="Emoji Picker"
    >
      {/* Header & Search */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5 text-slate-700 font-semibold text-xs">
          <Smile className="w-4 h-4 text-amber-500" />
          <span>Pick an Emoji</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close emoji picker"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-2">
        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search emoji (e.g. thumb, fire)..."
          className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
          autoFocus
        />
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-2 no-scrollbar text-[11px]">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-2 py-0.5 rounded-full whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-blue-600 text-white font-medium shadow-xs'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of emojis */}
      <div className="grid grid-cols-6 gap-1 max-h-48 overflow-y-auto p-1">
        {filteredEmojis.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => {
              onSelectEmoji(item.emoji);
            }}
            title={item.name}
            className="w-9 h-9 flex items-center justify-center text-xl rounded-lg hover:bg-amber-50 hover:scale-125 transition-transform duration-100 active:scale-95"
          >
            {item.emoji}
          </button>
        ))}
        {filteredEmojis.length === 0 && (
          <div className="col-span-6 py-6 text-center text-xs text-slate-400">
            No emojis found for "{searchQuery}"
          </div>
        )}
      </div>

      {/* Footer tip */}
      <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
        <span>Click any emoji to insert into message</span>
      </div>
    </div>
  );
}
