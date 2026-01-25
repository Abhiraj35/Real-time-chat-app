'use client'
import { useUsername } from "@/hooks/use-username";
import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const page = () => {
  return <Suspense fallback={<div>Loading...</div>}>
    <Lobby />
  </Suspense>
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
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {wasDestroyed && (
          <div className="bg-red-900/50 border border-red-900 p-4 text-center ">
            <p className="text-red-500 text-sm font-bold">ROOM DESTROYED</p>
            <p className="text-zinc-500 text-xs mt-1">All messages have been deleted and the room is no longer accessible.</p>
          </div>
        )}
        {error === "room-not-found" && (
          <div className="bg-red-900/50 border border-red-900 p-4 text-center ">
            <p className="text-red-500 text-sm font-bold">ROOM NOT FOUND</p>
            <p className="text-zinc-500 text-xs mt-1">The room you are looking for does not exist or has been deleted.</p>
          </div>
        )}
        {error === "room-full" && (
          <div className="bg-red-900/50 border border-red-900 p-4 text-center ">
            <p className="text-red-500 text-sm font-bold">ROOM FULL</p>
            <p className="text-zinc-500 text-xs mt-1">The room is full, please try again later.</p>
          </div>
        )}

      {/* Nav Buttons */}

        <div className="absolute top-4 right-15 flex items-center gap-4">
          <Link href="/docs" className="text-zinc-500 hover:text-zinc-200 text-sm transition-colors">
              Docs
          </Link>

          <Link href="https://github.com/Abhiraj35/Real-time-chat-app" target="_blank"
            rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-200 text-sm transition-colors">
              GitHub
          </Link>

        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-green-500">
            {">"} private_chat
          </h1>
          <p className="text-zinc-500 text-sm">A Private,self-destructing chat room.</p>
        </div>


        <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center text-zinc-500">Your Identity</label>

              <div className="flex items-center gap-3">
                <div className="flex-1 bg-zinc-950 border border-zinc-800 p-3 text text-sm text-zinc-400 font-mono">
                  {username}
                </div>
              </div>
            </div>

            <button
              disabled={isPending}
              onClick={() => createRoom()}
              className="w-full bg-zinc-100 text-black p-3 text-sm font-bold hover:bg-zinc-50 hover:text-black transition-colors mt-2 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent" />
                  <span>CREATING...</span>
                </>
              ) : (
                "CREATE SECURE ROOM"
              )}
            </button>
            <div className="flex items-center gap-2 my-4">
              <div className="h-px bg-zinc-800 flex-1" />
              <span className="text-xs text-zinc-500 font-mono">OR</span>
              <div className="h-px bg-zinc-800 flex-1" />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-zinc-500">Join via Room ID</label>
              <input
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter Room ID"
                type="text"
                className="w-full bg-black border border-zinc-800 focus:border-zinc-700 focus:outline-none transition-colors text-zinc-100 placeholder:text-zinc-700 p-3 text-sm"
              />

              <button
                disabled={!roomId.trim()}
                onClick={() => router.push(`/room/${roomId}`)}
                className="w-full bg-zinc-800 text-zinc-400 p-3 text-sm font-bold hover:bg-zinc-700 hover:text-zinc-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                JOIN ROOM
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default page