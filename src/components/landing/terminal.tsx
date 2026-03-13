'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

interface TerminalLine {
    t: number
    type: 'system' | 'danger' | 'user' | 'other'
    text: string
}

const terminalScript: TerminalLine[] = [
    { t: 500, type: 'system', text: '[system] room created — flux://rm_x9k2p' },
    { t: 1000, type: 'system', text: '[system] expires in 10:00' },
    { t: 1500, type: 'user', text: '[you] hey, can you see this?' },
    { t: 2500, type: 'other', text: '[anon_7f2] yeah, I\'m in. what\'s up?' },
    { t: 3500, type: 'user', text: '[you] this room deletes itself in 9 minutes' },
    { t: 4500, type: 'other', text: '[anon_7f2] good' },
    { t: 6500, type: 'danger', text: '[system] ⚠ 1 minute remaining' },
    { t: 7500, type: 'system', text: '[system] room destroyed. all messages deleted.' },
]

export function TerminalAnimation() {
    const [lines, setLines] = useState<{ id: number; type: string; text: string; displayed: string }[]>([])
    const [timer, setTimer] = useState('10:00')
    const [isDanger, setIsDanger] = useState(false)
    const [key, setKey] = useState(0)

    const timeoutRefs = useRef<NodeJS.Timeout[]>([])
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const getColor = (type: string) => {
        switch (type) {
            case 'system': return 'text-zinc-500'
            case 'danger': return 'text-red-500'
            case 'user': return 'text-zinc-200'
            case 'other': return 'text-green-400'
            default: return 'text-zinc-300'
        }
    }

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0')
        const s = (seconds % 60).toString().padStart(2, '0')
        return `${m}:${s}`
    }

    const typeText = useCallback((lineId: number, text: string, isFast: boolean) => {
        let i = 0
        const charDelay = isFast ? 0 : 30

        const typeChar = () => {
            if (i < text.length) {
                setLines(prev => prev.map(line => 
                    line.id === lineId 
                        ? { ...line, displayed: text.slice(0, i + 1) } 
                        : line
                ))
                i++
                const id = setTimeout(typeChar, charDelay + Math.random() * 20)
                timeoutRefs.current.push(id)
            }
        }
        typeChar()
    }, [])

    const runSequence = useCallback(() => {
        const startTime = Date.now()

        if (intervalRef.current) clearInterval(intervalRef.current)
        
        setLines([])
        setTimer('10:00')
        setIsDanger(false)

        intervalRef.current = setInterval(() => {
            const elapsed = Date.now() - startTime

            if (elapsed < 6500) {
                const fakeSec = 600 - Math.floor(elapsed / 100)
                setTimer(formatTime(Math.max(fakeSec, 540)))
            } else if (elapsed >= 6500 && elapsed < 7500) {
                const fakeSec = 60 - Math.floor((elapsed - 6500) / 16)
                setTimer(formatTime(Math.max(fakeSec, 0)))
                setIsDanger(true)
            } else {
                setTimer('00:00')
                if (intervalRef.current) clearInterval(intervalRef.current)
            }
        }, 50)

        terminalScript.forEach((action) => {
            const id = setTimeout(() => {
                const lineId = Date.now() + Math.random()
                setLines(prev => [...prev, { id: lineId, type: action.type, text: action.text, displayed: '' }])
                
                const isSystem = action.type === 'system' || action.type === 'danger'
                setTimeout(() => {
                    typeText(lineId, action.text, isSystem)
                }, 10)
            }, action.t)
            timeoutRefs.current.push(id)
        })

        const restartId = setTimeout(() => {
            timeoutRefs.current.forEach(clearTimeout)
            if (intervalRef.current) clearInterval(intervalRef.current)
            setKey(prev => prev + 1)
        }, 8500)
        timeoutRefs.current.push(restartId)
    }, [typeText])

    useEffect(() => {
        runSequence()

        return () => {
            timeoutRefs.current.forEach(clearTimeout)
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [key, runSequence])

    return (
        <div className="w-full max-w-160 mt-18 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden text-left shadow-2xl relative">
            <div className="h-9 bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-400"></div>
                </div>
                <div className="text-[11px] text-zinc-500 font-medium">flux://rm_x9k2p</div>
            </div>

            <div className="p-5 min-h-45 sm:min-h-55 text-[13px] leading-[1.8] relative flex flex-col justify-end">
                <div
                    className={`absolute top-5 right-5 tabular-nums font-medium transition-colors duration-1000 ${
                        isDanger ? 'text-red-500 animate-pulse' : 'text-zinc-500'
                    }`}
                >
                    {timer}
                </div>

                <div className="flex flex-col gap-1 w-full">
                    {lines.map((line) => (
                        <div key={line.id} className={getColor(line.type)}>
                            {line.displayed}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
