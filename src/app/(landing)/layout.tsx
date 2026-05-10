import Navbar from "@/components/landing/Navbar";
import Crosshair from "@/components/Crosshair";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage:
          "repeating-linear-gradient(-45deg, var(--secondary) 0, var(--secondary) 1px, transparent 1px, transparent 12px)",
      }}
    >
      <header className="flex w-full justify-center border-b border-(--border) bg-[color-mix(in_srgb,var(--background)_90%,transparent)] backdrop-blur-md">
        <div className="relative w-full max-w-6xl border-x border-(--border) bg-[color-mix(in_srgb,var(--background)_50%,transparent)]">
          <Navbar />
          <Crosshair className="-bottom-1.5 absolute -left-1.5" />
          <Crosshair className="-bottom-1.5 -right-1.5" />
        </div>
      </header>

      <main className="flex w-full flex-col items-center">
        <div className="relative w-full max-w-6xl overflow-hidden border-x border-(--border) bg-background">
          {children}
        </div>
      </main>
    </div>
  );
}
