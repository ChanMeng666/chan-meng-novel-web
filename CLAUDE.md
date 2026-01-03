# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An interactive e-book website for "Chan's Novel" - a personal autobiography with realistic page-flip effects, chapter-based navigation, and background music per chapter.

## Commands

```bash
npm run dev      # Start development server (Vite)
npm run build    # TypeScript check + production build
npm run lint     # ESLint
npm run preview  # Preview production build locally
```

## Architecture

**Tech Stack**: React 18 + TypeScript + Vite + Tailwind CSS + Zustand

**Key Libraries**:
- `react-pageflip`: Core page-flip animation (HTMLFlipBook component)
- `zustand`: State management for book navigation and audio playback

**State Management** (`src/stores/`):
- `bookStore`: Current page, chapter, total pages, flipping state
- `audioStore`: Music playback, volume, track selection, auto-play

**Data Model** (`src/data/`):
- `chapters.ts`: Chapter definitions with page ranges and optional music tracks
- `pages.ts`: Individual page content (PageData with layout types: text-only, image-full, text-image-split, two-column)
- `music-config.ts`: Chapter-to-music mappings

**Book Structure** (`src/components/book/`):
- `BookContainer`: Main component wrapping HTMLFlipBook with cover, TOC, content pages, and back cover
- Pages indexed as: Cover(0) → TOC(1) → Content pages(2+) → Back cover

**Custom Hooks** (`src/hooks/`):
- `useChapterMusic`: Auto-plays background music when entering a chapter
- `useKeyboardNav`: Arrow keys, Home/End navigation
- `useResponsiveBook`: Calculates book dimensions for mobile/desktop

**Path Alias**: `@/*` maps to `./src/*`

## Deployment

GitHub Pages via `.github/workflows/deploy.yml`:
- Triggered on push to `master` branch
- Base URL configured as `/chan-meng-novel-web/`
- Output to `dist/` directory
