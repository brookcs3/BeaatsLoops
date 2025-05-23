# BeaatsLoops

A platform for sharing 12-second audio loops with automatic loop detection.

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

- [Astro](https://astro.build/) - Static site builder
- [SASS](https://sass-lang.com/) - CSS preprocessor
- [GSAP](https://greensock.com/gsap/) - Animation library
- [Lenis](https://github.com/studio-freight/lenis) - Smooth scrolling

## Documentation

For detailed architecture specifications and implementation guides, see the [docs/](./docs/) folder:

- [Architecture Documentation](./docs/README.md) - Complete system design and implementation plans
- [AWaves Implementation](./docs/architecture/AWAVE_IMPLEMENTATION_PLAN.md) - Audio visualizer architecture
- [Music Box System](./docs/architecture/MUSIC_BOX_SYSTEM.md) - Loop sequencing design
- [Scroll Audio Modulation](./docs/architecture/SCROLL_AUDIO_MODULATION.md) - Spatial audio effects