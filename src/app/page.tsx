import { Martini, Search, SlidersHorizontal } from "lucide-react"

import { DrinkCard } from "@/components/drinks/drink-card"
import { drinks } from "@/src/data/drinks"

const categoryLabel: Record<string, string> = {
  beer: "Beer",
  soft: "Soft Drinks",
}

const categoryOrder = ["soft", "beer"]

export default function Home() {
  const availableDrinks = drinks.filter((drink) => drink.available)
  const availableCategories = categoryOrder.filter((category) =>
    availableDrinks.some((drink) => drink.category === category)
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 pb-8 pt-5 sm:px-5">
        <header className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              aria-label="Filter"
              className="inline-flex size-9 items-center justify-center rounded-full border border-border/80 bg-card/60 text-muted-foreground"
            >
              <SlidersHorizontal className="size-4" />
            </button>

            <p className="font-heading text-3xl leading-none tracking-tight">Chez Minela</p>

            <button
              aria-label="Search"
              className="inline-flex size-9 items-center justify-center rounded-full border border-border/80 bg-card/60 text-muted-foreground"
            >
              <Search className="size-4" />
            </button>
          </div>

          <nav className="scrollbar-none flex items-center gap-2 overflow-x-auto pb-1">
            {["All", ...availableCategories.map((category) => categoryLabel[category])].map((category, index) => (
              <button
                key={category}
                className={[
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-[0.08em]",
                  index === 0
                    ? "border-primary/80 bg-primary text-primary-foreground"
                    : "border-border bg-card/50 text-muted-foreground",
                ].join(" ")}
              >
                {index === 0 && <Martini className="size-3" />}
                {category}
              </button>
            ))}
          </nav>
        </header>

        {availableCategories.map((category, index) => {
          const sectionDrinks = availableDrinks.filter((drink) => drink.category === category)

          return (
            <section className="space-y-3" key={category}>
              <div className="flex items-end justify-between">
                {index === 0 ? (
                  <h1 className="font-heading text-4xl leading-none tracking-tight">
                    {categoryLabel[category]}
                  </h1>
                ) : (
                  <h2 className="font-heading text-3xl leading-none tracking-tight">
                    {categoryLabel[category]}
                  </h2>
                )}

                <button className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  See all
                </button>
              </div>

              <div className="space-y-3">
                {sectionDrinks.map((drink) => (
                  <DrinkCard key={`${drink.name}-${drink.image}`} drink={drink} />
                ))}
              </div>
            </section>
          )
        })}
      </main>
    </div>
  )
}
