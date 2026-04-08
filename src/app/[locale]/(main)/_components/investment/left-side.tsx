"use client"

import IconAnnouncementMegaphone from "@/assets/icons/announcement-megaphone-icon"
import IconHandShakeWithCheck from "@/assets/icons/hand-shake-with-check-icon"
import ClientTranslate from "@/components/common/translation/client-translate"
import GradientText from "@/components/ui/gradient-text"
import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils/shadcn"

export default function LeftSide() {
    const { isArabic } = useLanguage()
    return (
        <div className="w-full lg:w-1/2 relative z-10">
            <h2 className="clamp-[text,3xl,5xl] font-medium">
                <ClientTranslate translationKey="discover" />{" "}
                <GradientText
                    className="inline"
                    style={{
                        backgroundImage: `linear-gradient(to right, #D500F9 0%, #00BCE6 10%)`,
                    }}
                >
                    <ClientTranslate
                        className={cn(isArabic && "leading-14")}
                        translationKey="realInvestment"
                    />
                </GradientText>
            </h2>
            <h2 className="clamp-[text,3xl,5xl] font-medium">
                <ClientTranslate translationKey="opportunitiesIn" />{" "}
                <GradientText
                    className="inline"
                    style={{
                        backgroundImage: `linear-gradient(20deg, #D500F9 0%, #00BCE6 20%)`,
                    }}
                >
                    <ClientTranslate
                        className={cn(isArabic && "leading-14")}
                        translationKey="realTime"
                    />
                </GradientText>
            </h2>
            <p className="clamp-[text,base,lg] font-medium mt-6 mb-10">
                <ClientTranslate translationKey="homeInvestmentDesc" />
            </p>

            <article className="lg:flex gap-6 hidden max-md:flex">
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
        </div>
    )
}
