"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { BookOpen, ChevronDown, MapPin, Plane, Shield } from "lucide-react"
import { useState } from "react"

interface ServiceCardProps {
    icon: React.ReactNode
    title: string
    description: string
}

interface FaqItemProps {
    question: string
    answer: string
}

const services: ServiceCardProps[] = [
    {
        icon: <MapPin className="w-7 h-7" />,
        title: "whyUsGuidedTours",
        description: "whyUsGuidedToursDesc",
    },
    {
        icon: <Plane className="w-7 h-7" />,
        title: "whyUsBestFlights",
        description: "whyUsBestFlightsDesc",
    },
    {
        icon: <BookOpen className="w-7 h-7" />,
        title: "whyUsReligiousTours",
        description: "whyUsReligiousToursDesc",
    },
    {
        icon: <Shield className="w-7 h-7" />,
        title: "whyUsMedicalInsurance",
        description: "whyUsMedicalInsuranceDesc",
    },
]

const faqs: FaqItemProps[] = [
    {
        question: "whyUsFaq1Q",
        answer: "whyUsFaq1A",
    },
    {
        question: "whyUsFaq2Q",
        answer: "whyUsFaq2A",
    },
    {
        question: "whyUsFaq3Q",
        answer: "whyUsFaq3A",
    },
    {
        question: "whyUsFaq4Q",
        answer: "whyUsFaq4A",
    },
    {
        question: "whyUsFaq5Q",
        answer: "whyUsFaq5A",
    },
]

function ServiceCard({ icon, title, description }: ServiceCardProps) {
    return (
        <div className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100 transition-all duration-300">
            <div className="mb-4 p-3.5 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300">
                {icon}
            </div>
            <h3 className="text-[15px] font-semibold text-slate-800 mb-2">
                <ClientTranslate translationKey={title} />
            </h3>
            <p className="text-[13px] leading-relaxed text-slate-500">
                <ClientTranslate translationKey={description} />
            </p>
        </div>
    )
}

function FaqItem({ question, answer }: FaqItemProps) {
    const [open, setOpen] = useState(false)

    return (
        <div className="border-b border-slate-100 last:border-0">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-full flex items-center justify-between gap-4 py-4 text-left group"
            >
                <span className="text-[14px] sm:text-[15px] font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                    <ClientTranslate translationKey={question} />
                </span>
                <ChevronDown
                    className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-300 ${
                        open ? "rotate-180 text-blue-500" : ""
                    }`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${
                    open ? "max-h-40 pb-4" : "max-h-0"
                }`}
            >
                <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-500">
                    <ClientTranslate translationKey={answer} />
                </p>
            </div>
        </div>
    )
}

export const WhyUs = () => {
    return (
        <section className="relative bg-slate-50/60 py-20 sm:py-28">
            <div className="space-y-20 sm:space-y-28 home-container">
                {/* Why Us */}
                <div>
                    <div className="text-center mb-12">
                        <p className="text-[12px] uppercase tracking-widest font-semibold text-blue-600 mb-3">
                            <ClientTranslate translationKey="whyUsAdvantages" />
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                            <ClientTranslate translationKey="whyUsTitle" />
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {services.map((service) => (
                            <ServiceCard key={service.title} {...service} />
                        ))}
                    </div>
                </div>

                {/* Contact + FAQ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* Contact block */}
                    <div className="space-y-8">
                        <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                            <p className="text-[13px] text-slate-500 mb-1">
                                <ClientTranslate translationKey="whyUsQuestionsRemaining" />
                            </p>
                            <p className="text-[15px] font-semibold text-slate-800 mb-4">
                                <ClientTranslate translationKey="whyUsReadyToHelp" />
                            </p>
                            <a
                                href="tel:+998891234567"
                                className="inline-flex items-center gap-2 text-blue-600 font-semibold text-[15px] hover:text-blue-700 transition-colors"
                            >
                                +998 89 123 45 67
                            </a>
                        </div>

                        <div className="space-y-1">
                            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-medium mb-3 px-1">
                                <ClientTranslate translationKey="whyUsUsefulSections" />
                            </p>
                            {[
                                {
                                    key: "whyUsBookingProcess",
                                    label: "Bron jarayoni",
                                },
                                {
                                    key: "whyUsPaymentRefunds",
                                    label: "To'lov va qaytishlar",
                                },
                                {
                                    key: "whyUsTravelRequirements",
                                    label: "Sayohat talablari",
                                },
                                {
                                    key: "whyUsTravelExperience",
                                    label: "Sayohat tajribasi",
                                },
                            ].map((item) => (
                                <a
                                    key={item.key}
                                    href="#"
                                    className="flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-medium text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all duration-200"
                                >
                                    <ClientTranslate
                                        translationKey={item.key}
                                    />
                                    <span className="text-slate-300">→</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* FAQ */}
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug mb-6">
                            <ClientTranslate translationKey="whyUsFaqTitle" />
                        </h3>
                        <div className="divide-y divide-slate-100 rounded-2xl bg-white border border-slate-100 px-5 sm:px-6 shadow-sm">
                            {faqs.map((faq) => (
                                <FaqItem key={faq.question} {...faq} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
