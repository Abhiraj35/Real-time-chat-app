import { redis } from '@/lib/redis';
import { Elysia, t } from 'elysia'
import { nanoid } from 'nanoid'
import { authMiddleWare } from './auth';
import { z } from 'zod'
import { error } from 'console';
import { Message, realtime } from '@/lib/realtime';
import { realpath } from 'fs';

const ROOM_TTL_SECONDS = 60 * 10; //after 600 sec room will be auto deleted

const rooms = new Elysia({ prefix: "/room" }).post('/create', async () => {
    const roomId = nanoid();
    await redis.hset(`meta:${roomId}`, {
        connected: [],
        createdAt: Date.now(),
    })

    // self destruction
    await redis.expire(`meta:${roomId}`, ROOM_TTL_SECONDS)

    return { roomId }
}).use(authMiddleWare).get('/ttl', async ({ auth }) => {
    const ttl = await redis.ttl(`meta:${auth.roomId}`)
    return { ttl: ttl > 0 ? ttl : 0 }
}, { query: z.object({ roomId: z.string() }) })
    .delete('/', async ({ auth }) => {
        await realtime.channel(auth.roomId).emit("chat.destroy", { isDestroyed: true })

        await Promise.all([
            redis.del(auth.roomId),
            redis.del(`meta:${auth.roomId}`),
            redis.del(`messages:${auth.roomId}`)
        ])

        return { success: true }
    }, { query: z.object({ roomId: z.string() }) })

const messages = new Elysia({ prefix: "/messages" })
    .use(authMiddleWare)
    .post('/', async ({ body, auth }) => {
        const { sender, text } = body
        const { roomId } = auth

        const roomExist = await redis.exists(`meta:${roomId}`)

        if (!roomExist) {
            throw new Error("Room does not exist")
        }

        const message: Message = {
            id: nanoid(),
            sender,
            text,
            timestamp: Date.now(),
            roomId
        }

        //add message to history
        await redis.rpush(`messages:${roomId}`, { ...message, token: auth.token })

        await realtime.channel(roomId).emit("chat.message", message)

        //housekeeping

        const remaining = await redis.ttl(`meta:${roomId}`)

        await Promise.all([
            redis.expire(`messages:${roomId}`, remaining),
            redis.expire(`history:${roomId}`, remaining),
            redis.expire(roomId, remaining)
        ])

    }, {
        query: z.object({ roomId: z.string() }),
        body: z.object({
            sender: z.string().max(100),
            text: z.string().max(1000),
        }),
    }).get('/', async ({ query, auth }) => {
        const { roomId } = query
        const messages = await redis.lrange<Message>(`messages:${roomId}`, 0, -1)
        return {
            messages: messages.map((m) => ({
                ...m,
                token: m.token === auth.token ? auth.token : undefined,
            }))
        }
    }, { query: z.object({ roomId: z.string() }) })

const app = new Elysia({ prefix: '/api' }).use(rooms).use(messages)

export const GET = app.fetch
export const POST = app.fetch
export const DELETE = app.fetch

export type App = typeof app