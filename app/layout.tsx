import './globals.css'
import type { Metadata } from 'next'
import theme from "./_utils/themes";

export const metadata: Metadata = {
  title: 'Pokémon Tools',
  description: 'Useful tools to get info about Pokémon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={theme.body}>{children}</body>
    </html>
  )
}
