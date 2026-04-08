"use client"

import IconAnnouncementMegaphone from "@/assets/icons/announcement-megaphone-icon"
import IconHandShakeWithCheck from "@/assets/icons/hand-shake-with-check-icon"
import bgImage from "@/assets/images/blur.png"
import ClientTranslate from "@/components/common/translation/client-translate"
import Image from "next/image"
import CardItem from "./card-item"

export default function Card() {
    return (
        <div className="relative flex flex-col">
            <article className="hidden max-md:hidden max-lg:flex gap-6 mb-6">
                <div className="flex flex-col gap-4 flex-1 min-w-0">
                    <IconAnnouncementMegaphone />
                    <h3 className="font-bold clamp-[text,base,xl]">
                        <ClientTranslate translationKey="smartMatching" />
                    </h3>
                    <p className="clamp-[text,xs,base] break-words">
                        <ClientTranslate translationKey="smartMatchingDesc" />
                    </p>
                </div>
                <div className="flex flex-col gap-4 flex-1 min-w-0">
                    <IconHandShakeWithCheck />
                    <h3 className="font-bold clamp-[text,base,xl]">
                        <ClientTranslate translationKey="structuredDeal" />
                    </h3>
                    <p className="clamp-[text,xs,base] break-words">
                        <ClientTranslate translationKey="structuredDealDesc" />
                    </p>
                </div>
            </article>

            <article className="relative">
                <CardItem />
                <Image
                    src={bgImage}
                    alt="Background"
                    className="object-cover absolute -top-[10%] right-0 scale-110"
                />
            </article>
        </div>
    )
}
