"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import Button from "@/components/ui/Button";
import { pixelTriangleTheme } from "@/lib/fonts";

const NAV_LINKS = [
  { href: "/docs", label: "Docs" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#features", label: "Features" },
] as const;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-linear-to-br from-primary to-accent-secondary md:h-8 md:w-8">
              <div className="h-3 w-3 rotate-45 rounded-sm bg-foreground md:h-4 md:w-4" />
            </div>
            <p className="text-lg font-bold tracking-tight text-foreground md:text-xl">Flux</p>
          </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${pixelTriangleTheme.className} group relative text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground`}
            >
              {link.label}

              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className={`${pixelTriangleTheme.className} hidden md:flex`}>
          <Button href="/lobby">Lobby</Button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label="Toggle Menu"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition hover:bg-accent hover:text-foreground md:hidden"
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col space-y-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`${pixelTriangleTheme.className} rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground`}
              >
                {link.label}
              </Link>
            ))}

            <div className={`${pixelTriangleTheme.className} pt-2`}>
              <Button href="/lobby" className="w-full">
                Lobby
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;