import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

import appCss from '../styles.css?url'

const convexUrl = import.meta.env.VITE_CONVEX_URL as string
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'ClawControl — AI Agent Fleet Management',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-slate-900 text-white">
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  if (convex) {
    return (
      <ConvexProvider client={convex}>
        <Outlet />
      </ConvexProvider>
    )
  }
  return <Outlet />
}
