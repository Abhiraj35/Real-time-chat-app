import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { docsOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <RootProvider theme={{ attribute: 'class', forcedTheme: 'light', defaultTheme: 'light', enableSystem: false }}>
      <DocsLayout tree={source.getPageTree()} containerProps={{
        style: {
          gridTemplate:
            '"sidebar sidebar header toc toc"\n"sidebar sidebar toc-popover toc toc"\n"sidebar sidebar main toc toc" 1fr / 0px var(--fd-sidebar-col) minmax(0, calc(var(--fd-layout-width,97rem) - var(--fd-sidebar-width) - var(--fd-toc-width))) var(--fd-toc-width) minmax(min-content, 1fr)',
        },
      }}{...docsOptions()}>
        {children}
      </DocsLayout>
    </RootProvider>
  );
}
