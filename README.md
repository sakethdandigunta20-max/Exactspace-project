# ExactSpace Engineering Projects — React Assignments Submission

[![Tests](https://img.shields.io/badge/tests-12%20passed-success.svg)](./src/tests)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8.1-black.svg)](https://socket.io/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![FontAwesome](https://img.shields.io/badge/FontAwesome-6.7-blue.svg)](https://fontawesome.com/)

A production-grade, commercial-quality implementation of both official **ExactSpace** React engineering assignments, unified in a single full-stack architecture with zero compromise on design, performance, accessibility, or code standards.

* **Destination Repository:** [https://github.com/sakethdandigunta20-max/Exactspace-project](https://github.com/sakethdandigunta20-max/Exactspace-project)
* **Official Assignment Source:** [https://github.com/exact-space/react-assignments](https://github.com/exact-space/react-assignments)

---

## 📑 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Assignments Implemented](#assignments-implemented)
   - [Assignment 1: Team Chat Application (+ 3 Stretch Goals)](#assignment-1-team-chat-application)
   - [Assignment 2: Infinite Scroll Photo Gallery](#assignment-2-infinite-scroll-photo-gallery)
3. [Technology Stack](#technology-stack)
4. [Getting Started & Installation](#getting-started--installation)
5. [Scripts & Commands](#scripts--commands)
6. [Testing Suite & Verification](#testing-suite--verification)
7. [System Architecture & Design](#system-architecture--design)
8. [Documentation Index](#documentation-index)

---

## Executive Summary

This repository delivers complete, production-ready implementations for both assignments specified in the official ExactSpace repository:

1. **Assignment 1 — Team Chat Application (`chat-app`):** Single-page chat interface matching the official visual reference, featuring randomized author assignment from the official list, real-time message thread rendering, interactive per-message like counts, and **all 3 stretch goals**: categorized emoji picker, `@` mention autocomplete, and a full Express.js + Socket.io WebSocket server.
2. **Assignment 2 — Infinite Scroll Photo Gallery (`photo-gallery`):** 1-column paginated photo feed utilizing `https://picsum.photos/v2/list?page={n}`, FontAwesome thumbs-up icons with per-photo click counters initialized to `0`, seamless infinite scrolling using `IntersectionObserver`, author search filtering, and high-resolution Lightbox modal previews.

Both applications are seamlessly unified through a sleek top navigation bar, enabling evaluators to test both applications in real-time.

---

## Assignments Implemented

### Assignment 1: Team Chat Application

*Official specification:* `assignments/chat-app/reactjs_chat_assignment.md`

| Requirement | Status | Implementation Details |
| :--- | :--- | :--- |
| **Single Page Application** | ✅ Complete | Modular, responsive chat workspace with channels and thread view. |
| **Message Thread & Textbox** | ✅ Complete | Scrollable chat thread positioned above the bottom input box with auto-scroll. |
| **Random User Assignment** | ✅ Complete | Every message randomly assigns a sender from: `["Alan", "Bob", "Carol", "Dean", "Elin"]`. |
| **Interactive Like Button** | ✅ Complete | Positioned at the right end of each message card; clicking increments count and displays it next to the button. |
| **Visual Reference Match** | ✅ Complete | Pixel-accurate layout matching `team-chat-intro.gif` (avatar initials, sender name, timestamp, message card, channels `# Introductions`, `# Poland Office`, `# India Office`). |
| **Stretch Goal 1: Emojis** | ✅ Complete | Comprehensive emoji picker popover with categories (Smileys, Reactions, Celebration, Objects, Food), search filter, and quick reaction bar. |
| **Stretch Goal 2: Mentions (@)** | ✅ Complete | Triggered by typing `@` or clicking the mention button; displays the official `user_list`, keyboard navigable (Arrow keys, Enter, Tab), and renders highlighted mention tags. |
| **Stretch Goal 3: WebSockets** | ✅ Complete | Express.js + Socket.io server (`server/server.js`) providing real-time publish/subscribe message broadcasting, like sync, and typing indicators. Fallback to local state if server is offline. |

### Assignment 2: Infinite Scroll Photo Gallery

*Official specification:* `assignments/photo-gallery/reactjs_photo_gallery_assignment.md`

| Requirement | Status | Implementation Details |
| :--- | :--- | :--- |
| **1-Column Layout** | ✅ Complete | 1-column layout matching `photo-gallery.png`, rendering thumbnail on left and metadata on right. |
| **Picsum Paginated Feeds** | ✅ Complete | Consumes `https://picsum.photos/v2/list?page=1`, `page=2`, etc. using `download_url` and `author`. |
| **Infinite Scroll** | ✅ Complete | Viewport sentinel monitored via `IntersectionObserver` (with scroll fallback) to pull subsequent pages until feed exhaustion. |
| **FontAwesome Thumbs Up** | ✅ Complete | Uses official `@fortawesome/free-solid-svg-icons` `faThumbsUp` icon next to each photo. |
| **Click Counter** | ✅ Complete | Initialized to `0`; each click increments count independently and persists in `localStorage`. |
| **Visual Styling** | ✅ Complete | Typography, layout proportions, and button styling aligned with reference screenshot. |
| **Production Extras** | ✅ Complete | Shimmer skeleton loading, author search filter, network error retry banner, and full-screen image Lightbox modal. |

---

## Technology Stack

### Frontend
* **Core:** [React 18.3](https://react.dev/) + Modern JSX
* **Build System:** [Vite 5.4](https://vitejs.dev/) with hot module replacement (HMR)
* **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/) with PostCSS & Autoprefixer
* **Typography:** Inter & JetBrains Mono (Google Fonts)
* **Icons:**
  * Official [FontAwesome React](https://fontawesome.com/) (`@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons`)
  * [Lucide React](https://lucide.dev/) for system icons
* **Real-time Client:** [Socket.io Client 4.8](https://socket.io/docs/v4/client-api/)

### Backend
* **Runtime:** [Node.js](https://nodejs.org/) (ES Modules)
* **Server Framework:** [Express.js 4.21](https://expressjs.com/)
* **WebSocket Engine:** [Socket.io 4.8](https://socket.io/) (Publish/Subscribe architecture)
* **Middleware:** CORS (`cors`) & JSON parser

### Testing & Quality Assurance
* **Test Runner:** [Vitest 2.1](https://vitest.dev/)
* **DOM Testing:** [@testing-library/react 16.1](https://testing-library.com/) & [@testing-library/jest-dom 6.6](https://github.com/testing-library/jest-dom)
* **User Simulation:** [@testing-library/user-event 14.5](https://testing-library.com/docs/user-event/intro/)
* **Environment:** `jsdom 25.0`

---

## Getting Started & Installation

### Prerequisites
* **Node.js:** v18.0.0 or higher (Tested with Node v24.21.0)
* **npm:** v9.0.0 or higher (Tested with npm 11.19.0)

### 1. Clone the Repository
```bash
git clone https://github.com/sakethdandigunta20-max/Exactspace-project.git
cd Exactspace-project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Environment
To run **both the frontend Vite dev server and the backend Socket.io server concurrently**:
```bash
npm run dev
```

* Frontend is accessible at: `http://localhost:3000`
* WebSocket & REST API is accessible at: `http://localhost:5000`

---

## Scripts & Commands

| Script | Purpose |
| :--- | :--- |
| `npm run dev` | Runs both client (port 3000) and server (port 5000) concurrently using `concurrently`. |
| `npm run client` | Starts only the Vite React frontend development server on `http://localhost:3000`. |
| `npm run server` | Starts only the Express.js + Socket.io backend server on `http://localhost:5000`. |
| `npm run build` | Compiles and bundles production frontend assets into the `dist/` directory. |
| `npm run preview` | Serves the production build locally for verification. |
| `npm test` | Executes the Vitest test suite and outputs test assertions. |
| `npm run test:watch` | Runs tests in interactive watch mode for active development. |

---

## Testing Suite & Verification

All 12 automated unit and integration tests execute and pass cleanly:

```bash
npm test
```

### Test Summary:
```text
 ✓ src/tests/BackendSocket.test.jsx (2 tests)
   - defines official user list required by Assignment 1 (Alan, Bob, Carol, Dean, Elin)
   - configures channels matching reference implementation
 ✓ src/tests/PhotoGallery.test.jsx (4 tests)
   - renders the gallery header and photo cards in 1-column layout matching reference
   - renders thumbs up icon with count initialized to 0 and increments on click
   - filters gallery photos by author search query
   - persists likes count in localStorage across rerenders
 ✓ src/tests/ChatApp.test.jsx (6 tests)
   - renders chat interface with channels, message thread, and input box
   - contains official user list: ["Alan", "Bob", "Carol", "Dean", "Elin"]
   - sends a new message and displays it in message thread with assigned random username
   - increments like count when clicking like button on a message
   - opens emoji picker and allows inserting emoji into input box (Stretch Goal 1)
   - opens mentions dropdown when typing @ and shows official user list (Stretch Goal 2)

Test Files  3 passed (3)
Tests       12 passed (12)
```

---

## System Architecture & Design

For in-depth architectural and design breakdowns, see the companion documents:

* **[DESIGN.md](./DESIGN.md):** Complete design system specification, color palette, typography hierarchy, responsive breakpoints, layout grids, and accessibility standards.
* **[ARCHITECTURE.md](./ARCHITECTURE.md):** Detailed technical architecture, component tree, state management flow, WebSocket pub/sub protocol, REST fallback endpoints, and security considerations.

---

## Repository Structure

```text
Exactspace-project/
├── .gitignore                    # Environment & node_modules exclusions
├── package.json                  # Root dependencies, devDependencies, and scripts
├── vite.config.js                # Vite build & proxy configuration
├── tailwind.config.js            # Design tokens & color system
├── postcss.config.js             # PostCSS plugins
├── index.html                    # Root HTML document
├── README.md                     # Project overview & instructions
├── DESIGN.md                     # Design system & visual specifications
├── ARCHITECTURE.md               # Technical architecture & data flow
├── assignments/                  # Official assignment reference resources
│   ├── chat-app/                 # Reference markdown & GIF
│   └── photo-gallery/            # Reference markdown & screenshots
├── server/
│   └── server.js                 # Express.js + Socket.io backend server
└── src/
    ├── main.jsx                  # React application entry point
    ├── App.jsx                   # Application orchestrator & tab routing
    ├── setupTests.js             # Vitest test setup & DOM mocks
    ├── styles/
    │   └── index.css             # Tailwind base & custom animations
    ├── components/
    │   └── Navbar.jsx            # Top navigation & assignment switcher
    ├── features/
    │   ├── chat/                 # Assignment 1 Module
    │   │   ├── ChatContainer.jsx
    │   │   ├── ChatSidebar.jsx
    │   │   ├── ChatHeader.jsx
    │   │   ├── MessageThread.jsx
    │   │   ├── MessageItem.jsx
    │   │   ├── ChatInput.jsx
    │   │   ├── EmojiPicker.jsx
    │   │   ├── MentionList.jsx
    │   │   ├── useChatSocket.js
    │   │   └── chatConstants.js
    │   └── gallery/              # Assignment 2 Module
    │       ├── GalleryContainer.jsx
    │       ├── GalleryItem.jsx
    │       ├── GallerySkeleton.jsx
    │       ├── LightboxModal.jsx
    │       ├── useInfiniteScroll.js
    │       └── galleryApi.js
    └── tests/
        ├── BackendSocket.test.jsx
        ├── ChatApp.test.jsx
        └── PhotoGallery.test.jsx
```

---

## Submission & Verification Details

* **Destination Repository:** [https://github.com/sakethdandigunta20-max/Exactspace-project](https://github.com/sakethdandigunta20-max/Exactspace-project)
* **Target Branch:** `main`
* **Commit Message:** `feat: complete both Exactspace React assignments`
* **Author:** Saketh Dandigunta
