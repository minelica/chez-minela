import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { notFound } from "next/navigation"

import { DrinkDetails } from "@/components/drinks/drink-details"
import { drinks } from "@/src/data/drinks"

type DrinkDetailsPageProps = {
  params: Promise<{
    name: string
  }>
}

export default async function DrinkDetailsPage({
  params,
}: DrinkDetailsPageProps) {
  const { name } = await params
  const drinkName = decodeURIComponent(name)

  const drink = drinks.find((entry) => entry.name === drinkName && entry.available)

  if (!drink) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-md px-4 pb-6 pt-4 sm:px-5">
        <Link
          href="/menu"
          className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs uppercase tracking-[0.08em] text-muted-foreground"
        >
          <ChevronLeft className="size-3.5" />
          Back
        </Link>
      </div>

      <DrinkDetails drink={drink} />
    </main>
  )
}
