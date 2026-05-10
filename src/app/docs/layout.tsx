import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { docsOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <RootProvider theme={{ attribute: 'class' }}>
      <DocsLayout tree={source.getPageTree()} {...docsOptions()}>
        {children}
      </DocsLayout>
    </RootProvider>
  );
}
