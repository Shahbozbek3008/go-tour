"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import Image from "next/image"

const HEADER_IMAGE =
    "https://uzbekistan.travel/storage/app/media/uploaded-files/samarkand-uzbekistan-kupol-mechet-ploshchad.png"

export const AgentsHeader = () => {
    return (
        <header className="relative w-full h-[280px] sm:h-[340px] md:h-[360px] lg:h-[450px] overflow-hidden">
            <Image
                src={HEADER_IMAGE}
                alt="Agents header"
                fill
                priority
                unoptimized
                sizes="100vw"
                className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />

            <div className="home-container">
                <div className="absolute top-[50%]  translate-y-[-25%] flex flex-col justify-end  pb-10 sm:pb-12">
                    <h1 className="text-white font-extrabold text-2xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight mb-4">
                        <ClientTranslate translationKey="agents_header_title" />
                    </h1>
                    <p className="text-white/65 text-sm sm:text-base leading-relaxed max-w-md">
                        <ClientTranslate translationKey="agents_header_description" />
                    </p>
                </div>
            </div>
        </header>
    )
}
