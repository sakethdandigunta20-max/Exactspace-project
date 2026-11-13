import React from 'react';
import { Menu, Users, Info, Wifi, WifiOff } from 'lucide-react';

export default function ChatHeader({
  channel,
  isConnected,
  onOpenMobileSidebar,
}) {
  return (
    <header className="h-16 px-6 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Channel Details */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <span>{channel?.name || 'Introductions'}</span>
            </h1>
            {/* Live indicator badge */}
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                isConnected
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                  : 'bg-amber-50 text-amber-700 border border-amber-200/60'
              }`}
            >
              {isConnected ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Local Mode
                </>
              )}
            </span>
          </div>
          <p className="text-xs text-slate-400 truncate max-w-md">
            {channel?.topic || 'This Channel Is For Company Wide Chatter'}
          </p>
        </div>
      </div>

      {/* Right Stats matching team-chat-intro.gif (3 | 100 with icon) */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-full shadow-2xs">
          <span className="text-emerald-600 font-bold">{channel?.onlineCount || 3}</span>
          <span className="text-slate-300">|</span>
          <span>{channel?.membersCount || 100}</span>
          <Users className="w-3.5 h-3.5 ml-0.5 text-slate-400" />
        </div>
      </div>
    </header>
  );
}
