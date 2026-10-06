# Motion / Select

A small React + TypeScript study that combines the accessible [Base UI Select](https://base-ui.com/react/components/select) with [Motion for React](https://motion.dev/).

## Run locally

```bash
npm install
npm run dev
```

## What is included

- A keyboard-accessible, unstyled Base UI Select with four easing presets.
- Motion-powered popup enter/exit animation and a live preview that responds to the selected preset.
- Reduced-motion support via Motion's `useReducedMotion` hook.
- Responsive layout with no additional UI or icon packages.

The modern package is `motion` (the current Motion for React package, formerly Framer Motion); import React APIs from `motion/react`.

```tsx
import { motion } from 'motion/react'
```

## Checks

```bash
npm run lint
npm run build
```
