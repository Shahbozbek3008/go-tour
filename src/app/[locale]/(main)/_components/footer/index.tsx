"use client"

import { InstagramIcon } from "@/assets/icons/instagram"
import TelegramIcon from "@/assets/icons/telegram-icon"
import ClientTranslate from "@/components/common/translation/client-translate"
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BottomNav } from "../navigation-bar"

const Footer = () => {
    const t = useTranslations()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }
        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <footer className="bg-[#F8FAFC] pt-24 pb-12 font-sans relative overflow-hidden border-t border-slate-200/60">
            <div className="home-container mb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
                    <div className="flex flex-col sm:col-span-2 gap-6">
                        <div className="flex flex-col">
                            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight">
                                <ClientTranslate translationKey="footerTitle" />
                            </h3>
                            <div className="w-10 h-1 bg-blue-500 rounded-full mt-2" />
                        </div>
                        <p className="text-slate-600 text-[15px] leading-relaxed max-w-sm mt-1">
                            <ClientTranslate translationKey="footerDescription" />
                        </p>
                    </div>

                    <div className="flex flex-col col-span-1 gap-6">
                        <h3 className="text-[22px] font-bold text-slate-900">
                            <ClientTranslate translationKey="footerServices" />
                        </h3>
                        <ul className="flex flex-col  gap-4">
                            {[
                                { key: "footerCatalog", label: "Katalog" },
                                { key: "footerAgents", label: "Agentlar" },
                                {
                                    key: "footerForCompanies",
                                    label: "Tur kompaniyalari uchun",
                                },
                            ].map((item, idx) => (
                                <li
                                    key={idx}
                                    className="group flex items-center"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-3 group-hover:bg-blue-500 transition-colors duration-300" />
                                    <Link
                                        href="/"
                                        className="text-slate-600 group-hover:text-blue-600 transition-colors duration-300 font-medium text-[15px]"
                                    >
                                        <ClientTranslate
                                            translationKey={item.key}
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h3 className="text-[22px] font-bold text-slate-900">
                            <ClientTranslate translationKey="footerContact" />
                        </h3>
                        <ul className="flex flex-col gap-5">
                            <li className="group flex items-center gap-4 cursor-pointer">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200 group-hover:border-blue-300 group-hover:shadow-md transition-all duration-300">
                                    <MapPin
                                        className="text-slate-500 group-hover:text-blue-600 transition-colors"
                                        size={18}
                                        strokeWidth={2.5}
                                    />
                                </div>
                                <span className="text-slate-600 font-medium text-[15px] group-hover:text-slate-900 transition-colors">
                                    <ClientTranslate translationKey="footerAddress" />
                                </span>
                            </li>
                            <li className="group flex items-center gap-4 cursor-pointer">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200 group-hover:border-blue-300 group-hover:shadow-md transition-all duration-300">
                                    <Phone
                                        className="text-slate-500 group-hover:text-blue-600 transition-colors"
                                        size={18}
                                        strokeWidth={2.5}
                                    />
                                </div>
                                <a
                                    href="tel:+998901234567"
                                    className="text-slate-600 font-medium text-[15px] group-hover:text-slate-900 transition-colors"
                                >
                                    +998 90 123 45 67
                                </a>
                            </li>
                            <li className="group flex items-center gap-4 cursor-pointer">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200 group-hover:border-blue-300 group-hover:shadow-md transition-all duration-300">
                                    <Mail
                                        className="text-slate-500 group-hover:text-blue-600 transition-colors"
                                        size={18}
                                        strokeWidth={2.5}
                                    />
                                </div>
                                <a
                                    href="mailto:Gotour@gmail.com"
                                    className="text-slate-600 font-medium text-[15px] group-hover:text-slate-900 transition-colors"
                                >
                                    Gotour@gmail.com
                                </a>
                            </li>
                            <li className="group flex items-center gap-4 cursor-pointer">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
                                    <TelegramIcon className="text-slate-500 hover:text-blue-600 transition-all duration-300" />
                                </div>
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
                                    <InstagramIcon className="text-slate-500 hover:text-blue-600 transition-all duration-300" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mx-auto px-6 md:px-12 lg:px-10">
                <div className="flex flex-col items-center justify-center pt-8 border-t border-slate-200">
                    <p className="text-slate-500 text-sm font-medium pb-2 text-center uppercase">
                        <ClientTranslate translationKey="footerCopyright" />
                    </p>
                </div>
            </div>

            <button
                onClick={scrollToTop}
                className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[50] flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white text-slate-800 rounded-full border border-slate-200/80 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_-5px_rgba(0,0,0,0.2)] hover:bg-slate-50 active:scale-90 transition-all duration-500 group ${
                    isVisible ?
                        "opacity-100 translate-y-0"
                    :   "opacity-0 translate-y-12 pointer-events-none"
                }`}
                aria-label={t("footerScrollToTop")}
            >
                <ArrowUp
                    size={22}
                    strokeWidth={2.5}
                    className="transition-transform duration-300 group-hover:-translate-y-1 text-slate-600 group-hover:text-blue-600"
                />
            </button>
            <BottomNav />
        </footer>
    )
}

export default Footer
