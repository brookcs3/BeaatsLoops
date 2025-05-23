# Music Box System - Advanced Loop Sequencing

## Core Concept
Transform individual audio loops (up to 12-second maximum) into full musical compositions through tag-based sequencing and spatial scroll navigation. Users can create "faux songs" through two methods:
1. **Music Box Sequencer**: Text-based loop ordering system
2. **Scroll Composition**: Spatial navigation creates dynamic mixing

## Music Box Sequencer System

### Basic Functionality
Users can create custom sequences using loop tags to build longer musical experiences.

**Example User Loops:**
- `#loop1` - Intro/Ambient pad
- `#loop2` - Main beat 
- `#loop3` - Bassline
- `#loop4` - Melodic hook
- `#loop5` - Outro/Bridge

**Music Box Input:**
```
#loop4 #loop4 #loop1 #loop4 #loop2 #loop2 #loop3 #loop4
```

### Pseudo-code Architecture

```javascript
class MusicBox {
  constructor(userLoops, awavesVisualizer) {
    this.userLoops = userLoops // { '#loop1': audioFile, '#loop2': audioFile, ... }
    this.awaves = awavesVisualizer
    this.sequence = []
    this.currentIndex = 0
    this.isPlaying = false
    this.loopMode = true // Always loop sequences
  }

  // Parse user input sequence
  parseSequence(inputString) {
    // "#loop4 #loop4 #loop1 #loop4" -> ['#loop4', '#loop4', '#loop1', '#loop4']
    this.sequence = inputString.trim().split(/\s+/).filter(tag => {
      return this.userLoops.hasOwnProperty(tag)
    })
    
    // Validate all tags exist
    const invalidTags = this.sequence.filter(tag => !this.userLoops[tag])
    if (invalidTags.length > 0) {
      throw new Error(`Invalid loop tags: ${invalidTags.join(', ')}`)
    }
    
    return this.sequence
  }

  // Start sequence playback
  async play(sequenceString = null) {
    if (sequenceString) {
      this.parseSequence(sequenceString)
    }
    
    if (this.sequence.length === 0) {
      throw new Error('No sequence loaded')
    }

    this.isPlaying = true
    this.currentIndex = 0
    
    // Begin playback loop
    this.playCurrentLoop()
  }

  // Play current loop in sequence
  async playCurrentLoop() {
    if (!this.isPlaying) return

    const currentTag = this.sequence[this.currentIndex]
    const audioFile = this.userLoops[currentTag]
    
    // Update AWaves to visualize current loop
    this.awaves.connectAudio(audioFile)
    
    // Play the loop (up to 12 seconds)
    await this.playLoop(audioFile)
    
    // Advance to next loop in sequence
    this.advanceSequence()
  }

  // Handle sequence progression
  advanceSequence() {
    this.currentIndex++
    
    // Loop back to beginning when sequence ends
    if (this.currentIndex >= this.sequence.length) {
      this.currentIndex = 0
    }
    
    // Continue if still playing
    if (this.isPlaying) {
      // Small gap between loops for seamless feel
      setTimeout(() => this.playCurrentLoop(), 100)
    }
  }

  // Play individual loop with automatic loop detection
  async playLoop(audioFile) {
    return new Promise((resolve) => {
      const audio = new Audio(audioFile.src)
      
      // Apply loop points from automatic detection
      audio.currentTime = audioFile.loopStart || 0
      const loopEnd = audioFile.loopEnd || audio.duration
      
      audio.play()
      
      // Monitor playback and loop seamlessly
      const checkLoop = () => {
        if (audio.currentTime >= loopEnd) {
          audio.currentTime = audioFile.loopStart || 0
        }
        
        if (this.isPlaying && audio.currentTime < loopEnd) {
          requestAnimationFrame(checkLoop)
        } else {
          audio.pause()
          resolve()
        }
      }
      
      checkLoop()
    })
  }

  // Stop sequence
  stop() {
    this.isPlaying = false
    this.awaves.resetGrid() // Return to default state
  }

  // Pause/Resume
  pause() {
    this.isPlaying = false
  }

  resume() {
    if (this.sequence.length > 0) {
      this.isPlaying = true
      this.playCurrentLoop()
    }
  }
}
```

### UI Components

```javascript
// Music Box UI Component (Astro/React)
class MusicBoxUI {
  constructor() {
    this.musicBox = null
    this.userLoops = {}
  }

  render() {
    return `
      <div class="music-box">
        <h3>Music Box Sequencer</h3>
        
        <!-- Available loops display -->
        <div class="available-loops">
          <h4>Your Loops:</h4>
          ${Object.keys(this.userLoops).map(tag => 
            `<span class="loop-tag" onclick="addToSequence('${tag}')">${tag}</span>`
          ).join('')}
        </div>
        
        <!-- Sequence input -->
        <div class="sequence-input">
          <textarea 
            id="sequence-text" 
            placeholder="Enter sequence: #loop1 #loop2 #loop1 #loop3"
            rows="3"
          ></textarea>
          <button onclick="playSequence()">Play Sequence</button>
          <button onclick="stopSequence()">Stop</button>
        </div>
        
        <!-- Current playing info -->
        <div class="now-playing">
          <span id="current-loop">Ready to play...</span>
          <div class="sequence-progress">
            <div id="progress-bar"></div>
          </div>
        </div>
        
        <!-- Saved sequences -->
        <div class="saved-sequences">
          <h4>Saved Compositions:</h4>
          <div id="saved-list">
            <!-- User's saved sequences -->
          </div>
        </div>
      </div>
    `
  }

  // Helper functions
  addToSequence(tag) {
    const textarea = document.getElementById('sequence-text')
    textarea.value += (textarea.value ? ' ' : '') + tag
  }

  async playSequence() {
    const sequenceText = document.getElementById('sequence-text').value
    try {
      await this.musicBox.play(sequenceText)
    } catch (error) {
      alert(`Error: ${error.message}`)
    }
  }

  stopSequence() {
    this.musicBox.stop()
    document.getElementById('current-loop').textContent = 'Stopped'
  }
}
```

## Spatial Scroll Composition System

### Concept
Transform vertical scrolling into a musical instrument where scroll position and speed create dynamic audio experiences.

### Pseudo-code Implementation

```javascript
class ScrollComposer {
  constructor(userLoops, pageHeight) {
    this.loops = userLoops // Array of user's loops positioned on page
    this.pageHeight = pageHeight
    this.activeLoops = new Map() // Currently playing loops with volumes
    this.scrollPosition = 0
    this.scrollVelocity = 0
    this.lastScrollTime = 0
  }

  // Initialize scroll-based composition
  init() {
    // Position loops spatially on the page
    this.positionLoops()
    
    // Listen for scroll events
    window.addEventListener('scroll', this.handleScroll.bind(this))
    
    // Start audio processing loop
    this.startAudioProcessing()
  }

  // Position loops at different vertical positions
  positionLoops() {
    this.loops.forEach((loop, index) => {
      // Spread loops across page height with spacing
      const spacing = this.pageHeight / (this.loops.length + 1)
      loop.pagePosition = spacing * (index + 1)
      loop.influenceRadius = 200 // px around loop for audio effect
    })
  }

  // Handle scroll events and calculate audio effects
  handleScroll(event) {
    const now = performance.now()
    const newScrollPosition = window.scrollY
    
    // Calculate scroll velocity (for doppler effects)
    const deltaTime = now - this.lastScrollTime
    const deltaScroll = newScrollPosition - this.scrollPosition
    this.scrollVelocity = deltaScroll / deltaTime // px per ms
    
    this.scrollPosition = newScrollPosition
    this.lastScrollTime = now
    
    // Update audio based on new position
    this.updateSpatialAudio()
  }

  // Calculate and apply spatial audio effects
  updateSpatialAudio() {
    this.loops.forEach(loop => {
      const distance = Math.abs(this.scrollPosition - loop.pagePosition)
      const influence = this.calculateInfluence(distance, loop.influenceRadius)
      
      if (influence > 0) {
        // Loop is within hearing range
        this.activateLoop(loop, influence)
      } else {
        // Loop is too far away
        this.deactivateLoop(loop)
      }
    })
  }

  // Calculate audio influence based on distance
  calculateInfluence(distance, radius) {
    if (distance > radius) return 0
    
    // Smooth falloff curve
    const normalizedDistance = distance / radius
    return Math.cos(normalizedDistance * Math.PI / 2) // Cosine falloff
  }

  // Activate loop with spatial effects
  activateLoop(loop, influence) {
    if (!this.activeLoops.has(loop.id)) {
      // Start playing loop
      const audio = new Audio(loop.src)
      audio.loop = true
      audio.play()
      
      this.activeLoops.set(loop.id, {
        audio: audio,
        baseVolume: 1.0
      })
    }

    const activeLoop = this.activeLoops.get(loop.id)
    
    // Apply distance-based volume
    activeLoop.audio.volume = influence * activeLoop.baseVolume
    
    // Apply doppler effect based on scroll velocity
    const dopplerShift = this.calculateDopplerShift(this.scrollVelocity)
    activeLoop.audio.playbackRate = 1.0 + dopplerShift
    
    // Update AWaves visualizer with combined audio
    this.updateVisualizerForLoop(loop, influence)
  }

  // Deactivate distant loop
  deactivateLoop(loop) {
    if (this.activeLoops.has(loop.id)) {
      const activeLoop = this.activeLoops.get(loop.id)
      activeLoop.audio.pause()
      this.activeLoops.delete(loop.id)
    }
  }

  // Calculate doppler shift based on scroll velocity
  calculateDopplerShift(velocity) {
    // Velocity in px/ms, convert to reasonable audio effect
    const maxShift = 0.1 // Maximum 10% pitch change
    const velocityScale = 0.001 // Adjust sensitivity
    
    return Math.max(-maxShift, Math.min(maxShift, velocity * velocityScale))
  }

  // Update visualizer based on active loops
  updateVisualizerForLoop(dominantLoop, influence) {
    // Find the loop with highest influence (closest to user)
    let maxInfluence = 0
    let primaryLoop = null
    
    this.activeLoops.forEach((activeLoop, loopId) => {
      const loop = this.loops.find(l => l.id === loopId)
      const dist = Math.abs(this.scrollPosition - loop.pagePosition)
      const inf = this.calculateInfluence(dist, loop.influenceRadius)
      
      if (inf > maxInfluence) {
        maxInfluence = inf
        primaryLoop = activeLoop
      }
    })
    
    // Connect primary loop to AWaves visualizer
    if (primaryLoop) {
      // Update AWaves to visualize the dominant loop
      this.awaves.connectAudio(primaryLoop.audio)
    }
  }

  // Create pseudo-songs through guided scrolling
  createScrollSong(scrollPattern) {
    // Automated scrolling to create compositions
    // scrollPattern: [{ position: 1000, duration: 3000, speed: 'smooth' }, ...]
    
    scrollPattern.forEach((step, index) => {
      setTimeout(() => {
        window.scrollTo({
          top: step.position,
          behavior: step.speed || 'smooth'
        })
      }, step.duration * index)
    })
  }
}
```

## Advanced Features

### 1. Sequence Sharing System
```javascript
class SequenceSharing {
  // Save user sequences with metadata
  saveSequence(name, sequenceString, tags = []) {
    const sequence = {
      id: generateId(),
      name: name,
      sequence: sequenceString,
      tags: tags,
      created: new Date(),
      userId: getCurrentUser().id,
      plays: 0,
      likes: 0
    }
    
    // Save to user profile and public gallery
    return this.database.saveSequence(sequence)
  }

  // Share sequence as URL
  shareSequence(sequenceId) {
    return `${BASE_URL}/sequence/${sequenceId}`
  }

  // Embed sequence in page sections
  embedSequence(sequenceId, containerId) {
    // Allow users to embed music box players in different page sections
    const container = document.getElementById(containerId)
    const player = new MiniMusicBoxPlayer(sequenceId)
    container.appendChild(player.render())
  }
}
```

### 2. Smart Sequence Suggestions
```javascript
class SequenceAI {
  // Suggest sequences based on user's loops
  suggestSequences(userLoops) {
    // Analyze loop characteristics (tempo, key, energy)
    const analysis = this.analyzeLoops(userLoops)
    
    // Generate musically coherent sequences
    return this.generateSequences(analysis)
  }

  // Analyze harmonic/rhythmic compatibility
  analyzeLoops(loops) {
    return loops.map(loop => ({
      tempo: this.detectTempo(loop),
      key: this.detectKey(loop),
      energy: this.detectEnergy(loop),
      instruments: this.detectInstruments(loop)
    }))
  }
}
```

### 3. Performance Mode
```javascript
class PerformanceMode {
  // Live performance interface
  constructor(musicBox, midiController = null) {
    this.musicBox = musicBox
    this.midi = midiController
    this.isLive = false
  }

  // Enable live performance controls
  enableLiveMode() {
    this.isLive = true
    
    // Map keyboard/MIDI to loop triggers
    this.bindControls({
      '1': '#loop1',
      '2': '#loop2',
      '3': '#loop3',
      // ... map all user loops
    })
  }

  // Trigger loops in real-time
  triggerLoop(loopTag) {
    if (this.isLive) {
      // Immediate playback for live performance
      this.musicBox.playImmediate(loopTag)
    }
  }
}
```

## UI Integration Points

### User Page Layout
```
┌─────────────────────────────────┐
│           AWaves Hero           │ ← Always at top, visualizes active audio
├─────────────────────────────────┤
│        Music Box UI             │ ← Sequence composer
├─────────────────────────────────┤
│          Loop #1                │ ← Individual loops with spatial positioning
│         [≤12 sec audio]         │
├─────────────────────────────────┤
│    [Transition Space]           │ ← Doppler effect zone
├─────────────────────────────────┤
│          Loop #2                │
│         [≤12 sec audio]         │
├─────────────────────────────────┤
│    [Transition Space]           │
├─────────────────────────────────┤
│          Loop #3                │
│         [≤12 sec audio]         │
└─────────────────────────────────┘
```

### Key Interactions
1. **Music Box Sequencer**: Text input creates custom playlists
2. **Loop Tags**: Click to add to sequence, hover to preview
3. **Spatial Scrolling**: Natural scroll navigation creates audio effects
4. **Performance Mode**: Real-time triggering for live composition
5. **Sharing**: Export sequences as URLs or embeddable players

## Creative Possibilities

### User-Generated Content
- **Custom Compositions**: 12-second loops become building blocks for full songs
- **Collaborative Sequences**: Share and remix other users' sequences  
- **Performance Art**: Live performances using scroll and sequence techniques
- **Audio Stories**: Narrative compositions using loop progressions

### Discovery Features
- **Sequence Playlists**: Curated collections of user compositions
- **Trending Sequences**: Popular combinations and patterns
- **Random Generation**: AI-suggested sequences based on loop compatibility
- **Genre Categories**: Classical sequences, electronic, ambient, etc.

This system transforms individual audio loops (up to 12 seconds) into a powerful composition tool, making every user page an interactive music creation environment while maintaining the elegant simplicity of the core concept.