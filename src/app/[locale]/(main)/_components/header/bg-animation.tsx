"use client"

import { useEffect, useRef } from "react"

interface Point {
    x: number
    y: number
    vx: number
    vy: number
}

const NUM_POINTS = 150
const MAX_DISTANCE = 150

export default function CanvasBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const points = useRef<Point[]>([])
    const mouse = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener("resize", resize)
        resize()

        // Создание точек
        points.current = Array.from({ length: NUM_POINTS }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
        }))

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Обновляем и рисуем точки
            // eslint-disable-next-line prefer-const
            for (let p of points.current) {
                p.x += p.vx
                p.y += p.vy

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1

                ctx.beginPath()
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
                ctx.fillStyle = "#66ccff"
                ctx.fill()
            }

            // Рисуем линии между точками
            for (let i = 0; i < points.current.length; i++) {
                for (let j = i + 1; j < points.current.length; j++) {
                    const dx = points.current[i].x - points.current[j].x
                    const dy = points.current[i].y - points.current[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < MAX_DISTANCE) {
                        const opacity = 1 - dist / MAX_DISTANCE
                        ctx.beginPath()
                        ctx.moveTo(points.current[i].x, points.current[i].y)
                        ctx.lineTo(points.current[j].x, points.current[j].y)
                        ctx.strokeStyle = `rgba(102, 204, 255, ${opacity})`
                        ctx.stroke()
                    }
                }
            }

            // Соединение с мышкой
            // eslint-disable-next-line prefer-const
            for (let p of points.current) {
                const dx = p.x - mouse.current.x
                const dy = p.y - mouse.current.y
                const dist = Math.sqrt(dx * dx + dy * dy)

                if (dist < MAX_DISTANCE) {
                    ctx.beginPath()
                    ctx.moveTo(p.x, p.y)
                    ctx.lineTo(mouse.current.x, mouse.current.y)
                    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / MAX_DISTANCE})`
                    ctx.stroke()
                }
            }

            requestAnimationFrame(draw)
        }

        canvas.addEventListener("mousemove", (e) => {
            mouse.current.x = e.clientX
            mouse.current.y = e.clientY
        })

        draw()

        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
        />
    )
}
