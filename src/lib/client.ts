import { treaty } from '@elysiajs/eden'
import type { App } from '../app/api/[[...slugs]]/route'

// // .api to enter /api prefix
// export const api =
//   // process is defined on server side and build time
//   typeof process !== 'undefined'
//     ? treaty(App).api
//     : treaty<typeof App>('localhost:3000').api

// For client-side, use the current origin (protocol + host)
// For server-side, use VERCEL_URL if available, otherwise localhost
const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
        return window.location.origin
    }
    if (process.env.NEXT_PUBLIC_APP_URL) {
        return `https://${process.env.NEXT_PUBLIC_APP_URL}`
    }
    return 'http://localhost:3000'
}

export const client = treaty<App>(getBaseUrl()).api
