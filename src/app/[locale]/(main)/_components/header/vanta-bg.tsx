"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import NET from "vanta/dist/vanta.net.min"

const VantaBg = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [vantaEffect, setVantaEffect] = useState<any>(null)
    const myRef = useRef(null)
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                NET({
                    el: myRef.current,
                    THREE,
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
                    maxDistance: 30.0,
                    spacing: 30,
                    showDots: true,
                }),
            )
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])
    return <div ref={myRef} className="absolute inset-0 w-full h-full"></div>
}

export default VantaBg
