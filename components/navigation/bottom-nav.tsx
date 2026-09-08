"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
	Heart,
	House,
	Dice5,
} from "lucide-react"

type TabItem = {
	href: string
	label: string
	icon: React.ComponentType<{ className?: string }>
}

const tabs: TabItem[] = [
	{
		href: "/menu",
		label: "Home",
		icon: House,
	},
	{
		href: "/surprise",
		label: "Surprise",
		icon: Dice5,
	},
	{
		href: "/favorites",
		label: "Favorites",
		icon: Heart,
	},
]

export function BottomNav() {
	const pathname = usePathname()
	const hiddenOnDetails = pathname.startsWith("/drinks/") || pathname === "/"

	if (hiddenOnDetails) {
		return null
	}

	return (
		<>
			<div className="h-22" aria-hidden="true" />

			<nav
				aria-label="Bottom navigation"
				className="fixed inset-x-0 bottom-0 z-40"
			>
				<div className="mx-auto w-full max-w-md px-4 pb-4 sm:px-5">
					<div className="rounded-2xl border border-border/80 bg-card/85 px-3 py-2 shadow-[0_-12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
						<ul className="grid grid-cols-3 gap-1">
							{tabs.map((tab) => {
								const isActive =
									tab.href === "/menu"
										? pathname === "/menu"
										: pathname.startsWith(tab.href)
								const Icon = tab.icon

								return (
									<li key={tab.href}>
										<Link
											href={tab.href}
											className={[
												"flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[0.62rem] uppercase tracking-[0.08em] transition-colors",
												isActive
													? "text-primary"
													: "text-muted-foreground hover:text-foreground",
											].join(" ")}
											aria-current={isActive ? "page" : undefined}
										>
											<Icon className="size-4" />
											<span>{tab.label}</span>
										</Link>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			</nav>
		</>
	)
}
