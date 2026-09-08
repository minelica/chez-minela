import { Heart } from "lucide-react"

export default function FavoritesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-md flex-col px-4 pb-8 pt-8 sm:px-5">
        <h1 className="font-heading text-4xl leading-none tracking-tight">Favorites</h1>

        <div className="mt-6 flex min-h-56 flex-col items-center justify-center rounded-3xl border border-border/80 bg-card/45 px-5 text-center">
          <Heart className="size-6 text-primary/90" />
          <p className="mt-3 font-heading text-2xl">No favorites yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Tap the heart on a drink card to build your personal shortlist.
          </p>
        </div>
      </div>
    </main>
  )
}
