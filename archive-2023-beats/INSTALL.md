# Beats Installation Guide

This guide will help you set up all the necessary dependencies to run the Beats audio platform.

## Prerequisites

### 1. Install Bun Runtime

Bun is required to run the Beats backend.

#### macOS (using Homebrew)
```bash
brew tap oven-sh/bun
brew install bun
```

#### macOS/Linux (without Homebrew)
```bash
curl -fsSL https://bun.sh/install | bash
```

#### Windows
```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```

### 2. Install Python Dependencies

The audio processing features require Python 3 with specific libraries.

```bash
# Install Python 3 (if not already installed)
# macOS
brew install python3

# Install required Python libraries
pip3 install librosa soundfile numpy
```

### 3. Install FFmpeg

FFmpeg is needed for audio file conversion.

```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt-get install ffmpeg

# Windows
# Download from https://ffmpeg.org/download.html
```

## Setting Up the Project

1. Clone the repository (if you haven't already)
```bash
git clone [repository-url]
cd path/to/project/Beats
```

2. Navigate to the backend directory
```bash
cd backend
```

3. Create necessary directories
```bash
mkdir -p uploads processed
```

## Running the Backend

1. Start the main server
```bash
cd backend
bun start
# Or alternatively:
bun server.js
```

2. Start the streaming service (in a separate terminal)
```bash
cd backend
bun streamer.ts
```

## Testing

### Run all tests
```bash
cd backend
bun test
```

### Run a specific test
```bash
bun test tests/loopAnalysis.test.ts
```

### Test loop analysis on a sample
```bash
bun run analyzeSample.ts path/to/audio/file.wav
```

## Accessing the Application

- Main application: http://localhost:3000
- Streaming service: http://localhost:3001/stream/[filename]

## Troubleshooting

If you encounter issues with audio processing:

1. Verify Python libraries are correctly installed:
```bash
python3 -c "import librosa, soundfile; print('Libraries installed')"
```

2. Check FFmpeg installation:
```bash
ffmpeg -version
```

3. Ensure proper file permissions for the uploads and processed directories.

4. Check for any error messages in the terminal when running the backend.