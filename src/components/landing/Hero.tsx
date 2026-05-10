import Button from "@/components/ui/Button";

const Hero = () => (
  <section className="flex flex-col items-center gap-8 border-b border-(--border) px-4 py-16 text-center md:gap-10 md:px-8 md:py-24">
    <div className="flex w-full max-w-4xl flex-col gap-5 md:gap-6">
      <h1 className="text-4xl leading-[1.05] font-bold tracking-[-0.04em] text-foreground sm:text-5xl md:text-6xl md:leading-[1.02]">
        The Registry for <br className="hidden sm:block" />
        <span className="bg-linear-to-b from-primary to-accent-secondary bg-clip-text text-transparent">
          Agentic Intelligence
        </span>
      </h1>
      <p className="mx-auto max-w-2xl leading-[1.7] text-muted-foreground md:text-lg">
        Create a private room, share the ID, and start chatting instantly. Everything vanishes in
        10 minutes: messages, history, and traces.
      </p>
    </div>

    <div className="mt-1 flex w-full max-w-md flex-col items-center gap-3 sm:mt-2 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4">
      <Button href="/lobby" variant="primary">
        Create a Room
      </Button>
      <Button href="/docs" variant="secondary">
        Learn more
      </Button>
    </div>
  </section>
);

export default Hero;
