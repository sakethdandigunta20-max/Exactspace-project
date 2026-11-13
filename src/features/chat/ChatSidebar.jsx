import React from 'react';
import { Hash, Plus, Users, Radio, CheckCircle2 } from 'lucide-react';
import { OFFICIAL_USER_LIST, getUserMeta } from './chatConstants';

export default function ChatSidebar({
  channels,
  currentChannelId,
  onSelectChannel,
  isConnected,
  isMobileOpen,
  onCloseMobile,
}) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-30 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 w-72 bg-white border-r border-slate-200 flex flex-col z-40 transition-transform duration-200 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* User Profile Header (Pixel-matched to team-chat-intro.gif) */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-rose-400 text-white font-bold flex items-center justify-center text-base shadow-sm">
              RR
            </div>
            {/* Green Online Dot */}
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-500/20" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-slate-900 truncate leading-snug">
              Rolande Raimondi
            </div>
            <div className="text-xs text-slate-400 truncate">
              Research Nurse
            </div>
          </div>
        </div>

        {/* Channels Section */}
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            <div className="flex items-center gap-1.5">
              <span>Conversations</span>
            </div>
            <button
              type="button"
              className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Add Channel"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Channel List */}
          <nav className="space-y-1 mb-6">
            {channels.map((ch) => {
              const isActive = ch.id === currentChannelId;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => {
                    onSelectChannel(ch.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-semibold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    #
                  </div>
                  <span className="flex-1 text-left truncate">{ch.name}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Assignment 1 User List Roster */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              <span>Team Members ({OFFICIAL_USER_LIST.length})</span>
              <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-mono">
                Assignment 1
              </span>
            </div>
            <div className="space-y-1.5">
              {OFFICIAL_USER_LIST.map((user) => {
                const meta = getUserMeta(user);
                return (
                  <div
                    key={user}
                    className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="relative">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-bold shadow-2xs"
                        style={{ backgroundColor: meta.color }}
                      >
                        {meta.initials}
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-slate-700 truncate">
                        {user}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">@{user.toLowerCase()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Connection Status Card */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span className="font-medium text-slate-700">
                {isConnected ? 'Socket.io Connected' : 'Local Standalone Mode'}
              </span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-600 font-mono">
              Port 5000
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
