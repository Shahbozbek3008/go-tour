"use client"

import { IconTrash } from "@/assets/icons/trash"
import IconX2 from "@/assets/icons/x-icon2"
import ClientImg from "@/components/common/client-img"
import { useMediaViewerModal } from "@/components/common/media-viewer-modal/use-media-viewer-modal"
import { Button } from "@/components/ui/button"
import * as Sortable from "@/components/ui/sortable"
import {
    MediaItem,
    useMediaViewerStore,
} from "@/hooks/store/use-media-viewer-store"
import { GripVerticalIcon } from "lucide-react"

interface SortableCardProps
    extends Omit<
        React.ComponentPropsWithoutRef<typeof Sortable.SortableItem>,
        "value"
    > {
    item: {
        value: string
        index?: number
    }
    files: string[]
    alt: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFiles: (...event: any[]) => void
}

export const SortableImgItem = ({
    item,
    files,
    alt,
    setFiles,
    ...props
}: SortableCardProps) => {
    const { openModal } = useMediaViewerModal()
    const { setMediaViewerState } = useMediaViewerStore()
    const media: MediaItem[] = files.map((f) => {
        return {
            img: true,
            src: f,
            video: false,
        }
    })

    const handleClick = (startIndex: number) => {
        openModal()
        setMediaViewerState({
            media,
            alt,
            startIndex,
        })
    }

    return (
        <Sortable.Item
            value={item.value}
            className="aspect-square hover:[&_.trash]:inline-flex"
            onClick={() => handleClick(item.index ?? 0)}
            {...props}
        >
            <ClientImg src={item.value} alt={alt || "image"}>
                {item.index === 0 && (
                    <div className="absolute bottom-0 left-0 text-tiny sm:text-sm bg-primary text-background font-medium rounded-tr-[6px] sm:rounded-tr-xl p-1 sm:px-5 sm:py-2">
                        Main
                    </div>
                )}
                {files.length > 1 && (
                    <Sortable.ItemHandle asChild>
                        <Button
                            variant="gradient2"
                            size="icon"
                            className="size-7 sm:size-8 absolute left-2 sm:left-auto sm:right-2 top-2"
                        >
                            <GripVerticalIcon className="h-4 w-4" />
                        </Button>
                    </Sortable.ItemHandle>
                )}
                <Button
                    onClick={(e) => {
                        e.stopPropagation()
                        setFiles(files.filter((f) => f !== item.value))
                    }}
                    variant={"ghost"}
                    className="trash z-10 hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/80"
                >
                    <IconTrash className="[&_path]:stroke-foreground" />
                </Button>
                <Button
                    onClick={(e) => {
                        e.stopPropagation()
                        setFiles(files.filter((f) => f !== item.value))
                    }}
                    variant="ghost"
                    className="
                        sm:hidden z-10 absolute right-1 top-1 rounded-full bg-white w-6 h-6
                    "
                >
                    <IconX2 className="[&_path]:stroke-foreground" />
                </Button>
            </ClientImg>
        </Sortable.Item>
    )
}
