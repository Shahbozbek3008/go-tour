"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { useAllDestinationsQuery } from "@/hooks/react-query/use-all-destinations-query"
import { useLanguage } from "@/hooks/use-language"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useRouter } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const VISIBLE_COUNT = 12

export function ProfileHeader() {
    const { isRussian } = useLanguage()
    const router = useRouter()
    const { allDestinations } = useAllDestinationsQuery({
        params: {
            pageType: "PROFILE",
        },
    })
    const [active, setActive] = useState<number | null>(null)
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const visible = allDestinations?.slice(0, VISIBLE_COUNT)

    const handleSelect = (id: number) => {
        router.push(
            getHref({
                pathname: "/[locale]/catalog",
                query: {
                    destinations: [id],
                },
            }),
        )
        setOpen(false)
    }

    const renderGrid = () => (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-4">
            {allDestinations?.map((dest) => (
                <button
                    key={dest.id}
                    onClick={() => handleSelect(dest.id)}
                    className={cn(
                        "flex items-center justify-center p-3 rounded-xl text-sm font-medium transition-all duration-200 border cursor-pointer",
                        active === dest.id ?
                            "border-gray-900 bg-gray-900 text-white shadow-md"
                        :   "border-gray-200 bg-white text-gray-700 hover:border-gray-900 hover:bg-gray-50",
                    )}
                >
                    <span className="truncate">
                        {isRussian ? dest?.nameRu : dest?.nameUz}
                    </span>
                </button>
            ))}
        </div>
    )

    return (
        <div className="home-container mt-2">
            <div className="flex items-center gap-2 md:gap-4 py-1.5 md:py-1">
                <div className="flex items-center gap-4 md:gap-8 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-1 min-w-0">
                    {visible?.map((dest) => (
                        <button
                            key={dest.id}
                            onClick={() => {
                                setActive(active === dest?.id ? null : dest?.id)
                                handleSelect(dest.id)
                            }}
                            className={cn(
                                "relative flex items-center gap-1.5 py-2 rounded-lg text-[13px] md:text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 cursor-pointer",
                                "after:content-[''] after:absolute after:bottom-0",
                                "after:left-2 after:right-2 after:h-[2px]",
                                "after:bg-gray-800 after:rounded-full",
                                "after:scale-x-0 after:transition-transform after:duration-200 after:origin-left",
                                "hover:after:scale-x-100",
                                "text-gray-500 hover:text-gray-900",
                            )}
                        >
                            <span>
                                {isRussian ? dest?.nameRu : dest?.nameUz}
                            </span>
                        </button>
                    ))}
                </div>

                {allDestinations && allDestinations.length > VISIBLE_COUNT && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-1 px-3 py-2 h-auto text-sm font-semibold text-gray-500 hover:text-gray-800 rounded-lg shrink-0 whitespace-nowrap cursor-pointer"
                    >
                        <ClientTranslate translationKey="more" />
                        <ChevronDown className="w-3.5 h-3.5" />
                    </Button>
                )}
            </div>

            {isDesktop ?
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="max-w-4xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl">
                                <ClientTranslate translationKey="destinations" />
                            </DialogTitle>
                        </DialogHeader>
                        {renderGrid()}
                    </DialogContent>
                </Dialog>
            :   <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerContent className="max-h-[85vh]">
                        <DrawerHeader className="text-left border-b pb-4">
                            <DrawerTitle className="text-xl">
                                <ClientTranslate translationKey="destinations" />
                            </DrawerTitle>
                        </DrawerHeader>
                        <div className="px-4 pb-5">{renderGrid()}</div>
                    </DrawerContent>
                </Drawer>
            }
        </div>
    )
}
