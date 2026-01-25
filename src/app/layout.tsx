import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/providers";
import { RootProvider } from 'fumadocs-ui/provider/next';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin']
})
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
      <body
        className={`${jetbrainsMono.variable} antialiased`}
      >
        <RootProvider theme={{ attribute: 'class' }}>
          <Provider>
            {children}
          </Provider>
        </RootProvider>

      </body>
    </html>
  );
}
