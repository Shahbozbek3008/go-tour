"use client"

import { useProfileBusinessQuery } from "@/app/[locale]/(main)/(profile-settings)/account/business/use-profile-business-query"
import { useSlug } from "@/app/_providers/slug-provider"
import ClientTranslate from "@/components/common/translation/client-translate"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import Sidebar from "./sidebar"
import Verification from "./verification"

const ProfileIndex = () => {
    const slug = useSlug()
    const isMe = slug === "me"
    const { data } = useProfileQuery()
    const { data: businessData } = useProfileBusinessQuery({
        options: { enabled: isMe },
    })

    return (
        <div className="grid lg:grid-cols-6 gap-6">
            {data && <Sidebar data={data} businessData={businessData} />}

            <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
                {data && <Verification data={data} />}

                <div className="rounded-md bg-white shadow-[var(--card-shadow)] w-[100%]">
                    <section className="bg-muted text-foreground py-[8%] relative">
                        <div className="absolute bg-background/15 backdrop-blur top-0 left-0 w-full h-full z-20 flex items-center justify-center flex-col gap-2 text-center">
                            <span className="text-gradient clamp-[text,xs,lg] font-bold">
                                <ClientTranslate translationKey="comingSoon" />
                            </span>
                            <p className="font-medium clamp-[text,xs,lg] max-w-[216px] md:max-w-xl md:px-2">
                                <ClientTranslate translationKey="comingSoonDesc" />
                            </p>
                        </div>

                        <main className="home-container relative">
                            <div className="mb-[7%] text-center">
                                <h2 className="clamp-[text,xs,lg] mb-6 font-medium">
                                    <ClientTranslate translationKey="topContributors" />
                                </h2>
                                <p className="text-xs mx-auto sm:text-black text-text-800">
                                    <ClientTranslate translationKey="topContributorsDesc" />
                                </p>
                            </div>
                        </main>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default ProfileIndex
