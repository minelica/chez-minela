import Link from "next/link"
import { ChevronLeft, Martini } from "lucide-react"

import { DrinkCard } from "@/components/drinks/drink-card"
import { drinks } from "@/src/data/drinks"
import type { DrinkCategory } from "@/src/types/drink"

const categoryLabel: Record<DrinkCategory, string> = {
  cocktail: "Cocktails",
  beer: "Beer",
  wine: "Wine",
  spirit: "Spirits",
  soft: "Soft Drinks",
}

const categoryOrder: DrinkCategory[] = ["soft", "beer"]

type MenuPageProps = {
  searchParams: Promise<{
    category?: string
  }>
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const params = await searchParams
  const availableDrinks = drinks.filter((drink) => drink.available)
  const availableCategories = categoryOrder.filter((category) =>
    availableDrinks.some((drink) => drink.category === category)
  )
  const selectedCategory = availableCategories.includes(params.category as DrinkCategory)
    ? (params.category as DrinkCategory)
    : "all"
  const sectionCategories = selectedCategory === "all" ? availableCategories : [selectedCategory]

  const buildFilterHref = (category?: DrinkCategory) => {
    const queryString = new URLSearchParams()

    if (category) {
      queryString.set("category", category)
    }

    const serialized = queryString.toString()
    return serialized ? `/menu?${serialized}` : "/menu"
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 pb-8 pt-5 sm:px-5">
        <header className="space-y-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              aria-label="Back to first impression"
              className="inline-flex size-9 items-center justify-center rounded-full border border-border/80 bg-card/60 text-muted-foreground"
            >
              <ChevronLeft className="size-4" />
            </Link>

            <p className="font-heading text-3xl leading-none tracking-tight">Chez Minela</p>

            <span
              aria-hidden="true"
              className="inline-flex size-9 rounded-full border border-transparent"
            />
          </div>

          <nav className="scrollbar-none flex items-center gap-2 overflow-x-auto pb-1">
            <Link
              href={buildFilterHref()}
              className={[
                "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-[0.08em]",
                selectedCategory === "all"
                  ? "border-primary/80 bg-primary text-primary-foreground"
                  : "border-border bg-card/50 text-muted-foreground",
              ].join(" ")}
            >
              <Martini className="size-3" />
              All
            </Link>

            {availableCategories.map((category) => (
              <Link
                key={category}
                href={buildFilterHref(category)}
                className={[
                  "inline-flex shrink-0 items-center rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-[0.08em]",
                  selectedCategory === category
                    ? "border-primary/80 bg-primary text-primary-foreground"
                    : "border-border bg-card/50 text-muted-foreground",
                ].join(" ")}
              >
                {categoryLabel[category]}
              </Link>
            ))}
          </nav>
        </header>

        {sectionCategories.map((category, index) => {
          const sectionDrinks = availableDrinks.filter((drink) => drink.category === category)

          if (sectionDrinks.length === 0) {
            return null
          }

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

                {selectedCategory === "all" && (
                  <Link
                    href={buildFilterHref(category)}
                    className="text-xs uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    See all
                  </Link>
                )}
              </div>

              <div className="space-y-3">
                {sectionDrinks.map((drink) => (
                  <DrinkCard
                    key={`${drink.name}-${drink.image}`}
                    drink={drink}
                    href={`/drinks/${encodeURIComponent(drink.name)}`}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </main>
    </div>
  )
}
