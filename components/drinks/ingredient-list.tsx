import { Citrus } from "lucide-react"

type IngredientListProps = {
	ingredients: string[]
}

export function IngredientList({ ingredients }: IngredientListProps) {
	if (ingredients.length === 0) {
		return null
	}

	return (
		<div className="grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
			{ingredients.map((ingredient) => (
				<article
					key={ingredient}
					className="flex flex-col items-center gap-2 text-center"
				>
					<div className="relative flex size-11 items-center justify-center rounded-full border border-border/80 bg-card/65">
						<Citrus className="size-5 text-muted-foreground" />
						<span
							className="absolute -bottom-0.5 right-0.5 size-1.5 rounded-full bg-primary"
							aria-hidden="true"
						/>
					</div>

					<p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">
						{ingredient}
					</p>
				</article>
			))}
		</div>
	)
}
