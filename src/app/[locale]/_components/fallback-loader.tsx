"use client"

import { cn } from "@/lib/utils/shadcn"
import { useEffect, useRef } from "react"

type Props = {
    className?: string
}

const LOCATIONS = ["Samarqand", "Paris", "Bali", "Tokyo", "Dubai"]
const STAR_COUNT = 90

export default function FallbackLoader({ className }: Props) {
    const starsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = starsRef.current
        if (!container) return

        const fragment = document.createDocumentFragment()

        for (let i = 0; i < STAR_COUNT; i++) {
            const star = document.createElement("div")
            const size = Math.random() * 2 + 0.5
            star.className = "absolute rounded-full bg-white"
            star.style.cssText = `
                width:${size}px;
                height:${size}px;
                left:${Math.random() * 100}%;
                top:${Math.random() * 70}%;
                animation: twinkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 4}s infinite;
                opacity: ${0.1 + Math.random() * 0.3};
            `
            fragment.appendChild(star)
        }

        container.appendChild(fragment)

        return () => {
            container.innerHTML = ""
        }
    }, [])

    return (
        <div
            className={cn(
                "relative w-full h-screen overflow-hidden flex items-center justify-center",
                "bg-[#0a0f1e]",
                className,
            )}
            style={{ fontFamily: "'Outfit', sans-serif" }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Outfit:wght@300;400&display=swap');

                @keyframes twinkle {
                    0%, 100% { opacity: var(--min-op, 0.2); transform: scale(1); }
                    50%       { opacity: 1; transform: scale(1.4); }
                }
                @keyframes fly {
                    0%   { transform: translate(-60px, 20px) rotate(-3deg); }
                    25%  { transform: translate(0px, -8px) rotate(2deg); }
                    50%  { transform: translate(60px, 4px) rotate(-1deg); }
                    75%  { transform: translate(20px, -12px) rotate(3deg); }
                    100% { transform: translate(-60px, 20px) rotate(-3deg); }
                }
                @keyframes trail {
                    0%, 100% { opacity: 0.3; width: 60px; }
                    25%, 75% { opacity: 0.7; width: 90px; }
                    50%      { opacity: 0.5; width: 70px; }
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes dotPulse {
                    0%, 100% { transform: scale(1);   opacity: 0.4; background: rgba(255,255,255,0.4); }
                    50%      { transform: scale(1.6); opacity: 1;   background: rgba(255,190,80,0.9); }
                }
                @keyframes progressLoad {
                    0%   { width: 0%;  margin-left: 0%; }
                    50%  { width: 70%; margin-left: 15%; }
                    100% { width: 0%;  margin-left: 100%; }
                }
                @keyframes chipGlow {
                    0%, 100% { color: rgba(255,255,255,0.3); border-color: rgba(255,255,255,0.1); }
                    50%      { color: rgba(255,190,80,0.85); border-color: rgba(255,190,80,0.35); }
                }

                .fl-brand      { animation: fadeUp 1s ease both; }
                .fl-dots       { animation: fadeUp 1s ease 0.3s both; }
                .fl-progress   { animation: fadeUp 1s ease 0.5s both; }
                .fl-chips      { animation: fadeUp 1s ease 0.7s both; }
                .fl-plane      { animation: fly 4s ease-in-out infinite; }
                .fl-trail      { animation: trail 4s ease-in-out infinite; }
                .fl-dot-1      { animation: dotPulse 1.4s ease-in-out 0s infinite; }
                .fl-dot-2      { animation: dotPulse 1.4s ease-in-out 0.2s infinite; }
                .fl-dot-3      { animation: dotPulse 1.4s ease-in-out 0.4s infinite; }
                .fl-fill       { animation: progressLoad 2.4s ease-in-out infinite; }
                .fl-chip-1     { animation: chipGlow 3.6s ease-in-out 0s infinite; }
                .fl-chip-2     { animation: chipGlow 3.6s ease-in-out 1.2s infinite; }
                .fl-chip-3     { animation: chipGlow 3.6s ease-in-out 2.4s infinite; }
            `}</style>

            <div
                ref={starsRef}
                className="absolute inset-0 pointer-events-none"
            />

            <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-b from-transparent via-[#0d1528]/40 to-[#111e3a]" />

            <svg
                className="absolute bottom-0 left-0 right-0 w-full"
                viewBox="0 0 800 200"
                preserveAspectRatio="none"
                style={{ height: 200 }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0,200 L0,140 L80,80 L160,120 L240,60 L320,100 L400,40 L480,90 L560,55 L640,95 L720,70 L800,110 L800,200 Z"
                    fill="#0d1528"
                    opacity="0.9"
                />
                <path
                    d="M0,200 L0,160 L100,110 L180,140 L260,100 L340,130 L420,90 L500,120 L580,95 L660,125 L740,100 L800,130 L800,200 Z"
                    fill="#111e3a"
                    opacity="0.8"
                />
            </svg>

            <div
                className="absolute"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(180,210,255,0.15), rgba(255,190,100,0.25), rgba(180,210,255,0.15), transparent)",
                    height: 1,
                    bottom: "38%",
                    left: 0,
                    right: 0,
                }}
            />

            <div className="fl-plane absolute" style={{ zIndex: 5 }}>
                <div
                    className="fl-trail absolute top-1/2 -translate-y-1/2"
                    style={{
                        right: "100%",
                        width: 80,
                        height: 1,
                        background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.4))",
                    }}
                />
                <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0011 2a1.5 1.5 0 00-1.5 1.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L12 19v-5.5L21 16z"
                        fill="rgba(255,255,255,0.9)"
                    />
                </svg>
            </div>

            <div
                className="relative flex flex-col items-center gap-7"
                style={{ zIndex: 10 }}
            >
                <h1
                    className="fl-brand"
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 300,
                        fontSize: 42,
                        color: "#fff",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        margin: 0,
                    }}
                >
                    Travel
                    <span style={{ color: "rgba(255,190,80,0.9)" }}>.</span>
                </h1>

                <div className="fl-dots flex items-center gap-2">
                    {(["fl-dot-1", "fl-dot-2", "fl-dot-3"] as const).map(
                        (cls) => (
                            <div
                                key={cls}
                                className={cls}
                                style={{
                                    width: 5,
                                    height: 5,
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,0.4)",
                                }}
                            />
                        ),
                    )}
                </div>

                <div className="fl-progress flex flex-col items-center gap-2.5">
                    <div
                        style={{
                            width: 180,
                            height: 1,
                            background: "rgba(255,255,255,0.12)",
                            borderRadius: 1,
                            overflow: "hidden",
                        }}
                    >
                        <div
                            className="fl-fill"
                            style={{
                                height: "100%",
                                background:
                                    "linear-gradient(90deg, rgba(255,190,80,0.6), rgba(255,255,255,0.9))",
                                borderRadius: 1,
                            }}
                        />
                    </div>
                    <span
                        style={{
                            fontWeight: 300,
                            fontSize: 11,
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.35)",
                        }}
                    >
                        Dunyoni kashf etmoqda
                    </span>
                </div>

                <div className="fl-chips flex items-center gap-2">
                    {LOCATIONS.slice(0, 3).map((loc, i) => (
                        <div
                            key={loc}
                            className={`fl-chip-${i + 1}`}
                            style={{
                                padding: "5px 12px",
                                border: "0.5px solid rgba(255,255,255,0.12)",
                                borderRadius: 20,
                                fontSize: 11,
                                fontWeight: 300,
                                letterSpacing: "0.06em",
                                color: "rgba(255,255,255,0.35)",
                            }}
                        >
                            {loc}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
