import React, { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatHeader from './ChatHeader';
import MessageThread from './MessageThread';
import ChatInput from './ChatInput';
import { useChatSocket } from './useChatSocket';
import { INITIAL_CHANNELS } from './chatConstants';

export default function ChatContainer() {
  const [currentChannelId, setCurrentChannelId] = useState('introductions');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const {
    messages,
    isConnected,
    typingUsers,
    sendMessage,
    likeMessage,
    sendTyping,
  } = useChatSocket(currentChannelId);

  const activeChannel =
    INITIAL_CHANNELS.find((c) => c.id === currentChannelId) || INITIAL_CHANNELS[0];

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-slate-50 overflow-hidden">
      {/* Left Sidebar */}
      <ChatSidebar
        channels={INITIAL_CHANNELS}
        currentChannelId={currentChannelId}
        onSelectChannel={setCurrentChannelId}
        isConnected={isConnected}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50">
        {/* Channel Header */}
        <ChatHeader
          channel={activeChannel}
          isConnected={isConnected}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Message History Thread */}
        <MessageThread
          messages={messages}
          onLikeMessage={likeMessage}
          typingUsers={typingUsers}
          channelName={activeChannel.name}
        />

        {/* Bottom Input Box */}
        <ChatInput
          onSendMessage={sendMessage}
          onTyping={sendTyping}
        />
      </main>
    </div>
  );
}
