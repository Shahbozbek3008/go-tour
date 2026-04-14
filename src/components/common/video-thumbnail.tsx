"use client"

import { cn } from "@/lib/utils/shadcn"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface Props {
    url: string
    wrapperClassname?: string
}

export default function VideoThumbnail({ url, wrapperClassname }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [thumbnail, setThumbnail] = useState<string | null>(null)

    useEffect(() => {
        const video = videoRef.current
        const canvas = canvasRef.current
        if (!video || !canvas) return

        const handleLoaded = () => {
            video.currentTime = 1 // кадр на 1-й секунде
        }

        const handleSeeked = () => {
            const ctx = canvas.getContext("2d")
            if (!ctx) return
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            setThumbnail(canvas.toDataURL("image/png"))
        }

        video.addEventListener("loadeddata", handleLoaded)
        video.addEventListener("seeked", handleSeeked)

        return () => {
            video.removeEventListener("loadeddata", handleLoaded)
            video.removeEventListener("seeked", handleSeeked)
        }
    }, [url])

    return (
        <div className={cn("", wrapperClassname)}>
            <video
                ref={videoRef}
                src={url}
                crossOrigin="anonymous"
                className="hidden"
            />
            <canvas ref={canvasRef} className="hidden" />
            {thumbnail ?
                <Image
                    src={thumbnail}
                    alt="thumbnail"
                    className="rounded-lg shadow"
                />
            :   <p>Generating thumbnail...</p>}
        </div>
    )
}
