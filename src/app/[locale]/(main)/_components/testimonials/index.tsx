"use client"
import IconArrowUpRight from "@/assets/icons/arrow-up-right-icon"
import mapImg from "@/assets/images/home/Map.png"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { useLanguage } from "@/hooks/use-language"
import { useRouter } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import Image from "next/image"
import Cards from "./cards"

export default function Testimonials() {
    const { isArabic } = useLanguage()
    const router = useRouter()
    const { isAuthenticated } = useProfileQuery()
    return (
        <div className="bg-muted relative">
            <section
                className="relative"
                style={{
                    background:
                        "linear-gradient(115.34deg, #171517 2.01%, #3C1F8B 79.49%)",
                }}
            >
                <Image
                    src={mapImg}
                    alt="world map"
                    className="absolute lg:object-cover object-fill top-0 left-1/2 -translate-x-1/2 h-full"
                />

                <main className="max-w-7xl clamp-[px,5,10] mx-auto w-full relative z-10 lg:flex lg:justify-between items-center gap-[5%]">
                    <div className="lg:max-w-xl text-center lg:text-start py-[6%] flex flex-col gap-6">
                        <h2 className="clamp-[text,3xl,3.5rem] leading-[clamp(2.5rem,8vw,4rem)] font-medium">
                            <ClientTranslate translationKey="trustedByLeading" />
                        </h2>
                        <p className="clamp-[text,base,lg]">
                            <ClientTranslate translationKey="trustedByLeadingDesc" />
                        </p>
                        {!isAuthenticated ?
                            <div>
                                <Button
                                    onClick={() => {
                                        router.push(
                                            getHref({
                                                pathname: "/[locale]/sign-up",
                                            }),
                                        )
                                    }}
                                    variant={"gradient"}
                                    className="px-6 has-[>svg]:px-6 font-medium"
                                >
                                    <ClientTranslate translationKey="signUp" />{" "}
                                    {isArabic ?
                                        <IconArrowUpRight className="[&_path]:fill-background rotate-270" />
                                    :   <IconArrowUpRight className="[&_path]:fill-background" />
                                    }
                                </Button>
                            </div>
                        :   null}
                    </div>

                    <div className="lg:-mt-10 lg:-mb-20 pl-2 sm:px-5 lg:pb-0 pb-8">
                        <Cards />
                    </div>
                </main>
            </section>
        </div>
    )
}
