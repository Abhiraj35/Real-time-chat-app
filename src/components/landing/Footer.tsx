import Link from "next/link";

const FOOTER_LINK_GROUPS = [
  {
    title: "Product",
    links: [
      { href: "/lobby", label: "Create Room" },
      { href: "/docs", label: "Documentation" },
      { href: "#features", label: "Features" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#about", label: "About Flux" },
      { href: "#contact", label: "Contact" },
    ],
  }
] as const;

const Footer = () => (
  <footer className="flex flex-col gap-6 px-4 pt-12 pb-3 md:px-8 md:pt-16 md:pb-5 border-b border-(--border)">
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] md:items-start">
      <div className="flex flex-col gap-3">
        <Link href="/" className="text-2xl font-bold tracking-[-0.03em] text-foreground">
          Flux
        </Link>
        <p className="max-w-lg leading-[1.65] text-muted-foreground">
          Flux is a private real-time messaging layer designed for teams that want fast setup,
          secure conversations, and zero operational clutter.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {FOOTER_LINK_GROUPS.map((group) => (
          <div key={group.title} className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold tracking-[0.08em] text-foreground uppercase">
              {group.title}
            </h3>
            <ul className="flex flex-col gap-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.95rem] text-muted-foreground transition-colors duration-150 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
