import { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { OFFICIAL_USER_LIST, getRandomUser, getUserMeta, INITIAL_CHANNELS } from './chatConstants';

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

const DEFAULT_MESSAGES = {
  introductions: [
    {
      id: 'seed-msg-1',
      sender: 'PubNub Bot',
      avatarColor: '#e11d48',
      text: 'Welcome to Team Chat. 👏👏 Send a message now to start interacting with other users in the app. ⬇️',
      timestamp: '12:16',
      createdAt: Date.now() - 3600000 * 5,
      likes: 2,
      mentions: [],
    },
    {
      id: 'seed-msg-2',
      sender: 'Gregory Goolsby',
      avatarColor: '#84cc16',
      text: 'Hey everyone!',
      timestamp: '17:28',
      createdAt: Date.now() - 3600000 * 2,
      likes: 1,
      mentions: [],
    },
    {
      id: 'seed-msg-3',
      sender: 'Elin Emmanuel',
      avatarColor: '#f43f5e',
      text: 'Oh hi, Gregory! Rolande is around, too...',
      timestamp: '17:30',
      createdAt: Date.now() - 3600000,
      likes: 3,
      mentions: ['Gregory'],
    }
  ],
  'poland-office': [
    {
      id: 'seed-msg-poland-1',
      sender: 'Carol',
      avatarColor: '#8b5cf6',
      text: 'Dzień dobry team! Sprint planning starts at 14:00 CET.',
      timestamp: '09:15',
      createdAt: Date.now() - 10000000,
      likes: 4,
      mentions: [],
    }
  ],
  'india-office': [
    {
      id: 'seed-msg-india-1',
      sender: 'Alan',
      avatarColor: '#0ea5e9',
      text: 'Namaste all! Release candidate v2.4 has passed all integration tests.',
      timestamp: '11:00',
      createdAt: Date.now() - 8000000,
      likes: 5,
      mentions: [],
    }
  ]
};

export function useChatSocket(currentChannelId = 'introductions') {
  const [messages, setMessages] = useState(() => {
    return DEFAULT_MESSAGES[currentChannelId] || [];
  });
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [typingUsers, setTypingUsers] = useState([]);
  const socketRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    let socket;
    try {
      socket = io(SOCKET_SERVER_URL, {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 5000,
        transports: ['websocket', 'polling'],
      });
      socketRef.current = socket;

      socket.on('connect', () => {
        setIsConnected(true);
        setConnectionError(null);
        socket.emit('join_channel', currentChannelId);
      });

      socket.on('disconnect', (reason) => {
        setIsConnected(false);
        console.warn('[Socket] Disconnected:', reason);
      });

      socket.on('connect_error', (err) => {
        setIsConnected(false);
        setConnectionError('WebSocket server offline. Running in local standalone mode.');
      });

      socket.on('channel_history', ({ channelId, messages: serverMsgs }) => {
        if (channelId === currentChannelId && Array.isArray(serverMsgs) && serverMsgs.length > 0) {
          setMessages(serverMsgs);
        }
      });

      socket.on('new_message', (newMsg) => {
        if (newMsg.channelId === currentChannelId) {
          setMessages((prev) => {
            // Avoid duplicate message if already added
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
        }
      });

      socket.on('message_liked', ({ channelId, messageId, likes }) => {
        if (channelId === currentChannelId) {
          setMessages((prev) =>
            prev.map((m) => (m.id === messageId ? { ...m, likes } : m))
          );
        }
      });

      socket.on('user_typing', ({ channelId, user, isTyping }) => {
        if (channelId === currentChannelId) {
          setTypingUsers((prev) => {
            if (isTyping) {
              return prev.includes(user) ? prev : [...prev, user];
            } else {
              return prev.filter((u) => u !== user);
            }
          });
        }
      });
    } catch (err) {
      console.warn('Socket initialization failed, operating in local mode:', err);
      setIsConnected(false);
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [currentChannelId]);

  // When switching channels, reset/load channel messages
  useEffect(() => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('join_channel', currentChannelId);
    } else {
      setMessages(DEFAULT_MESSAGES[currentChannelId] || []);
    }
    setTypingUsers([]);
  }, [currentChannelId, isConnected]);

  /**
   * Send a message
   * Assignment 1 Requirement:
   * "For each message randomly assign a username from the below user list:
   * const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"]"
   */
  const sendMessage = useCallback((text, mentions = []) => {
    if (!text || !text.trim()) return;

    const randomSender = getRandomUser();
    const meta = getUserMeta(randomSender);
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newMsg = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      channelId: currentChannelId,
      sender: randomSender,
      avatarColor: meta.color,
      text: text.trim(),
      timestamp,
      createdAt: Date.now(),
      likes: 0,
      mentions,
    };

    // If connected to Socket.IO server, emit event
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('send_message', newMsg);
    } else {
      // Standalone fallback: add locally
      setMessages((prev) => [...prev, newMsg]);
    }

    return newMsg;
  }, [currentChannelId]);

  /**
   * Like a message
   * Assignment 1 Requirement:
   * "For each message, add a like button at the right end of the chat message,
   * which on click should increase the count. Display the count next to the like button."
   */
  const likeMessage = useCallback((messageId) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('like_message', {
        channelId: currentChannelId,
        messageId,
      });
    } else {
      // Local fallback
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, likes: (msg.likes || 0) + 1 } : msg
        )
      );
    }
  }, [currentChannelId]);

  /**
   * Emit typing event
   */
  const sendTyping = useCallback((isTyping, user = 'Someone') => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('typing', {
        channelId: currentChannelId,
        user,
        isTyping,
      });
    }
  }, [currentChannelId]);

  return {
    messages,
    isConnected,
    connectionError,
    typingUsers,
    sendMessage,
    likeMessage,
    sendTyping,
  };
}
