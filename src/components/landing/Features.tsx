const FEATURES = [
  {
    title: "10-minute rooms",
    description:
      "Hard limit. No extensions. The countdown starts the moment the room is created.",
  },
  {
    title: "No accounts",
    description: "Nothing to sign up for. Nothing to log out of. You were never here.",
  },
  {
    title: "Zero logs",
    description:
      "Messages aren't stored in a database waiting to be leaked. They exist in memory, then they don't.",
  },
  {
    title: "Real-time",
    description: "WebSocket-powered. Messages arrive instantly. No polling, no delay.",
  },
] as const;

const Features = () => (
  <section id="features" className="border-b border-(--border) px-4 py-18 md:px-8 md:py-24">
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
      <div className="flex flex-col gap-4 md:max-w-2xl">
        <p className="text-[0.75rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
          What you get
        </p>
        <h2 className="text-3xl leading-[1.1] font-bold tracking-[-0.03em] text-foreground md:text-4xl">
          Built to{" "}
          <span className="bg-linear-to-b from-primary to-accent-secondary bg-clip-text text-transparent">
            disappear
          </span>
          .
        </h2>
      </div>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {FEATURES.map((feature, index) => (
          <li key={feature.title} className="border-t border-(--border) pt-5">
            <p className="mb-2 text-xs font-semibold tracking-[0.12em] text-primary uppercase">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground">
              {feature.title}
            </h3>
            <p className="mt-2 leading-[1.65] text-muted-foreground">{feature.description}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Features;
