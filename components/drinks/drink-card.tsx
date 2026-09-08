import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { StrengthIndicator } from "@/components/drinks/strength-indicator"

import type { Drink } from "@/src/types/drink"

type DrinkCardProps = {
  drink: Drink
  href: string
}

export function DrinkCard({
  drink,
  href,
}: DrinkCardProps) {
  return (
    <Link href={href} className="block outline-none focus-visible:ring-2 focus-visible:ring-ring/60 rounded-xl">
      <Card className="overflow-hidden border-border/80 bg-card/70 p-0 ring-1 ring-border/70 backdrop-blur-[1px]">
        <div className="relative aspect-[4/3]">
          <Image
            src={drink.image}
            alt={drink.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 28rem"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

          <div
            className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full border border-border/80 bg-background/40 backdrop-blur-sm"
            aria-hidden="true"
          >
            <Heart className="size-4 text-foreground" />
          </div>
        </div>

        <CardContent className="space-y-3.5 p-4">
          <h2 className="font-heading text-[1.7rem] leading-[0.95] tracking-tight">
            {drink.name}
          </h2>

          <div className="flex flex-wrap gap-1.5">
            {drink.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-border/80 bg-card/40 text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <StrengthIndicator value={drink.strength} />

          <p className="font-heading text-lg leading-tight italic text-foreground/85">
            “{drink.description}”
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}