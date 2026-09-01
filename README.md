# Portfolio Website

Personal portfolio with an interactive 3D hero section, built with React and Three.js. Live at https://apicad.github.io/.

## What it does

One scrolling page that introduces me as a developer. It opens on a hero section with an animated 3D house model you can interact with, then moves through About, Skills (a game-style skill tree), Work Experience, and Projects, closing with a footer of contact links. A loading screen covers the initial 3D asset load so the page never appears half-ready.

## Key features

- Interactive 3D house model, designed in Spline and rendered through react-three-fiber
- Loading screen that preloads the Spline scenes before revealing the page
- 3D components are lazy loaded behind Suspense, so the first paint does not wait for Three.js
- Typewriter hero text and motion-based section transitions
- Smooth scroll navigation between sections
- Bundle-size and Lighthouse scripts (`npm run analyze`, `npm run perf`) for keeping performance in check

## Tech stack

- React 19 with Vite 7
- SCSS, one stylesheet per component
- Three.js with @react-three/fiber and @react-three/drei
- Spline runtime for the 3D scene
- Motion (Framer Motion) for animations, react-scroll for navigation
- Deployed to GitHub Pages with gh-pages

## How it works

`App.jsx` composes the page from self-contained section components, each living in its own folder under `components/` with its JSX and SCSS side by side. The heavy 3D pieces are split out of the main bundle and lazy loaded, while a loading screen preloads the Spline scenes and fades into the page once they are ready. The whole site stays static and deploys as plain files.

## Running it locally

```sh
npm install
npm run dev        # Vite dev server at http://localhost:5173
```

Other scripts:

```sh
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm run deploy     # publish dist/ to GitHub Pages
npm run analyze    # build and open the bundle-size report
```

## What I learned / why I built it

I built this to have one place that shows my work, and to push myself past a standard template portfolio. Most of what I learned came from performance problems I created for myself: putting a Spline scene on the first screen made the initial load heavy, and fixing that taught me about code splitting, lazy loading, and preloading assets behind a loading screen. It was also my first real project combining Spline models with react-three-fiber, and it taught me to organize SCSS so a growing site stays maintainable.
