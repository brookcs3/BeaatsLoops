# Scroll-Based Audio Modulation System

## Core Concept
User pages with multiple loops positioned at page intervals (0.5-1 page height spacing). Scroll position determines audio relationships through filtering and tempo transitions.

## System Architecture

### Loop Page Layout
```javascript
class LoopPageLayout {
  constructor(userLoops) {
    this.loops = userLoops
    this.pageHeight = window.innerHeight
    this.transitionDistance = 0.5 // 0.5 to 1 page height between loops
    this.setupLoopPositions()
  }

  setupLoopPositions() {
    this.loops.forEach((loop, index) => {
      loop.pagePosition = {
        start: index * this.pageHeight * (1 + this.transitionDistance),
        center: index * this.pageHeight * (1 + this.transitionDistance) + (this.pageHeight * 0.5),
        end: (index + 1) * this.pageHeight * (1 + this.transitionDistance)
      }
      loop.focusZone = this.pageHeight * 0.8 // 80% of page for "in focus"
    })
  }
}
```

### Scroll Audio Controller
```javascript
class ScrollAudioController {
  constructor(loops) {
    this.loops = loops
    this.currentScroll = 0
    this.scrollVelocity = 0
    this.lastScrollTime = 0
    this.activeAudioSources = new Map()
    
    // Audio effect settings
    this.effectType = 'filter' // 'filter' or 'doppler' - TBD
    this.tempoTransitionEnabled = true
    
    this.initScrollListener()
  }

  initScrollListener() {
    // Lenis scroll integration
    window.addEventListener('scroll', this.handleScroll.bind(this))
    
    // Initialize first loop if available
    if (this.loops.length > 0) {
      this.activateLoop(this.loops[0], 1.0) // Full volume for first loop
    }
  }

  handleScroll(event) {
    const now = performance.now()
    const newScrollPosition = window.scrollY
    
    // Calculate scroll velocity for Lenis snap detection
    const deltaTime = now - this.lastScrollTime
    const deltaScroll = newScrollPosition - this.currentScroll
    this.scrollVelocity = Math.abs(deltaScroll / deltaTime) // px per ms
    
    this.currentScroll = newScrollPosition
    this.lastScrollTime = now
    
    // Process audio based on scroll position
    this.updateAudioBasedOnScroll()
  }

  updateAudioBasedOnScroll() {
    // Find active loops based on scroll position
    const activeLoops = this.calculateActiveLoops()
    
    // Update audio for each active loop
    activeLoops.forEach(loopData => {
      this.updateLoopAudio(loopData.loop, loopData.influence, loopData.distance)
    })
    
    // Note: AWaves is only at top of page, not part of scroll transitions
    // Visual feedback during scroll happens through other means (page animations, etc.)
  }

  calculateActiveLoops() {
    const activeLoops = []
    
    this.loops.forEach(loop => {
      const distance = Math.abs(this.currentScroll - loop.pagePosition.center)
      const maxInfluenceDistance = this.pageHeight * 1.5 // Influence radius
      
      if (distance < maxInfluenceDistance) {
        const influence = this.calculateInfluence(distance, maxInfluenceDistance)
        const isInFocus = distance < loop.focusZone
        
        activeLoops.push({
          loop: loop,
          distance: distance,
          influence: influence,
          isInFocus: isInFocus,
          relativePosition: (this.currentScroll - loop.pagePosition.start) / this.pageHeight
        })
      }
    })
    
    return activeLoops.filter(loopData => loopData.influence > 0.01) // Min threshold
  }

  calculateInfluence(distance, maxDistance) {
    // Smooth falloff curve for audio influence
    const normalizedDistance = distance / maxDistance
    return Math.max(0, Math.cos(normalizedDistance * Math.PI / 2))
  }

  updateLoopAudio(loop, influence, distance) {
    // Get or create audio source
    let audioSource = this.activeAudioSources.get(loop.id)
    
    if (!audioSource && influence > 0.1) {
      // Create new audio source
      audioSource = this.createAudioSource(loop)
      this.activeAudioSources.set(loop.id, audioSource)
    }
    
    if (audioSource) {
      // Apply distance-based effects
      this.applyAudioEffects(audioSource, influence, distance)
      
      // Remove if influence too low
      if (influence < 0.05) {
        this.removeAudioSource(loop.id)
      }
    }
  }

  applyAudioEffects(audioSource, influence, distance) {
    // Volume based on influence
    audioSource.audio.volume = influence * audioSource.baseVolume
    
    // Apply effect type (filter vs doppler - TBD)
    if (this.effectType === 'filter') {
      this.applyFilterEffects(audioSource, influence, distance)
    } else if (this.effectType === 'doppler') {
      this.applyDopplerEffects(audioSource, influence, distance)
    }
  }

  // FILTER-BASED EFFECTS
  applyFilterEffects(audioSource, influence, distance) {
    // High-pass when moving away, low-pass when approaching
    const filterFrequency = this.calculateFilterFrequency(influence)
    
    if (audioSource.filter) {
      audioSource.filter.frequency.value = filterFrequency
    }
  }

  calculateFilterFrequency(influence) {
    // Full influence = no filtering (20Hz - 20kHz)
    // Low influence = heavy filtering (muffled like "band next door")
    const minFreq = 200  // Heavy high-pass cutoff
    const maxFreq = 20000 // Full spectrum
    
    return minFreq + (maxFreq - minFreq) * influence
  }

  // DOPPLER-BASED EFFECTS (Alternative approach)
  applyDopplerEffects(audioSource, influence, distance) {
    // Pitch shifting based on movement direction
    const pitchShift = this.calculateDopplerPitchShift()
    audioSource.audio.playbackRate = 1.0 + pitchShift
    
    // Panning based on position
    const panValue = this.calculateDopplerPanning(distance)
    if (audioSource.panner) {
      audioSource.panner.pan.value = panValue
    }
    
    // Additional filtering for distance
    this.applyFilterEffects(audioSource, influence, distance)
  }

  calculateDopplerPitchShift() {
    // Based on scroll velocity and direction
    const maxPitchShift = 0.1 // Maximum 10% pitch change
    const velocityScale = 0.001 // Sensitivity adjustment
    
    // Quick scrolls might skip this effect entirely
    if (this.scrollVelocity > 2.0) { // Fast scroll threshold
      return 0 // No pitch shift for fast navigation
    }
    
    return Math.max(-maxPitchShift, Math.min(maxPitchShift, this.scrollVelocity * velocityScale))
  }

  calculateDopplerPanning(distance) {
    // Simple left/right panning based on relative position
    // Could be enhanced with more sophisticated spatial audio
    return Math.max(-1, Math.min(1, (distance - this.pageHeight * 0.5) / this.pageHeight))
  }

  createAudioSource(loop) {
    const audio = new Audio(loop.src)
    audio.loop = true
    
    // Create Web Audio API context for effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const source = audioContext.createMediaElementSource(audio)
    const gainNode = audioContext.createGain()
    const filter = audioContext.createBiquadFilter()
    const panner = audioContext.createStereoPanner()
    
    // Connect audio graph
    source.connect(filter)
    filter.connect(panner)
    panner.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Configure filter
    filter.type = 'highpass'
    filter.frequency.value = 20 // Start with no filtering
    
    const audioSource = {
      audio: audio,
      audioContext: audioContext,
      source: source,
      gainNode: gainNode,
      filter: filter,
      panner: panner,
      baseVolume: 1.0,
      loop: loop
    }
    
    audio.play()
    return audioSource
  }

  removeAudioSource(loopId) {
    const audioSource = this.activeAudioSources.get(loopId)
    if (audioSource) {
      audioSource.audio.pause()
      audioSource.audio.currentTime = 0
      // Disconnect Web Audio nodes
      audioSource.source.disconnect()
      this.activeAudioSources.delete(loopId)
    }
  }

  findDominantLoop(activeLoops) {
    // Find loop with highest influence for AWaves visualization
    let dominantLoop = null
    let maxInfluence = 0
    
    activeLoops.forEach(loopData => {
      if (loopData.influence > maxInfluence) {
        maxInfluence = loopData.influence
        dominantLoop = loopData.loop
      }
    })
    
    return dominantLoop
  }
}
```

## Tempo Claw Back System

### Tempo Transition Controller
```javascript
class TempoClawBack {
  constructor(scrollController) {
    this.scrollController = scrollController
    this.tempoTransitions = new Map()
  }

  updateTempoTransitions(activeLoops) {
    if (activeLoops.length < 2) return // Need at least 2 loops for tempo transition
    
    // Sort by influence (dominant first)
    const sortedLoops = activeLoops.sort((a, b) => b.influence - a.influence)
    const dominantLoop = sortedLoops[0]
    const secondaryLoop = sortedLoops[1]
    
    // Calculate tempo claw back
    this.applyTempoClawBack(dominantLoop, secondaryLoop)
  }

  applyTempoClawBack(dominantLoop, secondaryLoop) {
    const dominantTempo = dominantLoop.loop.detectedTempo || 120
    const secondaryTempo = secondaryLoop.loop.detectedTempo || 120
    
    // Claw back strength based on influence ratio
    const clawBackStrength = dominantLoop.influence / (dominantLoop.influence + secondaryLoop.influence)
    
    // Calculate target tempos
    const targetTempo = this.calculateClawBackTempo(dominantTempo, secondaryTempo, clawBackStrength)
    
    // Apply tempo modifications
    this.applyTempoToLoop(dominantLoop.loop, targetTempo.dominant)
    this.applyTempoToLoop(secondaryLoop.loop, targetTempo.secondary)
  }

  calculateClawBackTempo(dominantTempo, secondaryTempo, clawBackStrength) {
    // Simple approach: gradual middle point transition
    const targetTempo = this.lerp(secondaryTempo, dominantTempo, clawBackStrength)
    
    return {
      dominant: targetTempo,
      secondary: targetTempo
    }
    
    // Alternative approach: Dominance switching (for future implementation)
    /*
    if (clawBackStrength > 0.7) {
      // Dominant loop wins, secondary adapts
      return {
        dominant: dominantTempo,
        secondary: this.lerp(secondaryTempo, dominantTempo, clawBackStrength)
      }
    } else if (clawBackStrength < 0.3) {
      // Secondary loop still strong, dominant adapts
      return {
        dominant: this.lerp(dominantTempo, secondaryTempo, 1 - clawBackStrength),
        secondary: secondaryTempo
      }
    } else {
      // Middle ground - both move toward center
      const midTempo = (dominantTempo + secondaryTempo) / 2
      return {
        dominant: this.lerp(dominantTempo, midTempo, 0.5),
        secondary: this.lerp(secondaryTempo, midTempo, 0.5)
      }
    }
    */
  }

  applyTempoToLoop(loop, targetTempo) {
    const audioSource = this.scrollController.activeAudioSources.get(loop.id)
    if (audioSource) {
      const originalTempo = loop.detectedTempo || 120
      const playbackRate = targetTempo / originalTempo
      
      // Clamp playback rate to reasonable bounds
      audioSource.audio.playbackRate = Math.max(0.5, Math.min(2.0, playbackRate))
    }
  }

  lerp(start, end, factor) {
    return start + (end - start) * factor
  }
}
```

## Lenis Integration

### Snap-to-Page Behavior
```javascript
class LenisScrollIntegration {
  constructor(loops, audioController) {
    this.loops = loops
    this.audioController = audioController
    this.fastScrollThreshold = 2.0 // px/ms
    this.initLenis()
  }

  initLenis() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2
    })

    // Define snap points for each loop page
    this.snapPoints = this.loops.map(loop => loop.pagePosition.center)
    
    this.lenis.on('scroll', this.handleLenisScroll.bind(this))
  }

  handleLenisScroll(e) {
    // Pass scroll data to audio controller
    this.audioController.handleScroll(e)
    
    // Check for fast scroll and auto-snap
    if (this.audioController.scrollVelocity > this.fastScrollThreshold) {
      this.handleFastScroll()
    }
  }

  handleFastScroll() {
    // Find nearest snap point for fast scrolls
    const currentScroll = window.scrollY
    let nearestSnapPoint = this.snapPoints[0]
    let minDistance = Math.abs(currentScroll - nearestSnapPoint)
    
    this.snapPoints.forEach(snapPoint => {
      const distance = Math.abs(currentScroll - snapPoint)
      if (distance < minDistance) {
        minDistance = distance
        nearestSnapPoint = snapPoint
      }
    })
    
    // Auto-snap to nearest page
    this.lenis.scrollTo(nearestSnapPoint, {
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3)
    })
  }
}
```

## Main System Integration

### Initialize Complete System
```javascript
class ScrollAudioSystem {
  constructor(userLoops, awavesElement) {
    // Initialize components
    this.layout = new LoopPageLayout(userLoops)
    this.audioController = new ScrollAudioController(this.layout.loops, awavesElement)
    this.tempoController = new TempoClawBack(this.audioController)
    this.lenisIntegration = new LenisScrollIntegration(this.layout.loops, this.audioController)
    
    // Configuration
    this.config = {
      effectType: 'filter', // 'filter' or 'doppler' - TBD through testing
      enableTempoTransitions: true,
      enableFastScrollSnap: true,
      transitionSensitivity: 1.0 // Multiplier for effect strength
    }
    
    this.bindEvents()
  }

  bindEvents() {
    // Listen for configuration changes
    document.addEventListener('audioEffectTypeChange', (e) => {
      this.audioController.effectType = e.detail.effectType
    })
    
    // Handle tempo transition updates
    this.audioController.on('activeLoopsUpdate', (activeLoops) => {
      if (this.config.enableTempoTransitions) {
        this.tempoController.updateTempoTransitions(activeLoops)
      }
    })
  }

  // Public API for testing different approaches
  setEffectType(type) {
    this.audioController.effectType = type
  }

  setTempoTransitionsEnabled(enabled) {
    this.config.enableTempoTransitions = enabled
  }

  adjustTransitionSensitivity(multiplier) {
    this.config.transitionSensitivity = multiplier
    // Apply to audio controller settings
  }
}

// Usage
const userLoops = getUserLoops() // Load user's loops with detected tempo data
const awavesElement = document.querySelector('a-waves')
const scrollAudioSystem = new ScrollAudioSystem(userLoops, awavesElement)
```

## Testing Approaches

### A/B Testing Framework
```javascript
class AudioEffectTesting {
  constructor(scrollAudioSystem) {
    this.system = scrollAudioSystem
    this.testVariants = {
      'filter-only': { effectType: 'filter', tempoTransitions: false },
      'doppler-only': { effectType: 'doppler', tempoTransitions: false },
      'filter-with-tempo': { effectType: 'filter', tempoTransitions: true },
      'doppler-with-tempo': { effectType: 'doppler', tempoTransitions: true }
    }
  }

  runTest(variantName) {
    const variant = this.testVariants[variantName]
    if (variant) {
      this.system.setEffectType(variant.effectType)
      this.system.setTempoTransitionsEnabled(variant.tempoTransitions)
      console.log(`Testing variant: ${variantName}`)
    }
  }
}
```

## Key Implementation Notes

1. **Start Simple**: Begin with filter-based effects, add doppler later
2. **Tempo Transitions**: Start with gradual middle-point approach, test dominance switching
3. **Fast Scroll Handling**: Lenis integration prevents audio effects during rapid navigation
4. **Performance**: Use Web Audio API for efficient real-time processing
5. **User Control**: Scroll speed naturally controls effect intensity
6. **AWaves Integration**: Dominant loop automatically drives visualization

## Decision Points for Development

- **Effect Type**: Filter vs Doppler (start with filter)
- **Tempo Transition**: Gradual vs Dominance switching (start with gradual)
- **Scroll Sensitivity**: Fine-tune thresholds through user testing
- **Page Spacing**: 0.5x vs 1x page height transitions
- **Effect Intensity**: Balance between noticeable and musical