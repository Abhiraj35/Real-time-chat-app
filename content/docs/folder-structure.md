---
title: Folder Structure
description: Guide to the codebase organization
order: 3
---

# Folder Structure

This document provides a guided tour of the codebase to help you find your way around.

import { File, Folder, Files } from 'fumadocs-ui/components/files';

## Top-Level Directories

<Files>
  <Folder name="src" defaultOpen>
    <Folder name="app" defaultOpen>
      <Folder name="api">
        <Folder name="[[...slugs]]">
          <File name="route.ts" />
        </Folder>
      </Folder>
      <Folder name="docs" />
      <Folder name="room" />
      <File name="layout.tsx" />
      <File name="page.tsx" />
      <File name="globals.css" />
    </Folder>
    <Folder name="components">
      <File name="providers.tsx" />
    </Folder>
    <Folder name="lib">
      <File name="redis.ts" />
      <File name="realtime.ts" />
      <File name="client.ts" />
    </Folder>
    <Folder name="hooks" />
  </Folder>
  <Folder name="content/docs" />
  <Folder name="public" />
</Files>

## The `src` Directory


This is where the magic happens. Here's a breakdown of the key folders:

### `src/app`
This folder follows the **Next.js App Router** convention.
*   **`page.tsx`**: The Homepage. Contains the UI for creating or joining a room.
*   **`layout.tsx`**: The main wrapper for the app. It holds the `<body>` tag and global styles.
*   **`globals.css`**: Tailwind CSS imports and global styles.
*   **`api/[[...slugs]]/route.ts`**: The **ONLY** API route in the project. It acts as a gateway to the Elysia server.
*   **`room/[roomId]/page.tsx`**: The Chat Room page. This is a dynamic route where `roomId` is the unique ID of the chat room.

### `src/components`
Contains reusable React components.
*   **`providers.tsx`**: Wraps the application with necessary context providers (like React Query) to manage state.

### `src/lib`
Utilities and helper functions.
*   **`redis.ts`**: Configures the connection to Upstash Redis database.
*   **`realtime.ts`**: structured schemas and setup for Upstash Realtime (Pub/Sub).
*   **`client.ts`**: The "Eden" client configuration. It gives the frontend type-safe access to the backend API.
*   **`proxy.ts`**: (Likely helpers for proxying requests if used, or internal logic).

### `src/hooks`
Custom React hooks.
*   *(File list depends on project state, typically contains hooks for chat logic or fetching data)*.

---

## Where should I look for...?

| If you want to change... | Look in... |
| :--- | :--- |
| **The Homepage UI** | `src/app/page.tsx` |
| **The Chat Interface** | `src/app/room/[roomId]/page.tsx` |
| **Backend API Logic** | `src/app/api/[[...slugs]]/route.ts` |
| **Database/Message Models** | `src/app/api/[[...slugs]]/route.ts` (Inline models) or `src/lib/realtime.ts` |
| **Styling** | `src/app/globals.css` or Tailwind classes in component files |
