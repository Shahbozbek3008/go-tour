import AvatarImageProfile from "@/components/common/avatar-image"
import { formatTime } from "@/lib/utils/format-date"
import { cn } from "@/lib/utils/shadcn"
import Image from "next/image"
import { UIMessage } from "../../../../_types/message"

interface MessageProps {
    item: UIMessage
    previousMessage?: UIMessage
}

const Message = ({ item, previousMessage }: MessageProps) => {
    const isMe = item?.me
    const showAvatar = !previousMessage || previousMessage?.me !== item?.me

    return (
        <div
            className={cn(
                "flex w-full",
                isMe ? "justify-end" : "justify-start",
            )}
        >
            {isMe ?
                <div className="flex flex-col gap-1 max-w-[60%]">
                    <div className="flex items-start gap-2">
                        <div className="flex flex-col gap-1">
                            {item?.text && (
                                <div className="max-w-full py-2 px-4 text-sm bg-primary text-white rounded-bl-md rounded-tl-md rounded-br-md">
                                    {item?.text}
                                </div>
                            )}
                            {item?.files && item?.files?.length > 0 && (
                                <Image
                                    className="w-80 h-auto object-contain rounded-2xl"
                                    src={item.files[0].file_url}
                                    alt={item?.files?.[0]?.id ?? "file"}
                                    width={400}
                                    height={200}
                                />
                            )}

                            <p className="text-xs text-right text-(--text-secondary) opacity-40">
                                {formatTime(item?.created_at)}
                            </p>
                        </div>

                        {showAvatar ?
                            <AvatarImageProfile
                                src={item?.user?.profile_image || ""}
                                first_name={item.user?.first_name}
                                last_name={item.user?.last_name || ""}
                            />
                        :   <span className="w-8 h-8" />}
                    </div>
                </div>
            :   <div className="flex items-start gap-2 max-w-[60%]">
                    {showAvatar ?
                        <AvatarImageProfile
                            src={item.user?.profile_image || ""}
                            first_name={item.user?.first_name}
                            last_name={item.user?.last_name || ""}
                        />
                    :   <span className="w-8 h-8" />}
                    <div className="flex flex-col gap-1">
                        {item?.text && (
                            <div className="bg-white text-(--text-secondary-70) text-sm py-2 px-4 rounded-bl-md rounded-tr-md rounded-br-md">
                                {item?.text}
                            </div>
                        )}

                        {item?.files && item?.files?.length > 0 && (
                            <Image
                                className="w-80 h-auto object-contain rounded-2xl"
                                src={item.files?.[0]?.file_url ?? ""}
                                alt={item?.files?.[0]?.id ?? "file"}
                                width={400}
                                height={200}
                            />
                        )}

                        <p className="text-xs text-left text-(--text-secondary) opacity-40">
                            {formatTime(item?.created_at)}
                        </p>
                    </div>
                </div>
            }
        </div>
    )
}

export default Message
