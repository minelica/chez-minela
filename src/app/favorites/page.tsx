"use client"

import { Heart } from "lucide-react"

import { DrinkCard } from "@/components/drinks/drink-card"
import { useFavorites } from "@/components/favorites/favorites-provider"
import { drinks } from "@/src/data/drinks"
import type { Drink } from "@/src/types/drink"

export default function FavoritesPage() {
  const {
    favoriteNames,
    ready,
  } = useFavorites()

  const favoriteDrinks: Drink[] = favoriteNames
    .map((favoriteName) => drinks.find((drink) => drink.name === favoriteName))
    .filter((drink): drink is Drink => Boolean(drink && drink.available))

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-md flex-col px-4 pb-8 pt-8 sm:px-5">
        <h1 className="font-heading text-4xl leading-none tracking-tight">Favorites</h1>

        {ready && favoriteDrinks.length > 0 && (
          <p className="mt-2 text-sm text-muted-foreground">
            {favoriteDrinks.length} saved drink{favoriteDrinks.length === 1 ? "" : "s"}
          </p>
        )}

        {!ready && (
          <div className="mt-6 flex min-h-56 flex-col items-center justify-center rounded-3xl border border-border/80 bg-card/45 px-5 text-center">
            <p className="text-sm text-muted-foreground">Loading favorites...</p>
          </div>
        )}

        {ready && favoriteDrinks.length === 0 && (
          <div className="mt-6 flex min-h-56 flex-col items-center justify-center rounded-3xl border border-border/80 bg-card/45 px-5 text-center">
            <Heart className="size-6 text-primary/90" />
            <p className="mt-3 font-heading text-2xl">No favorites yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Tap the heart on a drink card to build your personal shortlist.
            </p>
          </div>
        )}

        {ready && favoriteDrinks.length > 0 && (
          <div className="mt-6 space-y-3">
            {favoriteDrinks.map((drink) => (
              <DrinkCard
                key={`${drink.name}-${drink.image}`}
                drink={drink}
                href={`/drinks/${encodeURIComponent(drink.name)}`}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
