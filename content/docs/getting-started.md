---
title: Getting Started
description: Setup instructions for local development
order: 2
---

# Getting Started

Follow these instructions to set up the project on your local machine for development and testing.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: Version 18 or higher.
*   **Package Manager**: The project uses `bun.lock`, so [Bun](https://bun.sh/) is recommended. You can also use `npm` or `yarn`.
*   **Upstash Account**: You need an account on [Upstash](https://upstash.com/) for Redis and Realtime.


## Environment Configuration

<Steps>

1.  **Clone the repository** (if you haven't already).

2.  **Create a `.env` file** in the root directory:
    ```bash
    cp .env.example .env
    ```
    *(If `.env.example` doesn't exist, create a new `.env` file).*

3.  **Add the required Environment Variables**:
    You need to get these credentials from your Upstash Console.

    ```bash
    # Upstash Redis Configuration
    UPSTASH_REDIS_REST_URL="https://your-database-name.upstash.io"
    UPSTASH_REDIS_REST_TOKEN="your-secret-token"
    ```

    *   **UPSTASH_REDIS_REST_URL**: The REST URL for your Redis database.
    *   **UPSTASH_REDIS_REST_TOKEN**: The REST Token for authentication.

    > **Note:** The `realtime` library in this project (`src/lib/realtime.ts`) reuses the Redis connection, so you typically don't need separate Realtime credentials if you use the Redis integration for Realtime.

## Installation

Install the project dependencies.

Using **Bun** (Recommended):
```bash
bun install
```

Using **npm**:
```bash
npm install
```

## Running the Development Server

Start the local development server:

```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for Production

To create a production build:

```bash
bun run build
```bash
bun run build
bun run start
```
</Steps>
