"use client"

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils/shadcn"
import parse from "html-react-parser"
import { useEffect } from "react"
import { useMessengerFolderIconsQuery } from "../../../../_hooks/use-messenger-folder-icons-query"
import { FolderIcon } from "../../../../_types/folder"
import { useCreateFolderForm } from "../_hooks/use-create-folder-form"

export default function SelectIcon() {
    const methods = useCreateFolderForm()
    const { setValue, watchIcon } = methods
    const { iconsList } = useMessengerFolderIconsQuery()
    const selectedIcon = iconsList.find((i) => i.id === watchIcon)

    useEffect(() => {
        if (iconsList.length && !watchIcon) {
            setValue("icon", iconsList[0]?.id)
        }
    }, [iconsList, setValue, watchIcon])

    function handleSelect(icon: FolderIcon) {
        setValue("icon", icon.id)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    className={cn(
                        "absolute z-10 right-1 top-1/2 -translate-y-1/2",
                        "w-8 h-8 [&>svg]:w-5 [&>svg]:h-5 flex items-center justify-center",
                        "rounded-md hover:bg-muted transition",
                    )}
                >
                    {selectedIcon &&
                        parse(
                            selectedIcon.icon_url.replace(
                                /fill=".*?"/g,
                                'fill="#BBB"',
                            ),
                        )}
                </Button>
            </PopoverTrigger>

            <PopoverContent
                className={cn("w-fit p-2 rounded-xl", "bg-[#E5EAF8]")}
                align="end"
                side="bottom"
            >
                <div className="grid grid-cols-4 gap-2">
                    {iconsList?.map((icon: FolderIcon) => {
                        const isSelected = icon.id === selectedIcon?.id
                        return (
                            <Button
                                key={icon.id}
                                onClick={() => {
                                    handleSelect(icon)
                                }}
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    "w-8 h-8 [&>svg]:w-5 [&>svg]:h-5 flex items-center justify-center rounded-md transition",
                                    isSelected ?
                                        "bg-primary-8-lighter text-primary"
                                    :   "text-muted-foreground hover:bg-primary-8-lighter",
                                )}
                            >
                                {parse(
                                    icon.icon_url.replace(
                                        /fill=".*?"/g,
                                        'fill="#BBB"',
                                    ),
                                )}
                            </Button>
                        )
                    })}
                </div>
            </PopoverContent>
        </Popover>
    )
}
