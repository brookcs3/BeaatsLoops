a# Agents.md – Project Foundation: 10-Second Audio Social Media Platform

## 🚧 Core Idea
A cutting-edge, minimalist but powerful audio-first social media platform. Users get **only 10–12 seconds** per track. The platform functions as:

- A **looping creative press kit** for artists
- A **visually reactive sound player** in the browser
- A **business card** / micro-portfolio

Inspired by:
- **Adobe Flash** responsiveness & interactivity
- **MySpace** style profile customization
- **AudioNodes**-like DAW backend, but ultra-light & Bun-native
- **Darkroom Engineering** vibes without the video game abrasiveness
- **Die Antwoord** aesthetics: raw, loud, rebellious

---

## 🧱 Stack Overview

### Frontend
- **Framework**: [Bun + React + TailwindCSS] or Bun + Vanilla Web Components
- **Style**: Retro-futurist, animated, sound-reactive UI
- **Audio Interactivity**: Web Audio API + Custom visual wrappers (Adobe Flash style interactivity)

### Backend
- **Runtime**: Bun
- **API**: REST (or GraphQL later)
- **Storage**: Bun-compatible storage for user audio files
- **Database**: Postgres or SQLite (starter), Supabase-compatible layer later
- **Authentication**: Magic links or wallet-based login (optional OAuth fallback)
- **Payments**: Stripe (tiered: 3 free beats → pay to unlock more)

---

## 🎧 Audio Engine Core
- **Tech**: Web Audio API
- **Structure**: Emulate AudioNodes.com modular graph
- **Simplified DAW**: 3-track sequencer with looping + filter/effect modules
- **Export/Share**: In-browser export (WAV/OGG), embed codes, Beat-URL
- **Custom Player**: Page *is* the player

---

## 🗂️ Profile Pages
- **Username-Based URL** (e.g. `/@keisha-key`)
- Shows looping audio clips
- Background and motion controlled by audio data (spectrum/meter triggers)
- Free users = 3 tracks
- Pro users = up to 20 tracks, export, embed tools

---

## 🧩 Modular Agents/Tasks

### 1. `auth.agent.ts`
- Handles signup/login via magic link
- Tracks free/pro user tier

### 2. `audio.agent.ts`
- Uploads audio
- Clips to 12s max
- Normalizes volume, stores loop info
- Returns waveform + preview data

### 3. `profile.agent.ts`
- Handles user profile metadata (display name, avatar, bio)
- Manages visual/audio preferences (color theme, waveform animation mode)
- Routes to public-facing profile pages like `/@handle`
- CRUD logic for display + customization of track ordering and player layout

### 4. `player.agent.ts`
- Web Audio renderer
- Hooks to interactive DOM
- Spectrum-based animation triggers

### 5. `payments.agent.ts`
- Stripe logic
- Unlock tracks, manage billing

### 6. `admin.agent.ts`
- Moderation flags
- Content guidelines

---

## 🔜 Next Steps
- [ ] Bootstrap `bun create` skeleton
- [ ] Add routing: `/` homepage, `/@handle` profile
- [ ] Implement `audio.agent.ts` to accept and clip audio
- [ ] Web Audio skeleton
- [ ] Visual layout sketch (low-fi mockup)
- [ ] Stripe integration proof-of-concept

---

## 🧠 Research To-Do
- [ ] Deep dive into **AudioNodes.com**'s architecture
- [ ] Test Bun+Web Audio performance in real browser contexts
- [ ] Look into peer-to-peer audio preview delivery (optional for speed)
- [ ] Assess SVG/Canvas rendering pipelines for audio-reactive visuals
- [ ] Consider WebAssembly for fast DSP/FX units (if CPU permits)

---

## 🧩 Future Modular Additions (v2+)
- [ ] `comments.agent.ts` – minimal public reactions or emoji-only feedback
- [ ] `embed.agent.ts` – embeddable player support
- [ ] `social.agent.ts` – user follow system or external sharing
- [ ] `editor.agent.ts` – basic trim/cut/reverb UI on upload
- [ ] `ai.agent.ts` – generate tags/genre guesses from audio fingerprint

---

Built with ⚡Bun, 🎧 Web Audio, and the weirdest creative energy since Flash.
