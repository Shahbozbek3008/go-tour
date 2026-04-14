"use client"

import React, { useEffect, useRef } from "react"

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
}

const AnimatedNetworkBg: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const animationRef = useRef<number | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }

        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        // Initialize particles
        const initParticles = () => {
            const particleCount = Math.floor(
                (canvas.width * canvas.height) / 12000,
            )
            particlesRef.current = []

            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.8 + 0.2,
                })
            }
        }

        initParticles()

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update particles
            particlesRef.current.forEach((particle) => {
                particle.x += particle.vx
                particle.y += particle.vy

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width
                if (particle.x > canvas.width) particle.x = 0
                if (particle.y < 0) particle.y = canvas.height
                if (particle.y > canvas.height) particle.y = 0
            })

            // Draw connections
            ctx.strokeStyle = "rgba(0, 255, 255, 0.15)"
            ctx.lineWidth = 0.5

            for (let i = 0; i < particlesRef.current.length; i++) {
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const p1 = particlesRef.current[i]
                    const p2 = particlesRef.current[j]

                    const dx = p1.x - p2.x
                    const dy = p1.y - p2.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 150) {
                        const opacity = (1 - distance / 150) * 0.3
                        ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`
                        ctx.beginPath()
                        ctx.moveTo(p1.x, p1.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                    }
                }
            }

            // Draw particles
            particlesRef.current.forEach((particle) => {
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`
                ctx.fill()

                // Add glow effect
                ctx.shadowColor = "rgba(0, 255, 255, 0.6)"
                ctx.shadowBlur = 10
                ctx.fill()
                ctx.shadowBlur = 0
            })

            animationRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [])

    return (
        <>
            {/* Dark background with subtle pattern */}
            <div className="absolute inset-0 bg-gray-900">
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 25% 25%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)",
                    }}
                ></div>
            </div>

            {/* Animated canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ mixBlendMode: "screen" }}
            />
        </>
    )
}

export default AnimatedNetworkBg
