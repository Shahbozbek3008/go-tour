"use client"
import IconFaceBook2 from "@/assets/icons/facebook2-icon"
import IconInstagram from "@/assets/icons/instagram-icon"
import IconLinkedin2 from "@/assets/icons/linkedin2-icon"
import IconTelegram from "@/assets/icons/telegram-icon"
import XIcon from "@/assets/icons/x-icon"
import logo from "@/assets/images/logo.png"
import upgrowLogo from "@/assets/images/upgrow-logo.png"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import GradientText from "@/components/ui/gradient-text"
import { Link, usePathname } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import Image from "next/image"
import { useAdditionalPagesQuery } from "./_hooks/use-additional-pages-query"
import AnimatedNetworkBg from "./animated-network-bg"
import { links } from "./static"
import { useMainSiteInfoQuery } from "./use-main-site-info-query"

export default function Footer() {
    const { data: site } = useMainSiteInfoQuery()
    const { additionalPages } = useAdditionalPagesQuery()

    const pathname = usePathname()
    if (pathname.endsWith("/chat")) return null

    return (
        <footer className="relative bg-foreground grid place-items-center overflow-hidden">
            <AnimatedNetworkBg />
            <main className="relative z-10 home-container !max-w-[90rem] w-full pt-[100px] pb-10 flex justify-between gap-x-5 gap-y-10 flex-wrap">
                <div>
                    <Link href={getHref({ pathname: "/[locale]" })}>
                        <Image
                            src={logo}
                            alt="logo"
                            className="clamp-[w,9.188rem,56]"
                        />
                    </Link>
                    <ul className="flex gap-1 mt-6">
                        {site?.twitter && (
                            <a
                                href={site.twitter}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                <Button
                                    variant="ghost"
                                    className="hover:bg-background/5"
                                >
                                    <XIcon />
                                </Button>
                            </a>
                        )}
                        {site?.linked_in && (
                            <a
                                href={site.linked_in}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                <Button
                                    variant="ghost"
                                    className="hover:bg-background/5"
                                >
                                    <IconLinkedin2 />
                                </Button>
                            </a>
                        )}
                        {site?.facebook && (
                            <a
                                href={site.facebook}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                <Button
                                    variant="ghost"
                                    className="hover:bg-background/5"
                                >
                                    <IconFaceBook2 />
                                </Button>
                            </a>
                        )}
                        {site?.instagram && (
                            <a
                                href={site.instagram}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                <Button
                                    variant="ghost"
                                    className="hover:bg-background/5"
                                >
                                    <IconInstagram />
                                </Button>
                            </a>
                        )}
                        {site?.telegram && (
                            <a
                                href={site.telegram}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                <Button
                                    variant="ghost"
                                    className="hover:bg-background/5"
                                >
                                    <IconTelegram />
                                </Button>
                            </a>
                        )}
                    </ul>
                </div>

                {links.map((section) => (
                    <div key={section.title}>
                        <h3 className="font-medium mb-6 text-background/70 clamp-[text,base,lg]">
                            <ClientTranslate translationKey={section.title} />
                        </h3>
                        <ul className="flex flex-col gap-4">
                            {section.links.map((l) => {
                                const additionalPage = additionalPages.find(
                                    (item) =>
                                        item.page_type === l.additionalPageType,
                                )
                                return (
                                    <Link
                                        key={`${section.title}-${l.name}`}
                                        href={
                                            additionalPage ?
                                                getHref({
                                                    pathname:
                                                        "/[locale]/additional-pages/[slug]",
                                                    query: {
                                                        slug: additionalPage.page_type,
                                                    },
                                                })
                                            :   l.href || ""
                                        }
                                        className="hover:no-underline font-normal clamp-[text,sm,base]"
                                    >
                                        <GradientText
                                            hover
                                            className="whitespace-nowrap"
                                        >
                                            {additionalPage ?
                                                additionalPage.page_type_display
                                            :   <ClientTranslate
                                                    translationKey={l.name}
                                                />
                                            }
                                        </GradientText>
                                    </Link>
                                )
                            })}
                        </ul>
                    </div>
                ))}
            </main>
            <p className="clamp-[text,tiny,sm] text-background opacity-80 flex items-center justify-center gap-1 py-8 border-t border-white/50 w-full">
                <ClientTranslate translationKey="allRightsReserved" />
                <Image src={upgrowLogo} alt="Developer Company logo" />
            </p>
        </footer>
    )
}
