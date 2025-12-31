/**
 * PostMessage bridge protocol for sandboxed gamepack communication.
 *
 * This defines the message types sent between the host application
 * and sandboxed gamepack iframes.
 */

// ============================================
// Messages from Pack → Host
// ============================================

export interface PackReadyMessage {
  type: "pack:ready";
}

export interface PackCacheReadMessage {
  type: "pack:cache:read";
  id: string;
  key: string;
}

export interface PackCacheWriteMessage {
  type: "pack:cache:write";
  id: string;
  key: string;
  data: unknown;
}

export interface PackCacheExistsMessage {
  type: "pack:cache:exists";
  id: string;
  key: string;
}

export interface PackCacheGetSizeMessage {
  type: "pack:cache:getSize";
  id: string;
}

export interface PackCacheClearMessage {
  type: "pack:cache:clear";
  id: string;
}

export type PackToHostMessage =
  | PackReadyMessage
  | PackCacheReadMessage
  | PackCacheWriteMessage
  | PackCacheExistsMessage
  | PackCacheGetSizeMessage
  | PackCacheClearMessage;

// ============================================
// Messages from Host → Pack
// ============================================

export interface HostInitMessage {
  type: "host:init";
  gameId: number;
  config?: Record<string, unknown>;
}

export interface HostResponseMessage {
  type: "host:response";
  id: string;
  success: boolean;
  data?: unknown;
  error?: string;
}

export interface HostRenderMessage {
  type: "host:render";
  componentType: string;
  props: unknown;
}

export type HostToPackMessage =
  | HostInitMessage
  | HostResponseMessage
  | HostRenderMessage;

// ============================================
// Utility Types
// ============================================

/**
 * Pending request tracker for async bridge calls.
 */
export interface PendingRequest {
  resolve: (data: unknown) => void;
  reject: (error: string) => void;
}

/**
 * Bridge state maintained inside the sandboxed iframe.
 */
export interface BridgeState {
  messageId: number;
  pending: Map<string, PendingRequest>;
  initialized: boolean;
  gameId: number;
}
