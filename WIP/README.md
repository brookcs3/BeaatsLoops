# Beats

A prototype social platform for sharing 12-second audio loops. Each user can upload tracks that automatically loop with seamless playback. The page acts as the player itself, providing an interactive audio experience.

## Features

- **Automatic Loop Detection**: Smart algorithms identify optimal loop points for seamless playback
- **Audio Processing**: Normalizes and optimizes audio for web playback
- **Simple Bun Backend**: Fast and efficient file handling and audio analysis
- **Python Integration**: Optional librosa-powered advanced audio processing
- **Streaming Microservice**: Separate service for audio transformation and delivery
- **Modern Web Audio**: Frontend using the Web Audio API for high-quality playback
- **Audio Visualization**: Visual representation of playing tracks

## Documentation

We've created comprehensive documentation to help you get started with Beats:

- [Installation Guide](./INSTALL.md) - Detailed instructions for setting up dependencies
- [API Documentation](./API.md) - Complete reference for all backend endpoints
- [Audio Analysis Algorithms](./docs/audio-analysis.md) - Technical explanation of the audio processing techniques
- [Deployment Guide](./docs/deployment.md) - Instructions for deploying Beats to production
- [Troubleshooting Guide](./docs/troubleshooting.md) - Solutions for common issues
- [Development Roadmap](./docs/roadmap.md) - Future plans and feature ideas

Additional reference docs:
- [Modular Bun Library](./docs/modular-bun-library.md) - Architecture of the audio processing library
- [Streamer Microservice](./docs/streamer-microservice.md) - Details on the streaming component

## Getting Started

1. Install dependencies (see [INSTALL.md](./INSTALL.md) for detailed instructions):
   - [Bun](https://bun.sh)
   - Python 3 with `librosa` and `soundfile`
   - FFmpeg

2. Start the backend server:
   ```bash
   cd backend
   bun start
   ```

3. (Optional) Start the streaming service:
   ```bash
   cd backend
   bun streamer.ts
   ```

4. Access the frontend:
   - Serve the `frontend` folder statically or open `index.html` in a browser
   - The backend also serves the frontend at http://localhost:3000

## Development Tools

- Analyze loop points for a WAV file:
  ```bash
  bun run backend/analyzeSample.ts path/to/file.wav
  ```

- Run tests:
  ```bash
  cd backend
  bun test
  ```

## System Architecture

Beats consists of several components:

1. **Main Server (Port 3000)**
   - Handles file uploads
   - Serves the frontend
   - Manages track metadata
   - Provides API endpoints

2. **Streaming Service (Port 3001)**
   - Processes audio on demand
   - Generates audio metadata
   - Creates optimized WAV files

3. **Frontend Application**
   - Provides upload interface
   - Plays tracks with correct loop points
   - Visualizes audio
   - Handles user preferences

## Contributing

Contributions are welcome! Please refer to our [Development Roadmap](./docs/roadmap.md) for planned features and improvements.

## License

This is a proof-of-concept project. The code is provided for educational purposes.

## Limitations

This is a minimal prototype. Authentication, payment processing, and some advanced audio features are planned but not yet implemented.