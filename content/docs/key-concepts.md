---
title: Key Conception Magic
description: Advanced patterns and how the app works under the hood
order: 4
---

# Key Concepts & "Magic"

This project uses some advanced patterns to be simple and robust. Here is what is going on under the hood.

## 1. ElysiaJS on Next.js

Typically, in Next.js, you write many `route.ts` files (e.g., `app/api/users/route.ts`, `app/api/posts/route.ts`).
In this project, we use **ElysiaJS**, a framework usually used for standalone servers, but running *inside* Next.js.

*   **Why?** Speed and Type Safety.
*   **How?** We have one "catch-all" route: `src/app/api/[[...slugs]]/route.ts`.
    *   Next.js gives *all* `/api/*` requests to this file.
    *   This file passes the request to the Elysia `app`.
    *   Elysia handles the routing internaly.

## 2. End-to-End Type Safety

We use a feature called **Eden Treaty**. This magically links the Backend types to the Frontend.

*   **Backend (`route.ts`)**:
    ```typescript
    const app = new Elysia()
        .post('/chat', ({ body }) => { ... }, {
            body: t.Object({ text: t.String() }) // We define schema here
        })
    ```

*   **Frontend (`page.tsx`)**:
    ```typescript
    await client.api.chat.post({
        text: "Hello" // TypeScript knows this MUST be a string!
    })
    ```

If you change the backend schema, the frontend code will immediately show a red squiggle error. This prevents bugs before you even run the app!

## 3. Real-time Chat (Pub/Sub)

We don't use complex WebSocket servers like Socket.io. We use **Serverless WebSockets** via Upstash Realtime.

1.  **Publishing**: When you send a message, the API server "publishes" it to a specific channel name (like `chat-room-123`).
2.  **Subscribing**: The frontend connects to Upstash and "subscribes" to that same channel `chat-room-123`.
3.  **Delivery**: Upstash handles pushing the data. Our server is stateless and doesn't need to keep open connections.

This means the app can scale to thousands of users without crashing your server!
