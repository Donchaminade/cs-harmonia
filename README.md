# Complexe Scolaire Harmonia

Site officiel du Complexe Scolaire Harmonia (Adetikopé, Lomé, Togo) : jardin d'enfants, primaire, collège et bientôt lycée.

## Lancer en local
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build + pré-rendu statique (SEO)
npm run preview  # http://localhost:4173
```

## Stack
React 19, Vite, TypeScript, Tailwind CSS 4, motion. Une seule page avec ancres, pré-rendue au build (`scripts/prerender.mjs`) pour que le contenu soit lisible sans JavaScript.

## Formulaires
La pré-inscription et le contact ouvrent un message WhatsApp (+228 90 06 25 24) ou un e-mail prérempli vers harmoniaschool925@gmail.com. Aucune donnée n'est stockée sur le site.

## Photos
Les images de `public/images/` sont des photos d'illustration (Unsplash). Remplacez-les par les vraies photos de l'école en gardant les mêmes noms (`<nom>-800.webp` et `<nom>-1600.webp`).
