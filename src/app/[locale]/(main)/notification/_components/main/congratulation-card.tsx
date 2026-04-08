"use client"

import { IconGift } from "@/assets/icons/gift"
import logo from "@/assets/images/white-logo-without-text.png"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import Image from "next/image"

export default function CongratulationCard() {
    return (
        <BackgroundGradient
            animate
            className="rounded-lg px-4 py-5"
            containerClassName="p-0.5 rounded-lg"
            motion1ClassName="blur rounded-lg"
            motion2ClassName="rounded-lg"
        >
            <div className="flex justify-between gap-3 relative transition-all text-background">
                <hgroup className="flex items-center clamp-[gap,3,8]">
                    <div className="flex items-center gap-3">
                        <span className="hidden md:block w-2 h-2 rounded-full bg-background/50" />
                        <span className="w-14 h-14 rounded-full bg-background grid place-items-center relative">
                            <span className="text-3xl">🥳</span>
                            <span className="hidden md:grid w-6 h-6 p-0.5 rounded-full gradient-2 absolute top-0 -right-2 place-items-center">
                                <span className="w-full h-full bg-background rounded-full grid place-items-center">
                                    <IconGift />
                                </span>
                            </span>
                        </span>
                    </div>
                    <div>
                        <h4 className="clamp-[text,base,lg] font-semibold mb-0.5">
                            Happy Birthday! Mr. Jon Doe
                        </h4>
                        <p className="clamp-[text,xs,sm] line-clamp-2 text-text-100 mb-3.5">
                            Temporary technical maintenance or a new app version
                            is now ready
                        </p>
                        <hgroup className="flex items-center gap-2">
                            <Image src={logo} alt="logo" className="w-5 h-5" />
                            <span className="text-xs font-semibold">
                                iNexLynk Team
                            </span>
                        </hgroup>
                    </div>
                </hgroup>

                <hgroup className="flex items-end flex-col justify-between gap-4">
                    <p className="text-text-100 text-sm font-medium whitespace-nowrap">
                        14h
                    </p>
                </hgroup>
            </div>
        </BackgroundGradient>
    )
}
