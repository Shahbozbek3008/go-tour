import { IconDelete } from "@/assets/icons/chat/delete"
import { Button } from "@/components/ui/button"
import * as Sortable from "@/components/ui/sortable"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { API } from "@/lib/constants/api-endpoints"
import { cn } from "@/lib/utils/shadcn"
import parse from "html-react-parser"
import {
    type Dispatch,
    FC,
    MouseEventHandler,
    type SetStateAction,
} from "react"
import { type MessengerFolder } from "../../../../../_types/folder"

interface Props {
    folder: MessengerFolder
    setFolders: Dispatch<SetStateAction<MessengerFolder[]>>
}

export const FolderItem: FC<Props> = ({ folder, setFolders }) => {
    const { remove, isPending } = useRequest()
    const { invalidateByExactMatch } = useRevalidate()

    const handleRemove: MouseEventHandler<HTMLButtonElement> = (e) => {
        console.log("click")
        e.preventDefault()
        e.stopPropagation()
        remove(
            API.CHAT.MESSENGER_SLUG_FOLDER.replace("{slug}", folder?.id),
            null,
            {
                onSuccess: () => {
                    setFolders((prev) =>
                        prev.filter((v) => v.id !== folder?.id),
                    )
                    invalidateByExactMatch([API.CHAT.MESSENGER_FOLDERS])
                },
            },
        )
    }

    return (
        <Sortable.Item
            value={folder.id}
            className="flex items-center justify-between rounded-md bg-(--primary-8-lighter) p-4 transition-opacity relative"
        >
            <Sortable.ItemHandle className="w-full">
                <div className="flex items-center gap-4 w-full">
                    <div className={cn("w-6 h-6")}>
                        {parse(
                            folder?.icon_url?.replace(
                                /fill=".*?"/g,
                                'fill="#808390"',
                            ),
                        )}
                    </div>
                    <p className="text-sm text-(--text-secondary) opacity-90">
                        {folder?.name}
                    </p>
                </div>
            </Sortable.ItemHandle>
            <Button
                size="icon"
                variant="ghost"
                isLoading={isPending}
                onClick={handleRemove}
                className="absolute right-4 top-1/2 -translate-y-1/2"
            >
                <IconDelete />
            </Button>
        </Sortable.Item>
    )
}
