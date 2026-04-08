"use client"

import { IconArrowRight } from "@/assets/icons/arrow-right"
import logoIcon from "@/assets/images/logo-without-text.png"
import { useAi } from "@/components/common/ai-chat/_hooks/use-ai"
import ClientTranslate from "@/components/common/translation/client-translate"
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card"
import { BorderTrail } from "@/components/motion-primitives/border-trail"
import { TextLoop } from "@/components/motion-primitives/text-loop"
import { Button } from "@/components/ui/button"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { useLanguage } from "@/hooks/use-language"
import { useRouter } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Content() {
    const t = useTranslations()
    const { isArabic } = useLanguage()
    const router = useRouter()
    const links = [
        {
            linkName: t("startPosting"),
            href: getHref({ pathname: "/[locale]/investment" }),
            description: t("homeDesc1"),
        },
        {
            linkName: t("startGlobal"),
            href: getHref({ pathname: "/[locale]/marketplace" }),
            description: t("homeDesc2"),
        },
        {
            linkName: t("joinTheCause"),
            href: getHref({ pathname: "/[locale]/outreach-hub" }),
            description: t("homeDesc3"),
        },
    ]
    const { openAiModal } = useAi()

    const handleAiClick = () => {
        openAiModal("home")
    }

    return (
        <div
            id="header"
            className={cn(
                "relative z-10 home-container flex flex-col justify-between max-lg:justify-center h-full gap-10 clamp-[py,5,13]",
            )}
        >
            <div />
            <main className="max-w-4xl">
                <h1 className="clamp-[text,4xl,7xl] font-medium mb-5 text-center sm:text-left">
                    <ClientTranslate translationKey="homeTitle" />
                </h1>

                <TextLoop
                    interval={6}
                    className="whitespace-normal clamp-[text,base,2xl]"
                >
                    {links.map((l, i) => {
                        return (
                            <span key={i}>
                                <TextGenerateEffect
                                    words={l.description}
                                    className="mb-9 text-background font-normal text-center sm:text-left"
                                />

                                {/* <Link href={l.href} /> */}
                                <Button
                                    variant={"gradient"}
                                    onClick={() => {
                                        router.push(l.href)
                                    }}
                                    className="flex w-full xsm:w-auto items-center gap-2.5"
                                >
                                    {l.linkName}
                                    {isArabic ?
                                        <IconArrowRight className="rotate-180" />
                                    :   <IconArrowRight />}
                                </Button>
                            </span>
                        )
                    })}
                </TextLoop>
            </main>

            {/* <div className="absolute bottom-13 left-1/2 -translate-x-1/2">
                    <GlowEffect
                    colors={["#FF5733", "#33FF57", "#3357FF", "#F1C40F"]}
                    mode="colorShift"
                    blur="soft"
                    duration={3}
                    scale={0.9}
                    />
                    <button className="relative inline-flex items-center gap-1 rounded-md bg-black/50 px-2.5 py-1.5 text-sm text-zinc-50 outline outline-[#fff2f21f]">
                    Explore <IconArrowRight className="h4 w-4" />
                    </button>
                    </div> */}

            <div></div>

            <NeonGradientCard
                onClick={handleAiClick}
                wrapperClassName="hidden md:block cursor-pointer max-w-xl self-center size-auto w-full absolute bottom-5 left-1/2 -translate-x-1/2"
                className="h-14 after:h-15 before:h-15 max-w-xl p-3 bg-black/70 flex items-center"
            >
                <BorderTrail
                    className="blur-lg bg-yellow-200 aspect-video"
                    size={100}
                    transition={{
                        repeat: Infinity,
                        duration: 10,
                        ease: "linear",
                    }}
                />
                <Image src={logoIcon} alt="logo icon" className="w-9" />
                <p className="w-full text-center clamp-[text,sm,lg] font-medium text-muted-foreground">
                    <ClientTranslate translationKey="lookingForSomething" />
                </p>
            </NeonGradientCard>

            {/* <Button className="relative">
                    <BorderTrail
                    className="blur-lg bg-yellow-200 aspect-video"
                    size={100}
                    transition={{
                        repeat: Infinity,
                        duration: 10,
                        ease: "linear",
                        }}
                        />
                        <Image src={logoIcon} alt="logo icon" className="w-9" />
                        <p className="w-full text-center text-lg font-medium text-muted-foreground">
                        Looking for something? Ask iNexLynk AI
                        </p>
                        </Button> */}
        </div>
    )
}
