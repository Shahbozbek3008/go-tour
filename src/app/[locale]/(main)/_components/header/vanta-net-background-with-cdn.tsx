"use client"
import { useEffect, useRef } from "react"

const VantaNetBackgroundWithCDN: React.FC = () => {
    const vantaRef = useRef<HTMLDivElement>(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const vantaEffect = useRef<any>(null)

    useEffect(() => {
        // Load Vanta.js and Three.js from CDN
        const loadVanta = async () => {
            // @ts-expect-error asdf
            if (typeof window !== "undefined" && !window.VANTA) {
                // Load Three.js first
                const threeScript = document.createElement("script")
                threeScript.src =
                    "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
                document.head.appendChild(threeScript)

                await new Promise((resolve) => {
                    threeScript.onload = resolve
                })

                // Then load Vanta.js NET effect
                const vantaScript = document.createElement("script")
                vantaScript.src =
                    "https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.net.min.js"
                document.head.appendChild(vantaScript)

                await new Promise((resolve) => {
                    vantaScript.onload = resolve
                })
            }

            // Initialize Vanta effect
            // @ts-expect-error asdf
            if (vantaRef.current && window.VANTA) {
                // @ts-expect-error asdf
                vantaEffect.current = window.VANTA.NET({
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    color: 0x6366f1, // Indigo color
                    backgroundColor: 0x0f172a, // Dark slate background
                    points: 8,
                    maxDistance: 33.0,
                    spacing: 40,
                    showDots: true,
                    // THREE,
                })
            }
        }

        loadVanta()

        // Cleanup function
        return () => {
            if (vantaEffect.current) {
                vantaEffect.current.destroy()
            }
        }
    }, [])

    return <div ref={vantaRef} className="absolute inset-0 w-full h-full" />
}

export default VantaNetBackgroundWithCDN
