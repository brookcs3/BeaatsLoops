# BeaatsLoops

BeaatsLoops is an experimental Astro project exploring what a 12‑second audio social platform might look like. The site acts as its own player, looping short audio clips while driving a reactive wireframe visualiser.

## Project Goals

- **Minimal sharing** – users upload ultra‑short loops that can be embedded or shared as a profile page.
- **Audio driven visuals** – the signature `AWaves` component generates a dynamic grid that reacts to frequency data exposed via CSS variables.
- **Fast build tools** – the prototype is built with [Astro](https://astro.build/) and vanilla Web Audio. It was originally intended to run on Bun, but Node 18+ works fine for experimentation.

## Running Locally

```bash
npm install      # install dependencies
npm run dev      # start the Astro dev server on http://localhost:4321
```

The project was last tested with Node 18. If `astro` is missing after install you may need to run `npm install` again.

## Repository Layout

```
src/
  components/     Astro components including AWaves
  pages/          Site routes (only index.astro for now)
  utils/          Small helper libraries (Emitter, Noise, etc.)
public/           Static assets and icons
```

### Highlight: `AWaves.astro`

`src/components/AWaves.astro` implements a Perlin‑noise based grid that tracks mouse movement and reacts to audio features supplied via CSS custom properties. When the page is marked with `.audio-playing`, the visualiser pulls in values like `--bass-level` and `--high-level` to distort the lines and add glow effects.

```typescript
// simplified snippet
this.lines.forEach((points, lineIndex) => {
  points.forEach((p, pointIndex) => {
    const move = this.noise.perlin2((p.x + time * 0.0125) * noiseScale, (p.y + time * 0.005) * noiseScale) * 12;
    p.wave.x = Math.cos(move) * 32 * (1 + bassLevel * 2);
    p.wave.y = Math.sin(move) * 16 * (1 + midLevel * 1.5);
  });
});
```

This approach keeps the heavy math in JavaScript while allowing designers to tweak the visual response purely through CSS.

## Documentation

Further design notes live in [docs/](docs/). `docs/architecture/overview.md` contains a simple Mermaid diagram showing the intended flow between the uploader, the Web Audio player, and the visualiser.

