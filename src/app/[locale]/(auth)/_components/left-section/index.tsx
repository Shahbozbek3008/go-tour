import logo from "@/assets/images/logo.png"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Link } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import Image from "next/image"
import { GlobeAnimation } from "./globe-animation"

export default function LeftSection() {
    return (
        <section
            style={{
                background:
                    "linear-gradient(169.51deg, #080A44 12.02%, #070B70 92.19%)",
            }}
            className="hidden lg:block relative rounded-xl overflow-hidden bg-transparent"
        >
            <Link
                className="relative z-10"
                href={getHref({ pathname: "/[locale]" })}
            >
                <Image className="m-5 max-w-48" src={logo} alt="logo" />
            </Link>
            <GlobeAnimation />
            <div className="absolute z-10 text-background bottom-[7%] right-[10%] flex flex-col gap-3 text-end font-semibold clamp-[text,3xl,5xl]">
                <h2>
                    <ClientTranslate translationKey="fasterDealsSign" />
                </h2>
                <h2>
                    <ClientTranslate translationKey="smarterMatches" />
                </h2>
                <h2>
                    <ClientTranslate translationKey="closerWorld" />
                </h2>
            </div>
        </section>
    )
}
