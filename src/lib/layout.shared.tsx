import { ChevronLeft, MessageSquareLock, ExternalLink } from 'lucide-react';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <MessageSquareLock className="size-5 text-fd-primary" />
          <span className="font-semibold">Flux Docs</span>
        </>
      ),
      url: '/docs',
      transparentMode: 'top',
    },
    links: [
      {
        text: 'Chat App',
        url: '/',
        icon: <ExternalLink />,
      },
    ],
    githubUrl: 'https://github.com/Abhiraj35/Real-time-chat-app',
  };
}

export function docsOptions() {
  return {
    ...baseOptions(),
    themeSwitch: {
      enabled: false,
    },
    sidebar: {
      defaultOpenLevel: 1,
      banner: (
        <a
          href="/"
          className="flex flex-row items-center gap-2 rounded-md px-2 py-1.5 text-sm text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors"
        >
          <ChevronLeft className="size-4" />
          Back to App
        </a>
      ),
      footer: (
        <div className="flex flex-col gap-1 border-t border-fd-border pt-3 mt-2">
          <p className="text-xs text-fd-muted-foreground px-2">
            Built with{' '}
            <a
              href="https://fumadocs.vercel.app"
              className="font-medium text-fd-foreground hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Fumadocs
            </a>
          </p>
        </div>
      ),
    },
  };
}
