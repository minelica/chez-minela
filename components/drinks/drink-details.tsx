import type { ReactNode } from "react"
import Image from "next/image"
import {
  CircleAlert,
  Droplets,
  Sparkles,
  Star,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { StrengthIndicator } from "@/components/drinks/strength-indicator"
import { IngredientList } from "@/components/drinks/ingredient-list"

import type { Drink } from "@/src/types/drink"

type DrinkDetailsProps = {
  drink: Drink
}

export function DrinkDetails({
  drink,
}: DrinkDetailsProps) {
  const facts = drink.facts ?? []

  return (
    <article className="bg-background text-foreground">
      <div className="mx-auto w-full max-w-md">
        <div className="relative aspect-[5/4] w-full overflow-hidden rounded-b-[2rem] border-b border-border/70">
          {drink.image && (
            <Image
              src={drink.image}
              alt={drink.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 28rem"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>

        <div className="relative z-10 -mt-10 space-y-8 px-5 pb-9 sm:px-6">
          <section className="space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-primary/90">
              {drink.category.toUpperCase()}
            </p>

            <h1 className="font-heading text-[2.6rem] leading-[0.9] tracking-tight sm:text-5xl">
              {drink.name}
            </h1>

            <div className="flex flex-wrap gap-2">
              {drink.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="rounded-full border-border/90 bg-card/45 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.11em] text-muted-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <p className="font-heading text-[1.35rem] leading-tight italic text-foreground/90">
              “{drink.description}”
            </p>
          </section>

          <section>
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Strength
            </p>

            <StrengthIndicator value={drink.strength} />
          </section>

          {drink.ingredients && drink.ingredients.length > 0 && (
            <>
              <Separator className="bg-border/70" />

              <section>
                <h2 className="mb-4 font-heading text-[1.7rem] tracking-tight">
                  Ingredients
                </h2>

                <IngredientList ingredients={drink.ingredients} />
              </section>
            </>
          )}

          {facts.length > 0 && (
            <>
              <Separator className="bg-border/70" />

              <section>
                <h2 className="mb-4 font-heading text-[1.7rem] tracking-tight">
                  Good to know
                </h2>

                <ul className="space-y-2.5">
                  {facts.map((fact, index) => (
                    <GoodToKnowItem
                      key={`${drink.name}-fact-${index}`}
                      icon={getFactIcon(index)}
                      text={fact}
                    />
                  ))}
                </ul>
              </section>
            </>
          )}

          <Button
            size="lg"
            className="h-12 w-full rounded-full font-medium tracking-[0.01em]"
          >
            I&apos;ll have this one
          </Button>
        </div>
      </div>
    </article>
  )
}

function GoodToKnowItem({
  icon,
  text,
}: {
  icon: ReactNode
  text: string
}) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-border/75 bg-card/30 px-3.5 py-3">
      <span className="mt-0.5 text-primary/90">{icon}</span>
      <span className="text-sm leading-relaxed text-muted-foreground">{text}</span>
    </li>
  )
}

function getFactIcon(index: number) {
  const icons = [Sparkles, Droplets, Star, CircleAlert]
  const Icon = icons[index % icons.length]

  return <Icon className="size-4" aria-hidden="true" />
}
