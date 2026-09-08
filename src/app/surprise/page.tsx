import { Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function SurprisePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 pb-8 pt-8 text-center sm:px-5">
        <div className="w-full rounded-3xl border border-border/80 bg-card/50 px-5 py-10">
          <p className="text-xs uppercase tracking-[0.22em] text-primary/90">Tonight</p>
          <h1 className="mt-4 font-heading text-5xl leading-[0.9] tracking-tight">Surprise Me</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Let the universe choose your next drink.
          </p>

          <Button size="lg" className="mt-7 h-12 w-full rounded-full">
            <Sparkles className="size-4" />
            Surprise me
          </Button>
        </div>
      </div>
    </main>
  )
}
