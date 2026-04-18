"use client"

import IconPlay from "@/assets/icons/play"
import IconX2 from "@/assets/icons/x-icon2"
import { useMediaViewerModal } from "@/components/common/media-viewer-modal/use-media-viewer-modal"
import ReactPlayer from "@/components/common/react-player"
import { Button } from "@/components/ui/button"
import {
    MediaItem,
    useMediaViewerStore,
} from "@/hooks/store/use-media-viewer-store"

interface Props {
    item: {
        value: string
        index?: number
    }
    files: string[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFiles: (...event: any[]) => void
}

export default function FileItem({ item, files, setFiles }: Props) {
    const { openModal } = useMediaViewerModal()
    const { setMediaViewerState } = useMediaViewerStore()
    const media: MediaItem[] = files.map((f) => {
        return {
            img: false,
            src: f,
            video: true,
        }
    })

    const handleClick = (startIndex: number) => {
        openModal()
        setMediaViewerState({
            media,
            startIndex,
        })
    }

    return (
        <div
            onClick={() => handleClick(item.index ?? 0)}
            className="aspect-square sm:aspect-video h-full bg-foreground rounded-xl grid place-items-center relative"
        >
            <ReactPlayer
                src={item.value}
                controls={false}
                muted
                // className="absolute top-0 left-0"
                width="100%"
                height="100%"
                className="!w-full !h-full rounded-xl object-cover"
            />
            <Button
                variant={"ghost"}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-background/80 absolute z-10"
            >
                <IconPlay />
            </Button>
            <Button
                onClick={(e) => {
                    e.stopPropagation()
                    setFiles(files.filter((fileStr) => fileStr !== item.value))
                }}
                variant={"ghost"}
                size={"icon"}
                className="absolute clamp-[right,1,2] clamp-[top,1,2] rounded-full bg-background w-6 h-6"
            >
                <IconX2 className="[&_path]:stroke-foreground clamp-[w,3,4.5] clamp-[h,3,4.5]" />
            </Button>
        </div>
    )
}
