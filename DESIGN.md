# ExactSpace Engineering Projects — Design System & UI/UX Specification

This document details the visual direction, design tokens, component architecture, responsive behavior, and accessibility standards implemented for the ExactSpace React assignments.

---

## 1. Visual Direction & Design Philosophy

The user interface is designed with a **commercial-grade, polished software aesthetic**, drawing inspiration from modern collaborative platforms (such as Slack, Linear, and Discord) while strictly matching the official assignment reference assets:

1. **Assignment 1 Reference (`team-chat-intro.gif`):** Clean sidebar hierarchy, distinct user avatar initials with dedicated color palettes, clean white message bubbles with soft shadows, and integrated inline chat actions.
2. **Assignment 2 Reference (`photo-gallery.png`):** Uncluttered 1-column layout, left-aligned thumbnail cards, distinct "Author: {name}" typography, and prominent FontAwesome thumbs-up interactive buttons.

### Core Principles
* **Clarity First:** Unambiguous visual cues, legible typography, and intuitive spatial hierarchy.
* **Micro-interactions:** Engaging tactile feedback on clicks, likes, and hovers (heart pulse, thumbs-up bounce, shimmer skeletons).
* **Fidelity & Precision:** Direct visual equivalence with the reference mockups provided by ExactSpace.

---

## 2. Color System & Design Tokens

### Primary Palette (Brand Blue)
| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `brand-50` | `#eff6ff` | Hover states, pill backgrounds, mention tags |
| `brand-100` | `#dbeafe` | Selected highlights, badge accents |
| `brand-500` | `#3b82f6` | Active tab highlights, channel selections |
| `brand-600` | `#2563eb` | Primary call-to-actions, FontAwesome thumbs-up |
| `brand-700` | `#1d4ed8` | Button hover & active pressed states |

### Neutrals (Slate Scale)
| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `slate-50` | `#f8fafc` | Application canvas background, input fills |
| `slate-100` | `#f1f5f9` | Dividers, subtle button borders |
| `slate-200` | `#e2e8f0` | Card borders, chat thread rules |
| `slate-400` | `#94a3b8` | Timestamps, secondary metadata, placeholders |
| `slate-500` | `#64748b` | Subheadings, section titles |
| `slate-700` | `#334155` | Body copy, secondary button labels |
| `slate-900` | `#0f172a` | Primary titles, channel headers, message authors |

### Semantic Indicators
| Intent | Token | Application |
| :--- | :--- | :--- |
| **Success** | `emerald-500` (`#10b981`) | Online status indicator dots, WebSocket live sync badge |
| **Danger / Likes** | `rose-500` (`#f43f5e`) | Chat message like hearts, error alerts |
| **Warning** | `amber-500` (`#f59e0b`) | Standalone/offline mode warnings, emoji triggers |

### Avatar Deterministic Chromatic Mapping
To ensure unique, consistent avatar visuals for each team member, a string-hash algorithm deterministically maps user names to distinct colors:

* **Alan:** `#0284c7` (Sky 600)
* **Bob:** `#16a34a` (Emerald 600)
* **Carol:** `#9333ea` (Purple 600)
* **Dean:** `#ea580c` (Orange 600)
* **Elin:** `#e11d48` (Rose 600)
* **PubNub Bot:** `#dc2626` (Red 600)
* **Gregory Goolsby:** `#84cc16` (Lime 500)
* **Rolande Raimondi:** `#f43f5e` (Rose 400)

---

## 3. Typography Hierarchy

The typography pairs **Inter** for clean readability across body copy with **JetBrains Mono** for timestamps, technical tags, and stats.

| Element | Font Family | Size / Leading | Weight | Tracking |
| :--- | :--- | :--- | :--- | :--- |
| **Display Header** | Inter | 32px / 40px | Bold (700) | `-0.025em` |
| **Channel Title** | Inter | 16px / 24px | Bold (700) | `normal` |
| **Author Name** | Inter | 14px / 20px | SemiBold (600) | `normal` |
| **Message Body** | Inter | 14px / 22px | Regular (400) | `normal` |
| **Timestamp / Tags** | JetBrains Mono | 12px / 16px | Regular (400) | `normal` |
| **Micro Labels** | Inter | 11px / 14px | Medium (500) | `+0.02em` |

---

## 4. Spacing, Elevation & Shape

### Spacing Grid
Based on a **4px geometric scale**:
* `p-1` (4px), `p-2` (8px), `p-3` (12px), `p-4` (16px), `p-6` (24px), `p-8` (32px).

### Border Radii
* **Controls & Badges:** `rounded-lg` (8px)
* **Avatars & Buttons:** `rounded-xl` (12px) to `rounded-2xl` (16px)
* **Pills & Status Rings:** `rounded-full` (9999px)

### Depth & Elevation
* **Resting Cards:** `shadow-xs` (`0 1px 2px 0 rgb(0 0 0 / 0.05)`)
* **Hover Cards:** `shadow-md` (`0 4px 6px -1px rgb(0 0 0 / 0.1)`)
* **Popovers / Modals:** `shadow-2xl` (`0 25px 50px -12px rgb(0 0 0 / 0.25)`)

---

## 5. Component Specifications

### 5.1 Global Top Navigation (`Navbar.jsx`)
* **Sticky Positioning:** `top-0 z-30` with `backdrop-blur` and border separation.
* **Assignment Segmented Tabs:** Smooth pill switch toggling between Assignment 1 (`#chat`) and Assignment 2 (`#gallery`).
* **Specification Dialog:** Interactive modal providing evaluators instant access to project requirements and architecture.

### 5.2 Team Chat Application (`chat-app`)
* **Sidebar (`ChatSidebar.jsx`):**
  * Profile card showing user `Rolande Raimondi` with avatar and green online indicator.
  * Channel navigation buttons with active state highlighting (`# Introductions`, `# Poland Office`, `# India Office`).
  * Team members section showcasing the official 5 users from Assignment 1.
* **Message Thread (`MessageThread.jsx`):**
  * Auto-scrolling viewport with custom slim scrollbars.
  * Welcome banner and date separation divider.
  * Smooth entry animations for incoming messages.
* **Message Card (`MessageItem.jsx`):**
  * Left: Circular avatar with team member initials and distinct background color.
  * Top: Sender name in semi-bold alongside monospaced timestamp.
  * Center: Clean white message bubble with soft border and break-word wrapping. Mention tags rendered as styled pills.
  * Right: Dedicated like button displaying live count and heartbeat animation on click.
* **Chat Input Bar (`ChatInput.jsx`):**
  * Textbox with placeholder `"Type Message"`.
  * Inline buttons for `@` mention trigger and emoji picker.
  * Primary send button enabling keyboard submission (`Enter`) or button click.
* **Mention Dropdown (`MentionList.jsx`):**
  * Pops up above the input box when `@` is typed.
  * Filters in real-time as characters are typed.
  * Displays user initials avatar, full name, handle, and role.
  * Full keyboard arrow and Enter selection support.
* **Emoji Picker (`EmojiPicker.jsx`):**
  * Tabbed categories: Reactions, Smileys, Celebration, Objects, Food & Drink.
  * Instant search filter for fast emoji selection.
  * Single-click insertion directly into the message text box.

### 5.3 Infinite Scroll Photo Gallery (`photo-gallery`)
* **Header:**
  * Serif font title `"Photo gallery"` precisely mirroring `photo-gallery.png`.
  * Real-time metrics showing total loaded photos and total likes given.
* **Search Filter:**
  * Live author search input allowing rapid filtering without disrupting the infinite scroll state.
* **Photo Card (`GalleryItem.jsx`):**
  * Left: Fixed 16:10 aspect ratio thumbnail with lazy loading, shimmer placeholder, and hover zoom.
  * Right: `"Author: {name}"` label alongside the blue FontAwesome thumbs-up icon button (`faThumbsUp`) and counter.
  * Dimensions badge and Unsplash attribution link.
* **Lightbox Modal (`LightboxModal.jsx`):**
  * Dark mode backdrop (`bg-slate-950/80`) focusing on high-resolution image viewing.
  * Actions for full-size download, Unsplash link, and thumbs-up interaction.

---

## 6. Responsive Layouts & Breakpoints

| Breakpoint | Width | Behavior |
| :--- | :--- | :--- |
| **Mobile (`< 640px`)** | `< 640px` | Chat sidebar hides behind a hamburger drawer; gallery cards stack photo on top of details. |
| **Tablet (`640px - 1024px`)** | `640px - 1023px` | Gallery cards switch to side-by-side flex layout; chat sidebar remains collapsible on tablet portrait. |
| **Desktop (`>= 1024px`)** | `1024px+` | Permanent 72-unit sidebar alongside full-width chat thread; gallery constrained to an ergonomic 896px (`max-w-4xl`) reading container. |

---

## 7. Accessibility (a11y) Standards

* **Color Contrast:** All body text meets or exceeds WCAG 2.1 AA requirement of `4.5:1` against their backgrounds (`slate-800` on `slate-50` is `12.6:1`).
* **ARIA Semantics:**
  * Mention list uses `role="listbox"` with `role="option"` and dynamic `aria-selected` tracking.
  * Emoji picker uses `role="dialog"` with `aria-label="Emoji Picker"`.
  * Like buttons include informative `aria-label` describing the action (e.g. `aria-label="Like message from Alan"`).
* **Keyboard Navigation:**
  * Full tab stop order across all actionable elements.
  * Arrow key traversal inside mention lists (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`).
  * `Enter` sends chat messages; `Shift + Enter` inserts newlines.
* **Reduced Motion:** Interactive pulse and bounce animations honor smooth, standard CSS transitions without causing disorientation.
