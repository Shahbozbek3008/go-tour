"use client"

import AvatarImageProfile from "@/components/common/avatar-image"
import { ProfileInfo } from "@/types/common/profile"

interface Props {
    data: ProfileInfo | undefined
}

export default function ProfileImage({ data }: Props) {
    return (
        <div className="p-4 sm:p-6 pt-0 -mt-12 xsm:-mt-14 md:-mt-8">
            <AvatarImageProfile
                src={data?.profile_image}
                first_name={data?.first_name}
                last_name={data?.last_name}
                wrapperClassName="w-30 h-30 ring-white ring-4 md:ring-6"
                fallbackClassName="text-2xl text-foreground uppercase"
            />
        </div>
    )
}
