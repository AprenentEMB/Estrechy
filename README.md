# QuickStretch

A mobile-first PWA that delivers guided stretching routines based on user-selected body parts and pain types.

## Features

- Interactive SVG body map to select the area that hurts
- Pain type selection (stiffness, dull, sharp, throbbing)
- Personalised stretch routines with step-by-step exercise player
- Built-in timer with video loop support
- Dark / light mode
- Installable PWA with offline support

## Tech Stack

- **React 19** + **TypeScript** (strict mode) + **Vite**
- **Zustand** — global state management
- **Framer Motion** — animations
- **TailwindCSS** — styling
- **vite-plugin-pwa** — service worker & PWA manifest

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Type-check + production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Serve the production build locally |

## Project Structure

```
frontend/
  src/
    components/   # UI components (BodySelector, ExercisePlayer, …)
    data/         # Mock exercise & routine data
    hooks/        # Custom hooks (useTheme, …)
    pages/        # HomePage — single-page app shell
    store/        # Zustand store (useAppStore)
    types/        # Shared TypeScript types
```

## Roadmap

- [ ] Bun REST API backend
- [ ] Supabase database integration
- [ ] WebM exercise video assets
- [ ] User progress tracking

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
