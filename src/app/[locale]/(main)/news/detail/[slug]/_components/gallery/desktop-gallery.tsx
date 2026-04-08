import IconPlayerPlay from "@/assets/icons/player-play"
import ClientImg from "@/components/common/client-img"
import { useMediaViewerModal } from "@/components/common/media-viewer-modal/use-media-viewer-modal"
import { Button } from "@/components/ui/button"
import {
    MediaItem,
    useMediaViewerStore,
} from "@/hooks/store/use-media-viewer-store"
import { cn } from "@/lib/utils/shadcn"
import { useEffect, useState } from "react"

interface Props {
    items: MediaItem[]
}

export default function GalleryDesktop({ items }: Props) {
    const { openModal } = useMediaViewerModal()
    const { setMediaViewerState } = useMediaViewerStore()
    const [selectedItem, setSelectedItem] = useState<MediaItem | undefined>(
        items[0],
    )

    const handleClick = (startIndex: number) => {
        openModal()
        setMediaViewerState({
            media: items,
            startIndex,
        })
    }

    useEffect(() => {
        setSelectedItem(items[0])
    }, [items])
    return (
        <div className="hidden md:flex w-full flex-col gap-4">
            <div className="w-full relative rounded-2xl overflow-hidden h-[440px] cursor-pointer">
                <ClientImg
                    src={selectedItem?.src}
                    fill
                    alt={selectedItem?.alt || "Newsdetail image"}
                    wrapperProps={{
                        onClick: () =>
                            handleClick(
                                items.findIndex(
                                    (m) => m.id === selectedItem?.id,
                                ),
                            ),
                    }}
                >
                    {selectedItem?.video && (
                        <div className="z-10 absolute top-0 left-0 w-full h-full grid place-items-center">
                            <span className="grid place-items-center w-16 h-16 rounded-full bg-background/70">
                                <IconPlayerPlay className="w-8 h-8" />
                            </span>
                        </div>
                    )}
                </ClientImg>
            </div>

            <div className="grid grid-cols-5 gap-3 overflow-x-auto scrollbar-hide">
                {items.map((item) => {
                    const isActive = selectedItem?.id === item.id
                    return (
                        <Button
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className={cn(
                                "col-span-1 relative w-full h-[130px] bg-transparent flex-shrink-0 overflow-hidden rounded-xl border transition-all p-0",
                                isActive ?
                                    "opacity-100 border-blue-400"
                                :   "opacity-50 hover:opacity-80",
                            )}
                        >
                            <ClientImg
                                src={item.src}
                                alt={item.alt || "Thumbnail"}
                                wrapperClassName="aspect-video"
                                fill
                            >
                                {item.video && (
                                    <>
                                        <video
                                            src={item.src}
                                            className="object-cover w-full h-full"
                                            muted
                                        />
                                        <div className="z-10 absolute top-0 left-0 w-full h-full grid place-items-center">
                                            <span className="grid place-items-center w-10 h-10 rounded-full bg-background/70">
                                                <IconPlayerPlay className="w-5 h-5" />
                                            </span>
                                        </div>
                                    </>
                                )}
                            </ClientImg>
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}
