# AWaves Audio Visualizer Implementation Plan

## Core Concept
- **AWaves** = signature wireframe visualizer, visual DNA of entire Beaats platform
- **Default state**: Elegant organic wireframe using perlin noise (current homepage look)
- **Audio-reactive state**: "Comes alive" when loops play - pulses, color shifts, frequency response

## Behavior States

### 1. Default State (No Audio)
- Beautiful organic wireframe animation using perlin noise
- Mouse-reactive with ripple effects
- Elegant baseline visual that always looks polished
- Achieved via `resetGrid()` function in WaveformGrid.js

### 2. Audio-Reactive State (Loop Playing)
AWaves becomes a living visualizer:
- **Beat detection** triggers visual pulses and line thickness changes
- **Color shifts** based on frequency content using `--freq-hue` CSS property
- **Grid movement** responds to frequency bands:
  - Bass = horizontal movement
  - Mids = vertical movement
  - Highs = shimmer effects
- **Transient "jolts"** on percussive sounds create sudden movements
- **Glowing effects** and drop shadows based on energy levels
- **Dynamic detail** - more energy creates more detailed grid patterns

## Site-wide Implementation

### Visual Consistency
- **Every primary page** has AWaves at top for unified visual identity
- **Homepage**: Default wireframe, no audio context
- **User pages**: Wireframe responds to their active loops
- **Individual loop pages**: Visualizes that specific track
- **Browse/discover pages**: Responds to currently playing content

### Context-Adaptive Behavior
Same AWaves component, different audio sources:
- Automatically detects and connects to available audio
- Gracefully handles audio state changes
- Maintains visual continuity across page transitions

## Spatial Scroll Design (Future Implementation)

### Doppler-Inspired Audio Positioning
- **Scroll position** determines audio spatial relationship
- **Close to loop** = full volume, clear sound, maximum visual response
- **Scrolling away** = doppler effect kicks in:
  - Pitch shift (higher/lower based on scroll direction)
  - Volume fade as distance increases
  - Visual effects diminish correspondingly
- **Between loops** = audio "travel time" through spatial gaps
- **Long scroll transitions** = sonic journey between loop locations

### User Interaction
- **Scroll speed** controls doppler intensity
- Users can "play" the visualization through scroll behavior
- Creates dynamic mixing effects through navigation
- Encourages exploration and creative interaction

## Technical Implementation

### Core Components
- **AWaves.astro**: Base wireframe component with mouse interactivity
- **WaveformGrid.js**: Audio analysis bridge that connects to AWaves
- **AudioVisualizer.ts**: Provides audio feature extraction and beat detection

### Data Flow
1. Audio plays → AudioVisualizer analyzes → WaveformGrid processes
2. WaveformGrid sets CSS custom properties on AWaves element
3. AWaves reads properties and adapts visual behavior accordingly
4. Audio stops → resetGrid() → AWaves returns to default state

### CSS Properties for Audio Data
```css
--wave-amplitude: /* Overall energy level */
--beat-intensity: /* Beat detection strength */
--bass-level: /* Low frequency content */
--mid-level: /* Mid frequency content */  
--high-level: /* High frequency content */
--transient-level: /* Percussive sound detection */
--freq-hue: /* Dominant frequency mapped to color */
--detail-level: /* Grid complexity based on energy */
```

### Fallback Behavior
- **resetGrid()** removes all audio-reactive CSS properties
- AWaves automatically returns to organic perlin noise animation
- No broken states or visual artifacts when audio unavailable
- Seamless transitions between states

## Page Architecture

### Layout Structure
- **AWaves Hero Section**: Anchored at top, always visible
- **Content Sections Below**: About, features, loop lists, etc.
- **Smooth Scrolling**: Content flows underneath AWaves

### Spatial Relationships
- **Close to top** = AWaves prominent, responds to active audio
- **Scrolling down** = AWaves becomes background context
- **Deep scroll** = Focus shifts to content, AWaves maintains ambient presence

### User Experience Flow
1. **Page load**: AWaves in elegant default state
2. **Audio starts**: Visual awakening, grid comes alive
3. **Scroll exploration**: Spatial audio journey through content
4. **Audio ends**: Graceful return to default beauty

## Implementation Priority

### Phase 1: Basic Audio Reactivity
- [ ] Integrate WaveformGrid.js with existing AWaves component
- [ ] Implement CSS property system for audio data
- [ ] Test state transitions (default ↔ audio-reactive)

### Phase 2: Site-wide Deployment  
- [ ] Add AWaves to all primary page templates
- [ ] Create audio connection system for different page contexts
- [ ] Ensure consistent behavior across user pages

### Phase 3: Spatial Scroll Features
- [ ] Implement doppler effect algorithms
- [ ] Add scroll-based audio modulation
- [ ] Fine-tune spatial audio positioning

### Phase 4: Advanced Features
- [ ] User preference controls
- [ ] Performance optimizations
- [ ] Advanced audio effects and visualizations

## Key Design Principles

1. **Always Beautiful**: AWaves must look stunning even without audio
2. **Seamless Transitions**: No jarring changes between states
3. **Performance First**: Smooth 60fps animation at all times
4. **Context Awareness**: Responds appropriately to page content
5. **Creative Empowerment**: Encourages user experimentation and discovery

## Notes
- AWaves is the **unifying visual element** that gives Beaats its distinctive identity
- Creates that magical "comes alive" moment when music starts
- Serves as both functional visualizer and beautiful baseline aesthetic
- Scroll-based spatial audio makes the entire page an interactive instrument