"use client"
import Player from "react-player"
import { ReactPlayerProps } from "react-player/types"

export default function ReactPlayer({ style, ...props }: ReactPlayerProps) {
    return (
        <Player
            className="bg-foreground"
            style={{
                width: "100%",
                height: "100%",
                aspectRatio: "16/9",
                borderRadius: 16,
                ...style,
            }}
            playing={false}
            controls
            {...props}
        />
    )
}
