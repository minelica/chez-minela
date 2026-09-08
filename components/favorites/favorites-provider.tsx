"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

type FavoritesContextValue = {
  favoriteNames: string[]
  isFavorite: (drinkName: string) => boolean
  toggleFavorite: (drinkName: string) => void
  ready: boolean
}

const STORAGE_KEY = "chez-minela-favorites"

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [favoriteNames, setFavoriteNames] = useState<string[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY)

        if (!raw) {
          setReady(true)
          return
        }

        const parsed = JSON.parse(raw)

        if (!Array.isArray(parsed)) {
          setReady(true)
          return
        }

        const names = parsed
          .filter((item): item is string => typeof item === "string")
          .filter((item, index, all) => all.indexOf(item) === index)

        setFavoriteNames(names)
      } catch {
        setFavoriteNames([])
      } finally {
        setReady(true)
      }
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  useEffect(() => {
    if (!ready) {
      return
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteNames))
  }, [favoriteNames, ready])

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteNames,
      ready,
      isFavorite: (drinkName) => favoriteNames.includes(drinkName),
      toggleFavorite: (drinkName) => {
        setFavoriteNames((prev) => {
          if (prev.includes(drinkName)) {
            return prev.filter((name) => name !== drinkName)
          }

          return [...prev, drinkName]
        })
      },
    }),
    [favoriteNames, ready]
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider")
  }

  return context
}
