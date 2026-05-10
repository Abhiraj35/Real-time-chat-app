import Link from "next/link";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/docs", label: "Docs" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#features", label: "Features" },
] as const;

const navLinkClassName =
  "group relative text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground";

const navLinkUnderlineClassName =
  "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform group-hover:scale-x-100";

const Navbar = () => (
  <nav className="relative z-50 flex h-16 items-center justify-between border-b border-(--border) bg-[color-mix(in_srgb,var(--background)_80%,transparent)] px-4 backdrop-blur-xs sm:px-8">
    <div className="flex cursor-pointer items-center gap-2 md:gap-3">
      <div className="flex h-7 w-7 items-center justify-center rounded bg-linear-to-br from-primary to-accent-secondary md:h-8 md:w-8">
        <div className="h-3 w-3 rotate-45 rounded-sm bg-foreground md:h-4 md:w-4" />
      </div>
      <Link href="/" className="text-lg font-bold tracking-tight text-foreground md:text-xl">
        Flux
      </Link>
    </div>
    <div className="flex items-center justify-center gap-4">
      {NAV_LINKS.map((link) => (
        <a key={link.href} href={link.href} className={navLinkClassName}>
          {link.label}
          <span className={navLinkUnderlineClassName} />
        </a>
      ))}
    </div>

    <div className="flex items-center">
      <Button href="/lobby" className="hidden sm:inline-flex">
        Lobby
      </Button>
    </div>
  </nav>
);

export default Navbar;
