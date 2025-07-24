import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Modern Data Table',
  description: 'Professional data table with spreadsheet-like functionality, keyboard navigation, and advanced features for power users',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
