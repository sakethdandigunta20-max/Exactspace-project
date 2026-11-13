import React, { useState } from 'react';
import { MessageSquare, Image, Info, Github, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Navbar({ activeTab, onSelectTab }) {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-md shadow-blue-500/20 text-base">
              ES
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  ExactSpace
                </span>
                <span className="hidden sm:inline-block text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-full">
                  React Assignments
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-slate-400">
                Full-Stack Senior Implementation • Both Assignments Complete
              </p>
            </div>
          </div>

          {/* Assignment Switcher Tabs */}
          <nav className="flex items-center p-1 bg-slate-100/80 rounded-xl border border-slate-200/60">
            {/* Tab 1: Chat App */}
            <button
              type="button"
              onClick={() => onSelectTab('chat')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 ${
                activeTab === 'chat'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Assignment 1: Chat</span>
              <span className="hidden lg:inline text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                +3 Stretch Goals
              </span>
            </button>

            {/* Tab 2: Photo Gallery */}
            <button
              type="button"
              onClick={() => onSelectTab('gallery')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 ${
                activeTab === 'gallery'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>Assignment 2: Gallery</span>
              <span className="hidden lg:inline text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded">
                Infinite Scroll
              </span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Assignment Info Modal Trigger */}
            <button
              type="button"
              onClick={() => setShowInfoModal(true)}
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors"
              title="View Assignment Details & Specs"
            >
              <Info className="w-5 h-5" />
            </button>

            {/* GitHub Repo Link */}
            <a
              href="https://github.com/sakethdandigunta20-max/Exactspace-project"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </header>

      {/* Assignment Info Dialog */}
      {showInfoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowInfoModal(false)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  ExactSpace React Assignment Specifications
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Full implementation details, features, and evaluation criteria
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-6 text-sm text-slate-600">
              {/* Assignment 1 Section */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    Assignment 1 — React Chat Application
                  </h3>
                  <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Completed + 3 Stretch Goals
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs list-disc list-inside text-slate-700">
                  <li>Single-page chat thread layout matching official reference GIF.</li>
                  <li>
                    Random user assignment from official list:{' '}
                    <code className="bg-white px-1.5 py-0.5 rounded border text-blue-700 font-mono">
                      ["Alan", "Bob", "Carol", "Dean", "Elin"]
                    </code>
                  </li>
                  <li>Interactive like button with live counter on right end of each message.</li>
                  <li>
                    <strong>Stretch Goal 1:</strong> Full emoji picker with search, categories, and quick reactions.
                  </li>
                  <li>
                    <strong>Stretch Goal 2:</strong> @Mentions dropdown with keyboard navigation and mention tags.
                  </li>
                  <li>
                    <strong>Stretch Goal 3:</strong> Real-time Express.js + Socket.io WebSocket server with channels and publish/subscribe.
                  </li>
                </ul>
              </div>

              {/* Assignment 2 Section */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Image className="w-4 h-4 text-blue-600" />
                    Assignment 2 — Infinite Scroll Photo Gallery
                  </h3>
                  <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Completed
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs list-disc list-inside text-slate-700">
                  <li>
                    1-column layout using <code className="bg-white px-1 py-0.5 rounded border font-mono">download_url</code> and <code className="bg-white px-1 py-0.5 rounded border font-mono">author</code>, pixel-matching reference photo.
                  </li>
                  <li>
                    Infinite scroll implementation fetching paginated JSON feeds from Picsum (<code className="bg-white px-1 py-0.5 rounded border font-mono">/v2/list?page=1,2,3...</code>).
                  </li>
                  <li>
                    FontAwesome thumbs-up icon (<code className="bg-white px-1 py-0.5 rounded border font-mono">fa-thumbs-up</code>) with incrementing counter initialized to 0.
                  </li>
                  <li>Optimized thumbnail loading, shimmer skeletons, and lightbox full-size viewer.</li>
                  <li>Live author search filter and end-of-feed detection.</li>
                </ul>
              </div>

              {/* Stack Details */}
              <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span>Stack: React 18, Vite, Tailwind CSS, Express, Socket.io, FontAwesome</span>
                <button
                  type="button"
                  onClick={() => setShowInfoModal(false)}
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
