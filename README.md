# Devansh Mahajan Notes

This repository builds the public Quartz site for Devansh Mahajan's Obsidian vault.

## Publishing Flow

1. Notes live in `Devansh-Mahajan/My-Website`.
2. A push to `main` dispatches `vault-updated` to this repository.
3. GitHub Actions checks out the vault, syncs publishable files into `content/`, and builds Quartz.
4. The generated `public/` directory is deployed to GitHub Pages.

The local `content/` folder is kept as a preview snapshot. The vault remains the source of truth.

## Local Commands

```bash
npm ci
npm run dev
npm run build
npm run check
```

## Structure

- `quartz.config.ts` controls metadata, theme, ignored vault folders, and plugins.
- `quartz.layout.ts` controls the navigation, graph, table of contents, and backlinks layout.
- `quartz/styles/custom.scss` contains the Devansh Mahajan visual system.
- `.github/workflows/deploy.yml` syncs the vault and publishes the site.
