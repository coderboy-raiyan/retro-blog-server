# Node + TS + Express + Bun - Starter

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A minimal Node.js + Express server written in TypeScript, designed to run with Bun runtime. Uses MongoDB (via Mongoose) for data persistence.

## Runtime & Package Manager

This project uses **Bun** as both the runtime and package manager (not npm/yarn/pnpm).

- Install dependencies: `bun install`
- All scripts run via `bun run <script>`

## Development Commands

### Running the Server
```bash
bun run dev          # Development mode with hot-reload (watches src/server.ts)
bun run build        # Build for production (outputs to ./dist)
bun run start        # Run production build (requires Node.js)
```

### Code Quality
```bash
bun run lint         # Run ESLint
bun run lint:fix     # Auto-fix ESLint issues
bun run format       # Format all TypeScript files with Prettier
bun run format:check # Check Prettier formatting without changes
bun run typecheck    # Type-check without emitting files
```

## Architecture

### Entry Points
- **`src/server.ts`**: Application bootstrap - connects to MongoDB and starts HTTP server
- **`src/app.ts`**: Express application configuration with middleware setup
- **`src/config/index.ts`**: Environment configuration loader (from `.env`)

### Application Flow
1. `server.ts` imports the Express app from `app.ts`
2. Establishes MongoDB connection via Mongoose
3. Creates HTTP server and listens on configured PORT
4. Express app has CORS enabled with `origin: '*'` and credentials support

### Project Structure
```
src/
├── server.ts          # Bootstrap & database connection
├── app.ts             # Express app & middleware
└── config/
    └── index.ts       # Environment variables
```

### Middleware Stack (in order)
1. `express.json()` - Body parsing
2. `cookie-parser` - Cookie parsing
3. `cors` - CORS with credentials enabled

### Environment Variables
Required in `.env`:
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (e.g., "development")
- `DB_URI` - MongoDB connection string

## Code Style

### ESLint Rules
- Unused variables error (except those prefixed with `_`)
- `no-explicit-any` is a warning, not an error
- `prefer-const` enforced
- `no-console` is a warning (use sparingly)

### Prettier Configuration
- Single quotes
- Semicolons required
- Tab width: 4 spaces
- Print width: 100 characters
- Arrow function parens: avoid when possible
- Trailing commas: ES5 style

## Technical Details

### TypeScript Configuration
- Target: ES2022
- Module: ESNext with bundler resolution
- Strict mode enabled
- Types: bun-types, node

### Dependencies
- **Express 5.x** (note: v5, not v4)
- **Mongoose 8.x** for MongoDB ODM
- Cookie parser and CORS middleware included

## Development Notes

- The project currently has a minimal structure with only the core setup files
- No routes, controllers, models, or services layers exist yet
- When adding new features, follow Express best practices for organizing routes and middleware
- MongoDB connection uses `mongoose.connect()` - ensure MongoDB is running locally or adjust DB_URI
