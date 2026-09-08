type StrengthIndicatorProps = {
	value: number
	max?: number
}

export function StrengthIndicator({
	value,
	max = 5,
}: StrengthIndicatorProps) {
	const safeValue = Math.max(0, Math.min(value, max))

	return (
		<div
			className="flex items-center gap-2.5"
			aria-label={`Strength ${safeValue} out of ${max}`}
		>
			{Array.from({ length: max }).map((_, index) => {
				const active = index < safeValue

				return (
					<span
						key={index}
						className={[
							"size-2.5 rounded-full border transition-colors",
							active
								? "border-primary bg-primary"
								: "border-border/90 bg-card/40",
						].join(" ")}
						aria-hidden="true"
					/>
				)
			})}
		</div>
	)
}
