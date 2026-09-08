import Link from "next/link"
import Image from "next/image"

export default function FirstImpressionPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Image
        src="/first-impression.png"
        alt="First impression background"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-5">
        <Link
          href="/menu"
          className="inline-flex h-12 w-full -translate-y-12 items-center justify-center rounded-full border border-primary/55 bg-primary text-base font-medium text-primary-foreground shadow-[0_10px_34px_rgba(232,184,117,0.25)]"
        >
          Explore the menu &rarr;
        </Link>
      </div>
    </main>
  )
}
