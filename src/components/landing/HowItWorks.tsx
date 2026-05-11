import { pixelTriangleTheme } from "@/lib/fonts";

const STEPS = [
  {
    number: "01",
    title: "Create a room",
    description: "One click. No account, no email, no password.",
  },
  {
    number: "02",
    title: "Share the ID",
    description: "Send the room ID to whoever needs to be there. Anyone with it can join.",
  },
  {
    number: "03",
    title: "It's gone in 10",
    description: "After 10 minutes, the room, the messages, and the history are permanently deleted.",
  },
] as const;

const HowItWorks = () => (
  <section id="how-it-works" className="border-b border-(--border) px-4 py-18 md:px-8 md:py-24">
    <div className="mx-auto grid w-full max-w-5xl gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] ">
      <div className={`${pixelTriangleTheme.className} flex flex-col gap-4 `}>
        <p className="text-[0.75rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
          How it works
        </p>
        <h2 className="text-3xl leading-[1.1] font-bold tracking-[-0.03em] text-foreground md:text-4xl">
          Three steps to{" "}
          <span className="bg-linear-to-b from-primary to-accent-secondary bg-clip-text text-transparent">
            gone
          </span>
          .
        </h2>
        <p className="max-w-sm leading-[1.65] text-muted-foreground">
          Private conversations stay simple: create, share, and let the room erase itself.
        </p>
      </div>

      <ol className="divide-y divide-(--border) border-y border-(--border)">
        {STEPS.map((step) => (
          <li key={step.number} className={`${pixelTriangleTheme.className} grid gap-3 py-6 sm:grid-cols-[auto_1fr] sm:gap-6 `}>
            <span className="text-2xl font-semibold tracking-[-0.02em] text-primary md:text-3xl">
              {step.number}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold text-foreground">{step.title}.</h3>
              <p className="max-w-xl leading-[1.65] text-muted-foreground">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorks;
