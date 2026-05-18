"use client"

import { useEffect, useState } from "react"

export function useKeyboardAware() {
    const [keyboardHeight, setKeyboardHeight] = useState(0)

    useEffect(() => {
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
        if (isIOS) return

        const vv = window.visualViewport
        if (!vv) return

        const handler = () => {
            const offset = window.innerHeight - vv.height - vv.offsetTop
            setKeyboardHeight(Math.max(0, offset))
        }

        vv.addEventListener("resize", handler)
        vv.addEventListener("scroll", handler)
        handler()

        return () => {
            vv.removeEventListener("resize", handler)
            vv.removeEventListener("scroll", handler)
        }
    }, [])

    return keyboardHeight
}
