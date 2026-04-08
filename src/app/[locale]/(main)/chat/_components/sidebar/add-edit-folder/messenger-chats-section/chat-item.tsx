"use client"

import AvatarImageProfile from "@/components/common/avatar-image"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils/shadcn"
import { CheckedState } from "@radix-ui/react-checkbox"
import { MessengerChat } from "../../../../_types/chat"
import { formatUser } from "../../../../_utils/chat"
import { useCreateFolderForm } from "../_hooks/use-create-folder-form"

interface Props {
    item: MessengerChat
}

export default function ChatItem({ item }: Props) {
    const { locale } = useLanguage()
    const { other, displayName, jobTitle } = formatUser(item, locale)
    const methods = useCreateFolderForm()
    const { setValue, watchChats } = methods
    const isChecked = watchChats.includes(item.id)

    function handleOnCheckedChange(checked: CheckedState) {
        setValue(
            "with_chats",
            checked ?
                [...watchChats, item.id]
            :   watchChats.filter((id) => id !== item.id),
        )
    }

    return (
        <label
            className={cn(
                "cursor-pointer flex items-center justify-between rounded-md p-3 transition-colors",
                isChecked ? "bg-(--primary-8-lighter)" : "hover:bg-gray-50",
            )}
        >
            <div className="flex items-center gap-4 overflow-hidden">
                <div className="relative flex-shrink-0">
                    <AvatarImageProfile
                        src={other?.profile_image}
                        first_name={other?.first_name}
                        last_name={other?.last_name}
                    />
                </div>
                <div className="flex flex-col overflow-hidden">
                    <p className="text-sm whitespace-nowrap max-w-40 truncate">
                        {displayName}
                    </p>
                    <p className="text-xs text-(--text-secondary) opacity-70 whitespace-nowrap max-w-40 truncate">
                        {jobTitle}
                    </p>
                </div>
            </div>
            <Checkbox
                checked={isChecked}
                className="w-5 h-5"
                onCheckedChange={handleOnCheckedChange}
            />
        </label>
    )
}
