"use client"

import { useSlug } from "@/app/_providers/slug-provider"
import { IconBriefcase } from "@/assets/icons/briefcase"
import { IconCalendar } from "@/assets/icons/calendar"
import { IconLocation } from "@/assets/icons/location"
import ClientTranslate from "@/components/common/translation/client-translate"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { formatDate } from "@/lib/utils/format-date"
import { cn } from "@/lib/utils/shadcn"
import { useOtherUserInfoQuery } from "../profile-other/_hooks/use-other-user-info-query"
import IsMeButtons from "./buttons/isme-buttons"
import OtherUserProfileButtons from "./buttons/other-user-profile-buttons"
import VerifiedButton from "./buttons/verified-button"
import BannerImage from "./images/banner-image"
import ProfileImage from "./images/profile-image"

export default function Header() {
    const slug = useSlug()
    const isMe = slug === "me"

    const { data: profileData } = useProfileQuery()
    const { data: otherData } = useOtherUserInfoQuery({
        options: {
            enabled: !isMe,
        },
    })
    const data = isMe ? profileData : otherData

    return (
        <div className="flex flex-col clamp-[mt,0,4] rounded-md bg-background md:shadow-[var(--card-shadow)]">
            <BannerImage data={data} />
            <div className="flex clamp-[p,0,6] md:flex-row flex-col">
                <ProfileImage data={data} />
                <div className="flex flex-col gap-4 w-full md:mt-6">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <h3 className="text-2xl">
                                {data?.first_name} {data?.last_name}
                            </h3>
                        </div>
                        <VerifiedButton
                            isMe={isMe}
                            profileData={profileData}
                            otherData={otherData}
                        />
                    </div>

                    <div className="flex flex-col xl:flex-row xl:items-center w-full justify-between gap-6">
                        <div className="flex sm:flex-row flex-col sm:items-center gap-6">
                            <div
                                className={cn(
                                    "hidden items-center gap-2",
                                    data?.job_title && "flex",
                                )}
                            >
                                <IconBriefcase />
                                <p className="text-sm text-gray-500">
                                    {data?.job_title}
                                </p>
                            </div>
                            <div
                                className={cn(
                                    "hidden items-center gap-2",
                                    data?.address && "flex",
                                )}
                            >
                                <IconLocation width={19} height={19} />
                                <p className="text-sm text-gray-500">
                                    {data?.address}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <IconCalendar />
                                <p className="text-sm text-gray-500">
                                    <ClientTranslate translationKey="joined" />{" "}
                                    {formatDate(data?.joined_at)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {isMe ?
                                <IsMeButtons />
                            :   <OtherUserProfileButtons data={data} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
