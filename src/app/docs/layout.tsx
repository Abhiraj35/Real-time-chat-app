import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { docsOptions } from '@/lib/layout.shared';
import { Inter } from "next/font/google";

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <div className={`${inter.variable} docs`}>
      <DocsLayout tree={source.getPageTree()} {...docsOptions()}>
        {children}
      </DocsLayout>
    </div>
  );
}