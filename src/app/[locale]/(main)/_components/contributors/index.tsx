"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils/shadcn"
import ContributorsCard from "./card"
import Row from "./row"

export default function Contributors() {
    const { isArabic } = useLanguage()
    return (
        <section className="bg-muted text-foreground py-[8%] relative">
            <div
                className={cn(
                    "absolute bg-background/15 backdrop-blur top-0 left-0 w-full h-full z-20 flex items-center justify-center flex-col gap-2 text-center",
                )}
            >
                <span
                    className={cn(
                        "text-gradient clamp-[text,5xl,9xl] font-bold",
                        isArabic && "py-10",
                    )}
                >
                    <ClientTranslate translationKey="comingSoon" />
                </span>
                <p className="font-medium clamp-[text,2xl,3xl] max-w-4xl">
                    <ClientTranslate
                        className={cn(isArabic && "leading-13")}
                        translationKey="comingSoonDesc"
                    />
                </p>
            </div>

            <main className="max-w-7xl clamp-[px,5,10] mx-auto relative">
                <div className="mb-[7%] text-center">
                    <h2 className="clamp-[text,3xl,6xl] mb-6 font-medium">
                        <ClientTranslate translationKey="topContributors" />
                    </h2>
                    <p className="text-lg max-w-3xl mx-auto sm:text-black text-text-800">
                        <ClientTranslate translationKey="topContributorsDesc" />
                    </p>
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,_minmax(20rem,auto))] gap-4 xl:mb-20">
                    {[1, 2, 3].map((item, i) => {
                        return <ContributorsCard key={item} index={i} />
                    })}
                </div>

                <div className="hidden xl:grid gap-2">
                    {[1, 2].map((item, i) => {
                        return <Row key={item} index={i} />
                    })}
                </div>
            </main>
        </section>
    )
}
