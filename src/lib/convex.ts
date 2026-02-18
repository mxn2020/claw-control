import { ConvexReactClient } from 'convex/react'

export const CONVEX_URL =
  (import.meta.env.VITE_CONVEX_URL as string | undefined) ??
  'https://placeholder.convex.cloud'

export const convexClient = new ConvexReactClient(CONVEX_URL)
