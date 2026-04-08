"use client"

import ClientImg from "@/components/common/client-img"
import { ProfileInfo } from "@/types/common/profile"

interface Props {
    data: ProfileInfo | undefined
}

export default function BannerImage({ data }: Props) {
    return (
        <div className="relative w-full clamp-[h,28,56] overflow-hidden rounded-t-md">
            <ClientImg
                src={data?.banner_image}
                priority
                fallbackUrl={
                    "https://api-inextlynk.upgrow.uz/media/files_and_images/Image.svg"
                }
                alt="profile"
                wrapperClassName="object-cover"
            />
        </div>
    )
}
