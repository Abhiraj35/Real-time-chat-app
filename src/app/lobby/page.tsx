'use client'

import { useUsername } from "@/hooks/use-username";
import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import Crosshair from "@/components/Crosshair";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Button from "@/components/ui/Button";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Lobby />
    </Suspense>
  )
}

function Lobby() {
  const { username } = useUsername()
  const router = useRouter()
  const [roomId, setRoomId] = useState("")

  const searchParams = useSearchParams()
  const wasDestroyed = searchParams.get("destroy") === "true"
  const error = searchParams.get("error")


  const { mutate: createRoom, isPending } = useMutation({
    mutationFn: async () => {
      const res = await client.room.create.post()

      if (res.status == 200) {
        router.push(`/room/${res.data?.roomId}`)
      }
    }
  })

  const alert = wasDestroyed
    ? {
      title: "Room destroyed",
      description: "All messages are deleted and the room is no longer accessible."
    }
    : error === "room-not-found"
      ? {
        title: "Room not found",
        description: "The room ID does not exist or the room was removed."
      }
      : error === "room-full"
        ? {
          title: "Room full",
          description: "This room reached its participant limit. Try another room."
        }
        : null

  const handleJoinRoom = () => {
    const normalizedRoomId = roomId.trim()
    if (!normalizedRoomId) return
    router.push(`/room/${normalizedRoomId}`)
  }

  const shellClass =
    "rounded-xl border border-(--border) bg-[color-mix(in_srgb,var(--background)_92%,transparent)] p-5 backdrop-blur-sm md:p-6"

  return (
    <main className="min-h-screen w-full bg-background">
      <div className="flex w-full justify-center border-b border-(--border) bg-[color-mix(in_srgb,var(--background)_90%,transparent)] backdrop-blur-md">
        <div className="relative flex h-16 w-full max-w-6xl items-center justify-between border-x border-(--border) px-4 sm:px-8">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-linear-to-br from-primary to-accent-secondary md:h-8 md:w-8">
              <div className="h-3 w-3 rotate-45 rounded-sm bg-foreground md:h-4 md:w-4" />
            </div>
            <p className="text-lg font-bold tracking-tight text-foreground md:text-xl">Flux</p>
          </div>
          <Button
            href="/"
            className="group relative text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:bg-accent-secondary"
          >
            Back to landing
          </Button>
        </div>
      </div>

      <section className="flex w-full justify-center px-4 py-10 sm:px-8">
        <div className="relative w-full max-w-6xl bg-background px-5 py-8 sm:px-8 sm:py-10">
          <div className="mx-auto w-full max-w-2xl">
            <div className={shellClass}>
              {alert && (
                <div className="mb-5 border border-destructive/40 bg-destructive/10 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-destructive">{alert.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{alert.description}</p>
                </div>
              )}
              <div className="space-y-6">
                <div className="space-y-3 text-center">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Secure lobby
                  </p>
                  <h1 className="text-3xl leading-[1.05] font-bold tracking-[-0.03em] text-foreground sm:text-4xl">
                    Start a{" "}
                    <span className="bg-linear-to-b from-primary to-accent-secondary bg-clip-text text-transparent">
                      private
                    </span>{" "}
                    conversation.
                  </h1>
                  <p className="max-w-xl text-sm leading-[1.7] text-muted-foreground">
                    Create a room in one click, share the ID, and chat in real time. Sessions are short-lived and designed to leave no trail.
                  </p>
                </div>

                <div className="border-t border-(--border) pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Identity</p>
                  <p className="mt-2 rounded-sm border border-(--border) bg-background px-3 py-2 font-mono text-sm text-foreground">
                    {username}
                  </p>
                </div>

                <div className="space-y-3 border-t border-(--border) pt-5">
                  <button
                    disabled={isPending}
                    onClick={() => createRoom()}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-primary bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-180 hover:bg-accent-secondary disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isPending ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        <span>Creating room...</span>
                      </>
                    ) : (
                      "Create a room"
                    )}
                  </button>
                  <p className="text-xs text-muted-foreground">
                    Room will expire automatically in 10 minutes.
                  </p>
                </div>

                <div className="space-y-3 border-t border-(--border) pt-5">
                  <label className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Join with room ID
                  </label>
                  <input
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault()
                        handleJoinRoom()
                      }
                    }}
                    placeholder="Enter room id"
                    type="text"
                    className="w-full rounded-sm border border-(--border) bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary"
                  />
                  <button
                    disabled={!roomId.trim()}
                    onClick={handleJoinRoom}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-(--border) px-6 py-2.5 text-sm font-semibold text-foreground transition-all duration-180 hover:border-muted-foreground hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Join room
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
export default page
