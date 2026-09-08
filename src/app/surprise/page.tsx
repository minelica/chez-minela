"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Martini,
  Sparkles,
  Dices,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { StrengthIndicator } from "@/components/drinks/strength-indicator"
import { drinks } from "@/src/data/drinks"
import type { Drink } from "@/src/types/drink"

import { AnimatePresence, motion } from "motion/react"
import { useMemo, useState } from "react"

type SurpriseStage = "idle" | "rolling" | "revealed"

const statusLines = [
  "Calculating...",
  "Checking the fridge...",
  "Questioning your decisions...",
  "Consulting the bartender...",
]

const revealComments = [
  "Still not happy?",
  "Getting picky, aren't we?",
  "This is becoming less of a surprise.",
  "Just choose a drink, honestly.",
]

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function getRandomDrink(excludedNames: string[]) {
  const eligibleDrinks = drinks.filter(
    (drink) => drink.available && drink.surpriseEligible
  )

  const freshCandidates = eligibleDrinks.filter(
    (drink) => !excludedNames.includes(drink.name)
  )
  const candidates = freshCandidates.length > 0 ? freshCandidates : eligibleDrinks

  if (candidates.length === 0) {
    return null
  }

  const index = Math.floor(Math.random() * candidates.length)

  return candidates[index]
}

export default function SurprisePage() {
  const [stage, setStage] = useState<SurpriseStage>("idle")
  const [statusIndex, setStatusIndex] = useState(0)
  const [result, setResult] = useState<Drink | null>(null)
  const [seenNames, setSeenNames] = useState<string[]>([])
  const [rerolls, setRerolls] = useState(0)

  const revealComment = useMemo(() => {
    if (rerolls === 0) {
      return "Good decisions are overrated."
    }

    const commentIndex = Math.min(rerolls - 1, revealComments.length - 1)
    return revealComments[commentIndex]
  }, [rerolls])

  const rollDrink = async () => {
    if (stage === "rolling") {
      return
    }

    setStage("rolling")

    for (let index = 0; index < statusLines.length; index += 1) {
      setStatusIndex(index)
      await wait(index === statusLines.length - 1 ? 280 : 300)
    }

    const selected = getRandomDrink(seenNames)

    if (!selected) {
      setStage("idle")
      return
    }

    setResult(selected)
    setSeenNames((prev) =>
      prev.includes(selected.name) ? prev : [...prev, selected.name]
    )
    setRerolls((prev) => prev + 1)
    setStage("revealed")
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-md flex-col px-4 pb-8 pt-8 sm:px-5">
        <AnimatePresence mode="wait">
          {stage !== "revealed" && (
            <motion.section
              key="surprise-start"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="rounded-3xl border border-border/80 bg-card/45 px-5 py-10 text-center"
            >
              <p className="text-primary/90">
                <Sparkles className="mx-auto size-4" />
              </p>

              <h1 className="mt-5 font-heading text-[2.75rem] leading-[0.88] tracking-tight">
                I DON&apos;T CARE,
                <br />
                SURPRISE ME!
              </h1>

              <p className="mx-auto mt-4 max-w-[22rem] text-sm leading-relaxed text-muted-foreground">
                Our highly scientific algorithm will make this decision for you.
              </p>

              <motion.div
                animate={stage === "rolling" ? { rotate: [0, -8, 8, -8, 8, 0] } : { rotate: 0 }}
                transition={{ duration: 0.9, repeat: stage === "rolling" ? Infinity : 0 }}
                className="mx-auto mt-8 flex size-24 items-center justify-center rounded-2xl border border-border/80 bg-background/70 shadow-[0_14px_36px_rgba(0,0,0,0.45)]"
              >
                <div className="text-center">
                  {stage === "rolling" ? (
                    <Dices className="mx-auto size-9 text-primary" />
                  ) : (
                    <>
                      <span className="block text-lg text-primary">?</span>
                      <Martini className="mx-auto size-6 text-primary/90" />
                    </>
                  )}
                </div>
              </motion.div>

              <div className="mt-7 min-h-6 text-sm text-muted-foreground">
                {stage === "rolling" ? statusLines[statusIndex] : null}
              </div>

              <Button
                size="lg"
                className="mt-3 h-12 w-full rounded-full"
                onClick={rollDrink}
                disabled={stage === "rolling"}
              >
                <Dices className="size-4" />
                Surprise me
              </Button>

              <p className="mt-5 text-sm italic text-muted-foreground">
                {revealComment}
              </p>
            </motion.section>
          )}

          {stage === "revealed" && result && (
            <motion.section
              key={result.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24 }}
              className="space-y-6"
            >
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.22em] text-primary/90">
                  The Algorithm
                </p>
                <h2 className="mt-1 font-heading text-4xl leading-none tracking-tight">
                  Has Spoken.
                </h2>
              </div>

              <article className="overflow-hidden rounded-3xl border border-border/80 bg-card/50">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={result.image}
                    alt={result.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 28rem"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
                </div>

                <div className="space-y-4 px-4 pb-5 pt-4">
                  <h3 className="font-heading text-[1.95rem] leading-[0.95] tracking-tight">
                    {result.name}
                  </h3>

                  <p className="text-xs uppercase tracking-[0.11em] text-muted-foreground">
                    {result.tags.join(" · ")}
                  </p>

                  <p className="font-heading text-xl italic text-foreground/90">
                    “{result.description}”
                  </p>

                  <StrengthIndicator value={result.strength} />

                  <div className="space-y-3 pt-1">
                    <Link
                      href={`/drinks/${encodeURIComponent(result.name)}`}
                      className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
                    >
                      I&apos;ll take it
                    </Link>

                    <Button
                      size="lg"
                      variant="outline"
                      className="h-11 w-full rounded-full border-border bg-card/30"
                      onClick={rollDrink}
                      disabled={stage === "rolling"}
                    >
                      <Dices className="size-4" />
                      Try again
                    </Button>
                  </div>
                </div>
              </article>

              <p className="text-center text-sm italic text-muted-foreground">
                {revealComment}
              </p>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
