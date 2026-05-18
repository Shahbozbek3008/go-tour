import { Play } from "lucide-react"
import { useCallback, useRef, useState } from "react"

interface VideoThumbnailProps {
    src: string
    onClick: () => void
    className?: string
    sizes?: string
    priority?: boolean
}

export const VideoThumbnail = ({
    src,
    onClick,
    className,
}: VideoThumbnailProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [posterReady, setPosterReady] = useState(false)

    const capturePoster = useCallback(() => {
        const video = videoRef.current
        if (!video || posterReady) return
        video.currentTime = 1
    }, [posterReady])

    const handleLoadedData = useCallback(() => {
        const video = videoRef.current
        if (!video || posterReady) return
        try {
            const canvas = document.createElement("canvas")
            canvas.width = video.videoWidth || 640
            canvas.height = video.videoHeight || 360
            const ctx = canvas.getContext("2d")
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
                const dataUrl = canvas.toDataURL("image/jpeg", 0.7)
                setPosterReady(true)
                if (videoRef.current) {
                    videoRef.current.poster = dataUrl
                }
            }
        } catch {
            setPosterReady(true)
        }
    }, [posterReady])

    return (
        <div
            onClick={onClick}
            className={className}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onClick()}
        >
            <video
                ref={videoRef}
                src={src}
                className="hidden"
                preload="metadata"
                onLoadedMetadata={capturePoster}
                onLoadedData={handleLoadedData}
                muted
                playsInline
            />

            {/* Actual thumbnail display */}
            <div className="relative w-full h-full">
                {/* Fallback gradient background while poster loads */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />

                {/* Video element with poster for display */}
                <video
                    src={src}
                    poster={posterReady ? undefined : undefined}
                    className="absolute inset-0 w-full h-full object-cover"
                    preload="metadata"
                    muted
                    playsInline
                    disablePictureInPicture
                    disableRemotePlayback
                />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                        {/* Ripple effect background */}
                        <div className="absolute inset-0 bg-black/30 rounded-full blur-xl scale-150" />
                        {/* Play button */}
                        <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm shadow-2xl transition-transform duration-300 hover:scale-110 group-hover:scale-110">
                            <Play className="w-5 h-5 text-slate-900 fill-slate-900 ml-1" />
                        </div>
                    </div>
                </div>

                {/* Duration badge (optional enhancement) */}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-md text-[11px] font-medium text-white/90">
                    VIDEO
                </div>
            </div>
        </div>
    )
}
