import { Geist, Cormorant_Garamond } from "next/font/google"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { FavoritesProvider } from "@/components/favorites/favorites-provider"

import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${cormorant.variable}`}
      >
        <FavoritesProvider>
          {children}
          <BottomNav />
        </FavoritesProvider>
      </body>
    </html>
  )
}