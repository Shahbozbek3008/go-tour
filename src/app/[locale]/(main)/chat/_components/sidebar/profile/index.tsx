"use client"

import { IconClose } from "@/assets/icons/close"
import AvatarImageProfile from "@/components/common/avatar-image"
import ClientTranslate from "@/components/common/translation/client-translate"
import { TranslationKey } from "@/components/common/translation/types"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { cn } from "@/lib/utils/shadcn"
import { useToggleStore } from "../../../_store/use-toggle-store"

type StatusType = {
    id: string
    value: string
    label: TranslationKey
}

const STATUS: StatusType[] = [
    { id: "r1", value: "online", label: "online" },
    { id: "r2", value: "away", label: "away" },
    { id: "r3", value: "do_not_disturb", label: "doNotDistrub" },
    { id: "r4", value: "offline", label: "offline" },
]

export default function ProfileMe() {
    const { data } = useProfileQuery()
    const { setProfileOpen } = useToggleStore()

    const onClose = () => setProfileOpen(false)

    return (
        <div className="flex flex-col h-full w-[300px] sm:w-[350px] relative bg-white shadow-md">
            <Button
                size="icon"
                variant="ghost"
                className="hover:bg-transparent absolute right-2 top-2"
                onClick={onClose}
            >
                <IconClose className="w-6 h-6" stroke="var(--text-secondary)" />
            </Button>
            <div className="flex flex-col items-center p-6 mt-6  shrink-0">
                <div className="relative">
                    <AvatarImageProfile
                        src={data?.profile_image}
                        first_name={data?.first_name}
                        last_name={data?.last_name}
                        wrapperClassName="w-21 h-21"
                    />
                    <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-(--success-main) border-2 border-white" />
                </div>
                <h2 className="mt-4 text-xl font-semibold">
                    {data?.first_name}
                </h2>
                <p className="text-sm text-gray-500">
                    {data?.job_title ?? "-"}
                </p>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="px-6 py-4 text-center">
                    <h3 className="text-sm uppercase text-(--text-secondary) opacity-40 mb-1">
                        <ClientTranslate translationKey="about" />
                    </h3>
                    <div className="border p-3 rounded">
                        <p className="text-sm text-(--text-secondary) opacity-90">
                            {data?.about ?? "-"}
                        </p>
                    </div>
                </div>
                <div className="px-6 py-4">
                    <h3 className="text-sm text-center uppercase text-(--text-secondary) opacity-40 mb-2">
                        <ClientTranslate translationKey="status" />
                    </h3>
                    <RadioGroup defaultValue={data?.chat_status}>
                        {STATUS.map((status) => (
                            <div
                                key={status.id}
                                className="flex items-center gap-3"
                            >
                                <RadioGroupItem
                                    id={status.id}
                                    value={status.value}
                                    className={cn(
                                        "data-[state=checked]:border-(--success-main) data-[state=checked]:bg-(--success-main)",
                                        "data-[state=checked]:[&>span>svg]:fill-white data-[state=checked]:[&>span>svg]:stroke-white",
                                    )}
                                />
                                <label htmlFor={status.id} className="text-sm">
                                    <ClientTranslate
                                        translationKey={status.label}
                                    />
                                </label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            </div>
        </div>
    )
}
