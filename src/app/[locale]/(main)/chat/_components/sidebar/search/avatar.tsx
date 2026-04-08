"use client"

import AvatarImageProfile from "@/components/common/avatar-image"
import Group from "@/components/semantic/group"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { useToggleStore } from "../../../_store/use-toggle-store"

export default function Avatar() {
    const { data } = useProfileQuery()
    const { setProfileOpen } = useToggleStore()

    return (
        <div className="w-20 grid place-items-center">
            <Group
                className="relative cursor-pointer"
                onClick={() => setProfileOpen(true)}
            >
                <AvatarImageProfile
                    src={data?.profile_image}
                    first_name={data?.first_name}
                    last_name={data?.last_name}
                    wrapperClassName="w-10 h-10"
                />
                {data?.chat_status === "online" && (
                    <span className="absolute bottom-0 z-10 right-0 w-3 h-3 rounded-full bg-(--success-main) border-2 border-white" />
                )}
            </Group>
        </div>
    )
}
