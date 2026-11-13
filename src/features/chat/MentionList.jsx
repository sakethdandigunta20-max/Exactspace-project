import React, { useEffect, useRef } from 'react';
import { OFFICIAL_USER_LIST, getUserMeta } from './chatConstants';

export default function MentionList({
  query = '',
  selectedIndex = 0,
  onSelectUser,
  onClose,
  position = { top: 0, left: 0 },
}) {
  const listRef = useRef(null);

  // Filter users based on query
  const filteredUsers = OFFICIAL_USER_LIST.filter((user) =>
    user.toLowerCase().startsWith(query.toLowerCase())
  );

  useEffect(() => {
    // Scroll active item into view
    if (listRef.current) {
      const activeElement = listRef.current.children[selectedIndex];
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (filteredUsers.length === 0) {
    return (
      <div className="absolute bottom-full left-4 mb-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-3 text-xs text-slate-500 z-50">
        No team members match "@{query}"
      </div>
    );
  }

  return (
    <div
      ref={listRef}
      className="absolute bottom-full left-4 mb-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200/90 py-1.5 z-50 overflow-hidden backdrop-blur-lg animate-in fade-in zoom-in-95 duration-150"
      role="listbox"
      aria-label="Mention a user"
    >
      <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
        <span>Mention Team Member</span>
        <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-mono">
          user_list
        </span>
      </div>

      <div className="max-h-48 overflow-y-auto py-1">
        {filteredUsers.map((userName, index) => {
          const meta = getUserMeta(userName);
          const isSelected = index === selectedIndex;

          return (
            <button
              key={userName}
              type="button"
              role="option"
              aria-selected={isSelected}
              onClick={() => onSelectUser(userName)}
              className={`w-full px-3 py-2 text-left flex items-center gap-3 transition-colors ${
                isSelected
                  ? 'bg-blue-50 text-blue-900 font-medium'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0 shadow-sm"
                style={{ backgroundColor: meta.color }}
              >
                {meta.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-slate-900 truncate">
                    {userName}
                  </span>
                  <span className="text-xs text-slate-400">@{userName.toLowerCase()}</span>
                </div>
                <div className="text-[11px] text-slate-500 truncate">{meta.role}</div>
              </div>
              {isSelected && (
                <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                  Enter ↵
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
