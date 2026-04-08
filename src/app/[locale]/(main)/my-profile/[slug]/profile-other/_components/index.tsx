"use client"
import Sidebar from "../../profile/_components/sidebar"
import Verification from "../../profile/_components/verification"
import { useOtherUserInfoQuery } from "../_hooks/use-other-user-info-query"

export default function ProfileIndex() {
    const { data } = useOtherUserInfoQuery()
    return (
        <div className="grid lg:grid-cols-6 gap-6">
            {data && <Sidebar data={data} />}

            <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
                {data && <Verification data={data} />}

                <div className="rounded-md bg-white shadow-[var(--card-shadow)] w-[100%]">
                    <section className="bg-muted text-foreground py-[8%] relative">
                        <div className="absolute bg-background/15 backdrop-blur top-0 left-0 w-full h-full z-20 flex items-center justify-center flex-col gap-2 text-center">
                            <span className="text-gradient clamp-[text,xs,lg] font-bold">
                                Coming Soon
                            </span>
                            <p className="font-medium clamp-[text,xs,lg] max-w-[216px] md:max-w-xl md:px-2">
                                “Top Contributors” leaderboard will be revealed
                                soon. We’re working to highlight the most
                                impactful global players.
                            </p>
                        </div>

                        <main className="home-container relative">
                            <div className="mb-[7%] text-center">
                                <h2 className="clamp-[text,xs,lg] mb-6 font-medium">
                                    Top Contributors Driving Global Impact
                                </h2>
                                <p className="text-xs mx-auto sm:text-black text-text-800">
                                    Recognizing the individuals and
                                    organizations making the most contributions
                                </p>
                            </div>
                        </main>
                    </section>
                </div>
            </div>
        </div>
    )
}
