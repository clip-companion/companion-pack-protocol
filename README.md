# @companion/pack-protocol

TypeScript types and utilities for building Clip Companion game packs.

## Installation

```bash
npm install @companion/pack-protocol
# or
pnpm add @companion/pack-protocol
```

## Usage

### Creating a Game Pack

```typescript
import type { GamePack, BaseMatch } from "@companion/pack-protocol";
import { usePackCache } from "@companion/pack-protocol";
import { MatchCard } from "./components/MatchCard";

// Extend BaseMatch with game-specific fields
interface MyGameMatch extends BaseMatch {
  kills: number;
  deaths: number;
  assists: number;
}

// Define your pack
const pack: GamePack<MyGameMatch> = {
  gameId: 99,
  slug: "my-game",
  MatchCard,
  isMatch: (match): match is MyGameMatch => match.gameId === 99,
};

export default pack;
```

### Using the Cache API

```typescript
import { usePackCache } from "@companion/pack-protocol";

function MyComponent() {
  const cache = usePackCache();

  const loadData = async () => {
    // Check cache first
    const cached = await cache.read<MyData>("data.json");
    if (cached) return cached;

    // Fetch and cache
    const data = await fetchFromNetwork();
    await cache.write("data.json", data);
    return data;
  };
}
```

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { companionPack } from "@companion/pack-protocol/vite";

export default defineConfig({
  plugins: [
    react(),
    companionPack({
      packId: "my-game",
      packName: "MyGamePack",
    }),
  ],
});
```

## API Reference

### Types

- `BaseMatch` - Base match type all packs extend
- `MatchCardProps<T>` - Props for match card components
- `LiveMatchCardProps<T>` - Props for live match components
- `GamePack<T>` - Interface packs must implement
- `PackCacheAPI` - Sandboxed cache interface
- `PackContext` - Context provided to packs
- `GameEvent` - Game event for clip triggers
- `GameStatus` - Game connection status
- `MatchData` - End-of-match data

### Hooks

- `usePackContext()` - Access full pack context
- `usePackCache()` - Access cache API

### Sandbox Runtime

For packs running in sandboxed iframes:

- `initSandboxRuntime()` - Initialize the sandbox bridge
- `getSandboxedCacheAPI()` - Get cache API via postMessage
- `useSandboxedCache()` - Hook-like cache access

### Vite Plugin

- `companionPack(options)` - Configure Vite for pack builds

## Security

Game packs run in sandboxed iframes with limited capabilities:

- ✅ Can cache data (namespaced by game ID)
- ✅ Can make fetch requests
- ✅ Can render React components
- ❌ Cannot access host window
- ❌ Cannot access localStorage
- ❌ Cannot access Electron APIs

## License

MIT
