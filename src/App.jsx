import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ChatContainer from './features/chat/ChatContainer';
import GalleryContainer from './features/gallery/GalleryContainer';

export default function App() {
  // Sync tab with URL hash if present
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('gallery')) return 'gallery';
    return 'chat';
  });

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    window.location.hash = tab === 'gallery' ? '#gallery' : '#chat';
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('gallery')) {
        setActiveTab('gallery');
      } else {
        setActiveTab('chat');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Global Navigation Header */}
      <Navbar activeTab={activeTab} onSelectTab={handleSelectTab} />

      {/* Main View Area */}
      <div className="flex-1">
        {activeTab === 'chat' ? <ChatContainer /> : <GalleryContainer />}
      </div>
    </div>
  );
}
