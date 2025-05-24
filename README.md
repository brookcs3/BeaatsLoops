# BeaatsLoops

**A revolutionary platform for sharing and discovering 12-second audio loops with real-time audio visualization and spatial effects.**

BeaatsLoops transforms how musicians, producers, and beat makers share their creative work by combining automatic loop detection with immersive 3D visualizations and spatial audio processing.

## What is BeaatsLoops?

BeaatsLoops is a web-based audio platform that specializes in **12-second loops** - the perfect length for showcasing musical ideas, beats, and creative snippets. The platform features:

- **Automatic Loop Detection**: Advanced audio analysis ensures perfect seamless loops
- **3D Audio Visualization**: Real-time frequency analysis drives stunning wireframe visualizations  
- **Spatial Audio Effects**: Scroll-based doppler effects and 3D positioning
- **Creative Community**: A focused platform for loop-based musical expression

## Why 12 Seconds?

12 seconds is the optimal duration for:
- **Musical Ideas**: Long enough to establish a groove, short enough to stay focused
- **Social Sharing**: Perfect for attention spans and quick consumption
- **Creative Constraints**: Limitations often spark the most innovative solutions
- **Loop Perfection**: Ideal for seamless, hypnotic repetition

## Audio Technology & Libraries

BeaatsLoops is built on cutting-edge web audio technology:

- **Web Audio API**: Low-latency, real-time audio processing in the browser
- **Tone.js Framework**: Professional-grade audio synthesis and effects
- **AudioBuffer Processing**: Efficient loop analysis and manipulation
- **Real-time FFT Analysis**: Frequency domain processing for visualizations
- **Spatial Audio Engine**: 3D positioning and doppler effects

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### ⚠️ Critical Dependency: Prettier

**The Prettier library is absolutely essential for this project to build successfully.** Do not remove or skip installing Prettier, as it is required for:

- Code formatting during the build process
- Astro component processing
- SCSS/CSS file compilation
- Ensuring consistent code style across the project

If you encounter build errors, verify that Prettier is properly installed:

```bash
npm list prettier
```

If missing, reinstall dependencies:

```bash
npm install
```

## Deployment

This project is configured for deployment on Railway. The deployment process is automatically triggered when you push to the main branch of your repository.

## Project Structure

```
/
├── public/
│   ├── fonts/
│   ├── icons/
│   └── images/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── utils/
└── package.json
```

## Technology Stack

### Current Implementation
- **[Astro](https://astro.build/)** - Static site builder with component-based architecture
- **[SASS](https://sass-lang.com/)** - Advanced CSS preprocessing with modular design tokens
- **[GSAP](https://greensock.com/gsap/)** - High-performance animation library for 3D effects
- **[Lenis](https://github.com/studio-freight/lenis)** - Smooth scrolling for spatial audio triggers

### Audio Research & Implementation
*Based on extensive research and prototyping from 2023 Beats project*

- **[Tone.js](https://tonejs.github.io/)** - Web Audio API framework for audio processing
- **[Librosa](https://librosa.org/)** - Python library for audio analysis (backend processing)
- **Librosa.js** - JavaScript implementation of core Librosa functions
- **Custom Loop Analysis Engine** - Proprietary algorithm for seamless loop detection
- **Web Audio API** - Real-time audio processing and visualization
- **Bun Runtime** - High-performance backend for audio processing
- **FFmpeg Integration** - Audio format conversion and optimization

### Proven Technologies (From 2023 Research)
- ✅ **Automatic Loop Detection**: Cross-correlation analysis with Hann windowing
- ✅ **12-Second Audio Processing**: Librosa-powered normalization and trimming
- ✅ **Real-time Spectrum Analysis**: FFT-based frequency domain processing
- ✅ **Audio Visualization**: Custom Web Audio API implementations
- ✅ **Streaming Architecture**: Microservice-based audio delivery

### Planned Features
- **🎵 Upload & Share**: Drag-and-drop 12-second audio uploads
- **🔄 Auto-Loop Detection**: AI-powered loop point detection
- **🎨 AWaves Visualizer**: Signature wireframe visualization that reacts to audio
- **🌍 Spatial Audio**: Scroll-triggered doppler effects and 3D positioning
- **📱 Mobile Recording**: Direct recording from mobile devices
- **🎛️ Loop Effects**: Real-time audio effects and manipulation
- **👥 Community Features**: Following, collections, and collaborative playlists

## Documentation

For detailed architecture specifications and implementation guides, see the [docs/](./docs/) folder:

- [Architecture Documentation](./docs/README.md) - Complete system design and implementation plans
- [AWaves Implementation](./docs/architecture/AWAVE_IMPLEMENTATION_PLAN.md) - Audio visualizer architecture
- [Music Box System](./docs/architecture/MUSIC_BOX_SYSTEM.md) - Loop sequencing design
- [Scroll Audio Modulation](./docs/architecture/SCROLL_AUDIO_MODULATION.md) - Spatial audio effects

### Audio Research Archive
*Comprehensive audio processing research from 2023 Beats prototype:*

- **Loop Analysis Algorithms** - Cross-correlation and zero-crossing detection
- **Librosa Integration** - Python backend processing and JavaScript ports
- **Audio Visualization** - Real-time FFT analysis and spectrum rendering
- **Streaming Architecture** - Microservice-based audio delivery system

*Research files available in project backups for reference and implementation.*