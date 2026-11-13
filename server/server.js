import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Official user list from Assignment 1
export const OFFICIAL_USER_LIST = ["Alan", "Bob", "Carol", "Dean", "Elin"];

// Initial channel list matching reference mockup
export const CHANNELS = [
  {
    id: 'introductions',
    name: 'Introductions',
    topic: 'This Channel Is For Company Wide Chatter',
    membersCount: 100,
    onlineCount: 3,
  },
  {
    id: 'poland-office',
    name: 'Poland Office',
    topic: 'Poland branch discussions and engineering chatter',
    membersCount: 42,
    onlineCount: 8,
  },
  {
    id: 'india-office',
    name: 'India Office',
    topic: 'India headquarters announcements & operations',
    membersCount: 65,
    onlineCount: 14,
  }
];

// Initial message seeds matching the exact visual reference gif
const messagesStore = {
  'introductions': [
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

// Helper to assign consistent avatar colors
const AVATAR_COLORS = [
  '#0ea5e9', // Sky
  '#10b981', // Emerald
  '#8b5cf6', // Violet
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#3b82f6', // Blue
  '#14b8a6', // Teal
];

function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// REST Endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    activeSockets: io.engine.clientsCount,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/users', (req, res) => {
  res.json({ users: OFFICIAL_USER_LIST });
});

app.get('/api/channels', (req, res) => {
  res.json({ channels: CHANNELS });
});

app.get('/api/messages/:channelId', (req, res) => {
  const channelId = req.params.channelId;
  const msgs = messagesStore[channelId] || [];
  res.json({ channelId, messages: msgs });
});

app.post('/api/messages/:channelId', (req, res) => {
  const channelId = req.params.channelId;
  const { text, sender, mentions } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text cannot be empty' });
  }

  const assignedSender = sender || OFFICIAL_USER_LIST[Math.floor(Math.random() * OFFICIAL_USER_LIST.length)];
  const date = new Date();
  const timestamp = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

  const newMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    channelId,
    sender: assignedSender,
    avatarColor: getAvatarColor(assignedSender),
    text: text.trim(),
    timestamp,
    createdAt: Date.now(),
    likes: 0,
    mentions: mentions || [],
  };

  if (!messagesStore[channelId]) {
    messagesStore[channelId] = [];
  }
  messagesStore[channelId].push(newMessage);

  // Broadcast to socket room
  io.to(channelId).emit('new_message', newMessage);

  res.status(201).json({ message: newMessage });
});

app.post('/api/messages/:channelId/:messageId/like', (req, res) => {
  const { channelId, messageId } = req.params;
  const msgs = messagesStore[channelId] || [];
  const target = msgs.find(m => m.id === messageId);

  if (!target) {
    return res.status(404).json({ error: 'Message not found' });
  }

  target.likes = (target.likes || 0) + 1;
  io.to(channelId).emit('message_liked', { channelId, messageId, likes: target.likes });

  res.json({ success: true, likes: target.likes });
});

// Socket.IO Handling
io.on('connection', (socket) => {
  console.log(`[Socket.io] Client connected: ${socket.id}`);

  // Send channel catalog & user list immediately on connection
  socket.emit('init_data', {
    channels: CHANNELS,
    users: OFFICIAL_USER_LIST,
  });

  // Client joins a channel
  socket.on('join_channel', (channelId) => {
    // Leave previous rooms
    const rooms = Array.from(socket.rooms);
    rooms.forEach((r) => {
      if (r !== socket.id) socket.leave(r);
    });

    socket.join(channelId);
    console.log(`[Socket.io] ${socket.id} joined channel ${channelId}`);

    // Send existing messages for that channel
    const msgs = messagesStore[channelId] || [];
    socket.emit('channel_history', { channelId, messages: msgs });
  });

  // Publish chat message
  socket.on('send_message', (payload) => {
    const { channelId = 'introductions', text, sender, mentions = [] } = payload;
    if (!text || !text.trim()) return;

    // Assignment 1 Requirement: Randomly assign username from user_list
    const assignedSender = sender || OFFICIAL_USER_LIST[Math.floor(Math.random() * OFFICIAL_USER_LIST.length)];
    const date = new Date();
    const timestamp = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    const newMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      channelId,
      sender: assignedSender,
      avatarColor: getAvatarColor(assignedSender),
      text: text.trim(),
      timestamp,
      createdAt: Date.now(),
      likes: 0,
      mentions,
    };

    if (!messagesStore[channelId]) {
      messagesStore[channelId] = [];
    }
    messagesStore[channelId].push(newMessage);

    // Broadcast (Publish) to channel subscribers
    io.to(channelId).emit('new_message', newMessage);
  });

  // Like chat message
  socket.on('like_message', ({ channelId, messageId }) => {
    const msgs = messagesStore[channelId] || [];
    const target = msgs.find(m => m.id === messageId);
    if (target) {
      target.likes = (target.likes || 0) + 1;
      io.to(channelId).emit('message_liked', { channelId, messageId, likes: target.likes });
    }
  });

  // Typing indicator
  socket.on('typing', ({ channelId, user, isTyping }) => {
    socket.to(channelId).emit('user_typing', { channelId, user, isTyping });
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.io] Client disconnected: ${socket.id}`);
  });
});

// Only start the server if this file is run directly (not during tests)
if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`🚀 ExactSpace WebSocket & REST server running on port ${PORT}`);
  });
}

export { app, server, io };
