# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A **universal e-book framework** with realistic page-flip effects, chapter-based navigation, and background music per chapter. Users can customize their own e-book by modifying just 2 configuration files.

## Commands

```bash
npm run dev      # Start development server (Vite)
npm run build    # TypeScript check + production build
npm run lint     # ESLint
npm run preview  # Preview production build locally
```

## Quick Start for Customization

**To create your own e-book, edit these 2 files:**

1. **`src/config/book.config.ts`** - Book metadata & theme
   - Book title, subtitle, author
   - Theme colors (cover, paper, text, accent)
   - Feature toggles (music, navigation)

2. **`src/config/content.config.ts`** - Content
   - Music tracks definitions
   - Chapters (with optional musicId reference)
   - Pages (content blocks, images, layout)

Page ranges are calculated automatically - no manual maintenance needed!

## Architecture

**Tech Stack**: React 18 + TypeScript + Vite + Tailwind CSS + Zustand

**Key Libraries**:
- `react-pageflip`: Core page-flip animation (HTMLFlipBook component)
- `zustand`: State management for book navigation and audio playback

**Configuration System** (`src/config/`):
- `book.config.ts`: Book info, theme colors, feature flags
- `content.config.ts`: Music, chapters, pages (unified data source)

**Config Loader** (`src/lib/`):
- `config-loader.ts`: Processes config, auto-calculates page ranges
- `theme-loader.ts`: Applies theme colors to CSS variables

**State Management** (`src/stores/`):
- `bookStore`: Current page, chapter, total pages, flipping state
- `audioStore`: Music playback, volume, track selection, auto-play

**Book Structure** (`src/components/book/`):
- `BookContainer`: Main component wrapping HTMLFlipBook with cover, TOC, content pages, and back cover
- `BookCover`: Reads title/author from config
- Pages indexed as: Cover(0) → TOC(1) → Content pages(2+) → Back cover

**Custom Hooks** (`src/hooks/`):
- `useChapterMusic`: Auto-plays background music when entering a chapter
- `useKeyboardNav`: Arrow keys, Home/End navigation
- `useResponsiveBook`: Calculates book dimensions for mobile/desktop

**Path Alias**: `@/*` maps to `./src/*`

## Page Layout Types

- `text-only`: Pure text content
- `image-full`: Full-page image
- `text-image-split`: Text above, image below
- `two-column`: Two-column text layout

## Deployment

GitHub Pages via `.github/workflows/deploy.yml`:
- Triggered on push to `master` branch
- Base URL configured as `/flip-book-template/`
- Output to `dist/` directory
