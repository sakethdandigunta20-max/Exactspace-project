/**
 * Assignment 1 Official User List
 * "For each message randomly assign a username from the below user list.
 * const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"]"
 */
export const OFFICIAL_USER_LIST = ["Alan", "Bob", "Carol", "Dean", "Elin"];

export const USER_DETAILS = {
  Alan: {
    name: 'Alan Turing',
    role: 'Staff Engineer',
    color: '#0284c7', // Sky
    initials: 'AT',
    status: 'online',
  },
  Bob: {
    name: 'Bob Martin',
    role: 'Clean Architecture Lead',
    color: '#16a34a', // Green
    initials: 'BM',
    status: 'online',
  },
  Carol: {
    name: 'Carol Shaw',
    role: 'Senior UI/UX Specialist',
    color: '#9333ea', // Purple
    initials: 'CS',
    status: 'online',
  },
  Dean: {
    name: 'Dean Kamen',
    role: 'Robotics & Hardware Architect',
    color: '#ea580c', // Orange
    initials: 'DK',
    status: 'away',
  },
  Elin: {
    name: 'Elin Emmanuel',
    role: 'Distributed Systems Lead',
    color: '#e11d48', // Rose
    initials: 'EE',
    status: 'online',
  },
  // Supporting personas from reference mock
  'PubNub Bot': {
    name: 'PubNub Bot',
    role: 'System Bot',
    color: '#dc2626',
    initials: 'PN',
    status: 'bot',
  },
  'Gregory Goolsby': {
    name: 'Gregory Goolsby',
    role: 'Product Manager',
    color: '#84cc16',
    initials: 'GG',
    status: 'offline',
  },
  'Rolande Raimondi': {
    name: 'Rolande Raimondi',
    role: 'Research Nurse',
    color: '#f43f5e',
    initials: 'RR',
    status: 'online',
  }
};

export const INITIAL_CHANNELS = [
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

export const POPULAR_EMOJIS = [
  { emoji: '👍', name: 'Thumbs Up', category: 'Reactions' },
  { emoji: '❤️', name: 'Heart', category: 'Reactions' },
  { emoji: '🔥', name: 'Fire', category: 'Reactions' },
  { emoji: '🚀', name: 'Rocket', category: 'Reactions' },
  { emoji: '🎉', name: 'Party Popper', category: 'Celebration' },
  { emoji: '👏', name: 'Clapping Hands', category: 'Reactions' },
  { emoji: '😀', name: 'Grinning Face', category: 'Smileys' },
  { emoji: '😂', name: 'Face with Tears of Joy', category: 'Smileys' },
  { emoji: '😍', name: 'Heart Eyes', category: 'Smileys' },
  { emoji: '🤔', name: 'Thinking Face', category: 'Smileys' },
  { emoji: '🙌', name: 'Raising Hands', category: 'Celebration' },
  { emoji: '✨', name: 'Sparkles', category: 'Celebration' },
  { emoji: '💡', name: 'Lightbulb', category: 'Objects' },
  { emoji: '⚡', name: 'Lightning', category: 'Objects' },
  { emoji: '💯', name: 'Hundred Points', category: 'Objects' },
  { emoji: '👀', name: 'Eyes', category: 'Smileys' },
  { emoji: '🤝', name: 'Handshake', category: 'Reactions' },
  { emoji: '💻', name: 'Laptop', category: 'Objects' },
  { emoji: '☕', name: 'Coffee', category: 'Food & Drink' },
  { emoji: '🍕', name: 'Pizza', category: 'Food & Drink' },
];

export function getRandomUser() {
  const randomIndex = Math.floor(Math.random() * OFFICIAL_USER_LIST.length);
  return OFFICIAL_USER_LIST[randomIndex];
}

export function getUserMeta(name) {
  if (USER_DETAILS[name]) {
    return USER_DETAILS[name];
  }
  // Generate consistent details for any custom name
  const initials = name
    .split(' ')
    .map(p => p[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
  
  const colors = ['#0284c7', '#16a34a', '#9333ea', '#ea580c', '#e11d48', '#0d9488'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = colors[Math.abs(hash) % colors.length];

  return {
    name,
    role: 'Team Member',
    color,
    initials: initials || name.substring(0, 2).toUpperCase(),
    status: 'online',
  };
}
