import Button from "@/components/ui/Button";
import { pixelTriangleTheme } from "@/lib/fonts";

const CtaSection = () => (
  <section className="flex justify-center border-b border-(--border) px-4 py-18 md:px-8 md:py-24">
    <div className="flex w-full max-w-4xl flex-col items-center gap-4 text-center">
      <p className={`${pixelTriangleTheme.className} text-[0.75rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase`}>
        Ready to start in seconds?
      </p>
      <h2 className={`${pixelTriangleTheme.className} text-4xl leading-[1.1] font-bold tracking-[-0.03em] text-foreground md:text-5xl`}>
        Build private, real-time chat rooms with{" "}
        <span className="bg-linear-to-b from-primary to-accent-secondary bg-clip-text text-transparent">
          Flux
        </span>
      </h2>
      <p className={`${pixelTriangleTheme.className} max-w-2xl leading-[1.65] text-muted-foreground`}>
        Create a room, invite your team, and keep conversations lightweight with auto-expiring
        history and clean zero-setup collaboration.
      </p>

      <div className={`${pixelTriangleTheme.className} mt-3 flex w-full flex-col gap-3 sm:w-auto sm:flex-row`}>
        <Button href="/lobby" variant="primary">
          Start a Room
        </Button>
      </div>
    </div>
  </section>
);

export default CtaSection;
