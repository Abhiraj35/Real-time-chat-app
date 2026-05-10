"use client"

import { useUsername } from "@/hooks/use-username"
import { client } from "@/lib/client"
import { useRealtime } from "@/lib/realtime-client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

function formatTimeRemaining(seconds: number) {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60

    return `${mins}:${secs.toString().padStart(2, "0")}`
}

const panelClass =
    "rounded-xl border border-(--border) bg-[color-mix(in_srgb,var(--background)_92%,transparent)] backdrop-blur-sm"
const metaLabelClass = "text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
const blockClass = "space-y-1 border-r border-(--border) pr-4 last:border-r-0 last:pr-0"

const Page = () => {
    const params = useParams()
    const router = useRouter()
    const roomId = params.roomId as string
    const [copyStatus, setCopyStatus] = useState("COPY")
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null)

    const { data: ttlData } = useQuery({
        queryKey: ["ttl", roomId],
        queryFn: async () => {
            const res = await client.room.ttl.get({ query: { roomId } })

            return res.data
        },
    })

    useEffect(() => {
        if (ttlData?.ttl !== undefined) {
            setTimeRemaining(ttlData.ttl)
        }
    }, [ttlData])

    useEffect(() => {
        if (timeRemaining === null || timeRemaining < 0) return

        if (timeRemaining === 0) {
            router.push("/lobby?destroy=true")
            return
        }

        const interval = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev === null || prev <= 1) {
                    clearInterval(interval)
                    return 0
                }

                return prev - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [timeRemaining, router])
    const { username } = useUsername()
    const [input, setInput] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const { data: messages, refetch } = useQuery({
        queryKey: ["messages", roomId],
        queryFn: async () => {
            const res = await client.messages.get({ query: { roomId } })
            return res.data
        }
    })

    const { mutate: sendMessage, isPending } = useMutation({
        mutationFn: async ({ text }: { text: string }) => {
            await client.messages.post({ sender: username, text }, { query: { roomId } })

            setInput("")
        }
        // ,
        // onSuccess: () => {
        //     queryClient.invalidateQueries({ queryKey: ["messages", roomId] })
        // }
    })

    useRealtime({
        channels: [roomId],
        events: ["chat.message", "chat.destroy"],
        onData: ({ event }) => {
            if (event === "chat.message") {
                refetch()
            }
            if (event === "chat.destroy") {
                router.push("/lobby?destroy=true")
            }
        }

    })

    const { mutate: destroyRoom } = useMutation({
        mutationFn: async () => {
            await client.room.delete(null, { query: { roomId } })
        }
    })
    const copyLink = () => {
        navigator.clipboard.writeText(roomId)

        setCopyStatus("COPIED!")
        setTimeout(() => {
            setCopyStatus("COPY")
        }, 2000);
    }


    return (
        <main className="flex h-screen max-h-screen flex-col overflow-hidden bg-background px-3 py-3 sm:px-5 sm:py-5">
            <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-3 sm:gap-4">
                <header className={`${panelClass} px-4 py-3 sm:px-5`}>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                            <div className={blockClass}>
                                <p className={metaLabelClass}>Room ID</p>
                                <div className="mt-1 flex items-center gap-2">
                                    <span className="font-mono text-sm font-semibold text-primary">{roomId}</span>
                                    <button
                                        onClick={copyLink}
                                        className="rounded-sm border border-(--border) bg-secondary px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                    >
                                        {copyStatus}
                                    </button>
                                </div>
                            </div>
                            <div className={blockClass}>
                                <p className={metaLabelClass}>Self-Destruct</p>
                                <p className={`mt-1 font-mono text-sm font-semibold text-foreground ${timeRemaining !== null && timeRemaining < 60 ? "text-red-600 dark:text-red-500" : "text-amber-600 dark:text-amber-500"}`}>
                                    {timeRemaining !== null ? formatTimeRemaining(timeRemaining) : "--:--"}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => destroyRoom()}
                            className="inline-flex items-center justify-center rounded-sm border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground disabled:opacity-50"
                        >
                            Destroy room
                        </button>
                    </div>
                </header>

                <div className={`${panelClass} flex min-h-0 flex-1 flex-col`}>
                    <div className="border-b border-(--border) px-4 py-3 sm:px-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                            Encrypted Session
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
                {messages?.messages.length === 0 && (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-muted-foreground">No messages yet, start the conversation.</p>
                    </div>
                )}

                {messages?.messages.map((m) => (
                    <div key={m.id} className="mb-4 flex flex-col items-start last:mb-0">
                        <div className="max-w-[90%] sm:max-w-[80%]">
                            <div className="mb-1 flex items-baseline gap-3">
                                <span className={`text-xs font-semibold ${m.sender === username ? "text-primary" : "text-foreground"}`}>
                                    {m.sender === username ? "You" : m.sender}
                                </span>

                                <span className="font-mono text-[0.65rem] text-muted-foreground">
                                    {format(m.timestamp, "HH:mm")}
                                </span>
                            </div>
                            <p className="rounded-md border border-(--border) bg-background px-3 py-2 text-sm leading-relaxed text-foreground">
                                {m.text}
                            </p>
                        </div>
                    </div>
                ))}
                    </div>

                    <div className="border-t border-(--border) px-4 py-3 sm:px-5">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="relative flex-1">
                                <input
                                    autoFocus
                                    ref={inputRef}
                                    value={input}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && input.trim()) {
                                            sendMessage({ text: input })
                                            inputRef.current?.focus()
                                            setInput("")
                                        }
                                    }}
                                    placeholder="Type message..."
                                    onChange={(e) => setInput(e.target.value)}
                                    type="text"
                                    className="w-full rounded-sm border border-(--border) bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary"
                                />
                            </div>

                            <button
                                onClick={() => {
                                    sendMessage({ text: input })
                                    inputRef.current?.focus()
                                    setInput("")
                                }}
                                disabled={!input.trim() || isPending}
                                className="inline-flex items-center justify-center rounded-sm border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent-secondary disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Page
