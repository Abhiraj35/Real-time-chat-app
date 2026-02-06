
import { ChevronLeft } from 'lucide-react';

export function baseOptions() {
  return {
    nav: {
      title: 'Private Chat App',
      url: '/',
    },
    sidebar: {
      defaultOpenLevel: 0,
      banner: (
        <a
          href="/"
          className="flex flex-row items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors"
        >
          <ChevronLeft className="size-4" />
          Back
        </a>
      ),
    },
    githubUrl: 'https://github.com/Abhiraj35/Real-time-chat-app',
  };
}