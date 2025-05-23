# BeaatsLoops Documentation

Welcome to the BeaatsLoops documentation. This folder contains all design specifications, architecture plans, and implementation guides for the project.

## Architecture Documentation

### Audio System Design
- **[AWAVE Implementation Plan](./architecture/AWAVE_IMPLEMENTATION_PLAN.md)** - Complete audio visualizer architecture with phase-by-phase implementation guide
- **[Music Box System](./architecture/MUSIC_BOX_SYSTEM.md)** - Advanced loop sequencing and composition system design
- **[Scroll Audio Modulation](./architecture/SCROLL_AUDIO_MODULATION.md)** - Spatial audio effects system controlled by scroll position

## Project Overview

BeaatsLoops is a minimalist social platform for sharing 12-second audio loops with automatic loop detection and intelligent audio visualization.

### Core Features
- 12-second audio loop constraint for pure creativity
- Automatic loop detection and seamless playback
- AWaves signature wireframe visualizer
- Scroll-based spatial audio positioning
- Music box sequencing system for creating compositions

### Technology Stack
- **Frontend**: Astro 5.7+ with TypeScript
- **Styling**: SASS/SCSS with modular architecture
- **Audio**: Web Audio API for real-time processing
- **Animation**: GSAP for advanced visual effects
- **Deployment**: Railway with automatic builds

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Architecture Status

### Phase 1: Basic Audio Reactivity ⏳
- [x] WaveformGrid.js implementation
- [ ] AudioVisualizer class creation
- [ ] CSS property system for audio data
- [ ] State transition testing

### Phase 2: Site-wide Deployment 📋
- [ ] AWaves integration across all pages
- [ ] Audio connection system for different contexts
- [ ] Consistent behavior across user pages

### Phase 3: Spatial Scroll Features 📋
- [ ] Doppler effect algorithms
- [ ] Scroll-based audio modulation
- [ ] Spatial audio positioning

### Phase 4: Advanced Features 📋
- [ ] User preference controls
- [ ] Performance optimizations
- [ ] Advanced audio effects

## Implementation Notes

- Start with filter-based audio effects before adding doppler
- Use Web Audio API for efficient real-time processing
- AWaves must always look beautiful, even without audio
- All changes should maintain 60fps performance
- Focus on seamless state transitions