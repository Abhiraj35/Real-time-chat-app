import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/components/providers";

export const metadata: Metadata = {
  title: "Flux",
  description: "A Private Chat Application where you can chat with your friends securely and privately with auto destruction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground selection:bg-primary/30 selection:text-primary">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
