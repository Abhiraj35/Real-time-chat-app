import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Private Chat App',
      url: '/',
    },
    githubUrl: 'https://github.com/Abhiraj35/Real-time-chat-app',
    links: [
      {
        text: 'Home',
        url: '/',
        active: 'nested-url',
      },
    ],
  };
}