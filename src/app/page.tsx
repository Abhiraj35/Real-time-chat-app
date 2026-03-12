'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Github, ArrowRight, ArrowDown, Timer, UserX, Shield, Zap } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { TerminalAnimation } from '@/components/landing/terminal'

export default function LandingPage() {
    const [scrolled, setScrolled] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        
        window.addEventListener('scroll', handleScroll)
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        )

        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))

        return () => {
            window.removeEventListener('scroll', handleScroll)
            observer.disconnect()
        }
    }, [])

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header 
                className={`fixed top-0 inset-x-0 h-14 z-50 backdrop-blur-md border-b transition-all duration-300 ${
                    scrolled 
                        ? 'bg-background/80 border-zinc-200 dark:border-zinc-800' 
                        : 'bg-transparent border-transparent'
                }`}
            >
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-1.5 text-lg font-semibold tracking-tight">
                        <span className="text-green-500">&gt;</span>
                        <span className="text-foreground">flux</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        <a href="#how-it-works" className="text-xs font-medium text-zinc-500 hover:text-foreground uppercase tracking-widest transition-colors relative group">
                            how it works
                            <span className="absolute bottom-[-4px] left-0 w-full h-px bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                        </a>
                        <a href="#features" className="text-xs font-medium text-zinc-500 hover:text-foreground uppercase tracking-widest transition-colors relative group">
                            features
                            <span className="absolute bottom-[-4px] left-0 w-full h-px bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                        </a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <a 
                            href="https://github.com/Abhiraj35/Real-time-chat-app" 
                            target="_blank" 
                            rel="noopener"
                            className="text-zinc-500 hover:text-foreground transition-all duration-150 hover:scale-110 flex"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        {mounted && <ThemeToggle />}
                    </div>
                </div>
            </header>

            <main className="grow">
                {/* Hero Section */}
                <section className="pt-24 md:pt-40 pb-24 px-4">
                    <div className="max-w-[760px] mx-auto text-center flex flex-col items-center">
                        <span className="inline-block text-[0.7rem] font-medium tracking-[0.15em] uppercase text-green-400 mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
                            [ ephemeral by design ]
                        </span>

                        <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] text-foreground leading-[1.1] animate-fade-up font-semibold tracking-tight mb-2 whitespace-nowrap" style={{ animationDelay: '200ms' }}>
                            Chat that disappears.
                        </h1>

                        <p className="text-base text-zinc-500 max-w-[520px] mx-auto leading-relaxed mb-12 animate-fade-in" style={{ animationDelay: '350ms' }}>
                            Create a private room. Share the ID.{' '}
                            <br className="hidden sm:block" />Everything vanishes in 10 minutes — messages, history, traces.
                        </p>

                        <div className="flex flex-row items-center justify-center gap-3 animate-fade-up" style={{ animationDelay: '500ms' }}>
                            <Link 
                                href="/lobby" 
                                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold text-[0.9375rem] px-6 py-3 rounded-md shadow-[0_0_24px_rgba(34,197,94,0.3)] hover:shadow-[0_0_32px_rgba(34,197,94,0.5)] transition-all duration-200 hover:scale-[1.02]"
                            >
                                Create a Room
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a 
                                href="#how-it-works" 
                                className="group inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-foreground px-4 py-3 transition-colors duration-150"
                            >
                                See how it works
                                <ArrowDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-[3px]" />
                            </a>
                        </div>

                        <div className="animate-scale" style={{ animationDelay: '700ms' }}>
                            <TerminalAnimation />
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section id="how-it-works" className="py-16 md:py-24 px-4 scroll-mt-14">
                    <div className="max-w-[1100px] mx-auto">
                        <div className="text-center mb-16 animate-on-scroll">
                            <span className="block text-[0.7rem] font-medium tracking-[0.15em] uppercase text-green-400 mb-4">
                                [ how it works ]
                            </span>
                            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-foreground">
                                Three steps to gone.
                            </h2>
                        </div>

                        <div className="relative flex flex-col md:flex-row gap-8 md:gap-4 mt-8">
                            <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-zinc-200 dark:bg-zinc-800 -z-10"></div>

                            <div className="flex-1 flex flex-col items-start animate-on-scroll">
                                <div className="text-5xl font-semibold text-green-400 opacity-60 mb-4 leading-none bg-background pr-4">
                                    01
                                </div>
                                <h3 className="text-base font-medium text-foreground mb-2 tracking-tight">Create a room.</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed max-w-[220px] text-left">
                                    One click. No account, no email, no password.
                                </p>
                            </div>

                            <div className="flex-1 flex flex-col items-start animate-on-scroll" style={{ transitionDelay: '100ms' }}>
                                <div className="text-5xl font-semibold text-green-400 opacity-60 mb-4 leading-none bg-background px-4 md:-ml-4">
                                    02
                                </div>
                                <h3 className="text-base font-medium text-foreground mb-2 tracking-tight">Share the ID.</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed max-w-[220px] text-left">
                                    Send the room ID to whoever needs to be there. Anyone with it can join.
                                </p>
                            </div>

                            <div className="flex-1 flex flex-col items-start animate-on-scroll" style={{ transitionDelay: '200ms' }}>
                                <div className="text-5xl font-semibold text-green-400 opacity-60 mb-4 leading-none bg-background pl-4 md:-ml-4">
                                    03
                                </div>
                                <h3 className="text-base font-medium text-foreground mb-2 tracking-tight">It&apos;s gone in 10.</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed max-w-[220px] text-left">
                                    After 10 minutes, the room, the messages, and the history are permanently deleted.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800 px-4 scroll-mt-14">
                    <div className="max-w-[1100px] mx-auto">
                        <div className="text-center mb-16 animate-on-scroll">
                            <span className="block text-[0.7rem] font-medium tracking-[0.15em] uppercase text-green-400 mb-4">
                                [ what you get ]
                            </span>
                            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-foreground">
                                Built to disappear.
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                            <div className="bg-background p-8 transition-colors duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 border-l-2 border-transparent hover:border-green-500 group animate-on-scroll">
                                <Timer className="w-6 h-6 text-green-400 mb-4" />
                                <h3 className="text-base font-medium text-foreground mb-2 tracking-tight">10-minute rooms</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">
                                    Hard limit. No extensions. The countdown starts the moment the room is created.
                                </p>
                            </div>

                            <div className="bg-background p-8 transition-colors duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 border-l-2 border-transparent hover:border-green-500 group animate-on-scroll" style={{ transitionDelay: '80ms' }}>
                                <UserX className="w-6 h-6 text-green-400 mb-4" />
                                <h3 className="text-base font-medium text-foreground mb-2 tracking-tight">No accounts</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">
                                    Nothing to sign up for. Nothing to log out of. You were never here.
                                </p>
                            </div>

                            <div className="bg-background p-8 transition-colors duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 border-l-2 border-transparent hover:border-green-500 group animate-on-scroll" style={{ transitionDelay: '160ms' }}>
                                <Shield className="w-6 h-6 text-green-400 mb-4" />
                                <h3 className="text-base font-medium text-foreground mb-2 tracking-tight">Zero logs</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">
                                    Messages aren&apos;t stored in a database waiting to be leaked. They exist in memory, then they don&apos;t.
                                </p>
                            </div>

                            <div className="bg-background p-8 transition-colors duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 border-l-2 border-transparent hover:border-green-500 group animate-on-scroll" style={{ transitionDelay: '240ms' }}>
                                <Zap className="w-6 h-6 text-green-400 mb-4" />
                                <h3 className="text-base font-medium text-foreground mb-2 tracking-tight">Real-time</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">
                                    WebSocket-powered. Messages arrive instantly. No polling, no delay.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-30 px-4 relative flex flex-col items-center text-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_300px_at_50%_50%,rgba(34,197,94,0.04)_0%,transparent_70%)] pointer-events-none"></div>
                    
                    <div className="relative z-10 animate-on-scroll">
                        <span className="block text-[0.7rem] font-medium tracking-[0.15em] uppercase text-green-400 mb-4">
                            [ ready? ]
                        </span>
                        
                        <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold text-foreground mb-8 tracking-tight whitespace-nowrap">
                            The room won&apos;t wait.
                        </h2>
                        
                        <Link 
                            href="/lobby" 
                            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold text-[0.9375rem] px-6 py-3 rounded-md shadow-[0_0_24px_rgba(34,197,94,0.3)] hover:shadow-[0_0_32px_rgba(34,197,94,0.5)] transition-all duration-200 hover:scale-[1.02]"
                        >
                            Create a Room
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 px-4 mt-auto">
                <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    <div>
                        <div className="flex items-center gap-1.5 text-sm font-semibold tracking-tight justify-center md:justify-start mb-1">
                            <span className="text-green-500">&gt;</span>
                            <span className="text-foreground">flux</span>
                        </div>
                        <p className="text-xs text-zinc-500">chat that disappears.</p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2">
                        <div className="flex items-center gap-4 text-sm text-zinc-500">
                            <a href="https://github.com/Abhiraj35/Real-time-chat-app" className="hover:text-foreground transition-colors">GitHub</a>
                            <span className="opacity-30">|</span>
                            <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
                        </div>
                        <p className="text-xs text-zinc-500">
                            built with Next.js · Upstash · Elysia · WebSockets
                        </p>
                    </div>
                </div>
            </footer>

            <style jsx global>{`
                @keyframes fade-up {
                    from {
                        opacity: 0;
                        transform: translateY(8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0.98);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-fade-up {
                    opacity: 0;
                    animation: fade-up 0.5s ease forwards;
                }
                .animate-fade-in {
                    opacity: 0;
                    animation: fade-in 0.4s ease forwards;
                }
                .animate-scale {
                    opacity: 0;
                    animation: scale-in 0.5s ease forwards;
                }
                .animate-on-scroll {
                    opacity: 0;
                    transform: translateY(16px);
                    transition: opacity 0.4s ease, transform 0.4s ease;
                }
                .animate-on-scroll.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </div>
    )
}
