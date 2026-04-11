"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import ControlledInput from "@/components/form/controlled-input"
import ControlledTextarea from "@/components/form/controlled-textarea"
import PhoneField from "@/components/form/phone-field"
import { Form } from "@/components/ui/form"
import { cn } from "@/lib/utils/shadcn"

const schema = z.object({
    name: z.string().min(2, "Ism kamida 2 ta belgi bo'lishi kerak"),
    phone: z.string().min(7, "Telefon raqami noto'g'ri"),
    website: z
        .string()
        .optional()
        .refine(
            (val) =>
                !val ||
                val === "" ||
                val.startsWith("http://") ||
                val.startsWith("https://"),
            { message: "URL https:// bilan boshlanishi kerak" },
        ),
    message: z.string().min(10, "Xabar kamida 10 ta belgi bo'lishi kerak"),
})

type FormValues = z.infer<typeof schema>

const contactDetails = [
    {
        icon: Mail,
        label: "Email",
        value: "Gotour@gmail.com",
        href: "mailto:Gotour@gmail.com",
    },
    {
        icon: MapPin,
        label: "Manzil",
        value: "4074 Ebert Summit Suite 375 Lake Leonardchester",
        href: "#",
    },
    {
        icon: Phone,
        label: "Telefon",
        value: "+44 123 654 7890",
        href: "tel:+441236547890",
    },
]

export const TourCompaniesForm = () => {
    const [submitted, setSubmitted] = useState(false)

    const methods = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            phone: "",
            website: "",
            message: "",
        },
    })

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods

    const onSubmit = async (data: FormValues) => {
        await new Promise((r) => setTimeout(r, 1200))
        console.log(data)
        setSubmitted(true)
    }

    return (
        <section className="bg-[#F5F6FA] flex items-center justify-center lg:px-15 sm: px-6 lg:py-24 md:py-16">
            <div className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
                                Aloqa
                            </p>
                            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 leading-[1.1]">
                                Biz bilan
                                <span className="text-primary ml-2">
                                    bog'laning
                                </span>
                            </h2>
                            <p className="text-zinc-500 text-[15px] leading-relaxed max-w-sm">
                                Ma'lumotlarni qayta ishlab, loyiha haqida siz
                                bilan muhokama qilamiz.
                            </p>
                        </div>

                        <div className="space-y-5">
                            {contactDetails.map(
                                ({ icon: Icon, label, value, href }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        className="group flex items-start gap-4 no-underline"
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                                            <Icon
                                                className="w-4 h-4 text-blue-600"
                                                strokeWidth={1.8}
                                            />
                                        </div>
                                        <div className="pt-0.5">
                                            <p className="text-xs text-zinc-400 font-medium mb-0.5">
                                                {label}
                                            </p>
                                            <p className="text-sm text-zinc-700 font-medium leading-snug">
                                                {value}
                                            </p>
                                        </div>
                                    </a>
                                ),
                            )}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 rounded-3xl bg-blue-500/5 blur-2xl" />
                        <div className="relative bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-8 md:p-10">
                            {submitted ?
                                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                                        <CheckCircle2
                                            className="w-8 h-8 text-green-500"
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-zinc-900">
                                            Yuborildi!
                                        </h3>
                                        <p className="text-sm text-zinc-500">
                                            Xabaringiz qabul qilindi. Tez orada
                                            siz bilan bog'lanamiz.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSubmitted(false)
                                            methods.reset()
                                        }}
                                        className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium underline underline-offset-4"
                                    >
                                        Yana yuborish
                                    </button>
                                </div>
                            :   <Form {...methods}>
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="space-y-4"
                                    >
                                        <ControlledInput
                                            methods={methods}
                                            name="name"
                                            label="Ism"
                                            showError
                                        />

                                        <PhoneField
                                            methods={methods}
                                            name="phone"
                                            label="phoneNumber"
                                        />

                                        <ControlledInput
                                            methods={methods}
                                            name="website"
                                            label="Veb-sayt"
                                            optional
                                            showError
                                        />

                                        <ControlledTextarea
                                            methods={methods}
                                            name="message"
                                            label="Xabar"
                                            showError
                                            textareaProps={{
                                                className:
                                                    "min-h-[130px] resize-none",
                                            }}
                                        />

                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={cn(
                                                    "w-full flex items-center justify-center gap-2.5 rounded-xl",
                                                    "bg-blue-600 hover:bg-blue-700 active:bg-blue-800",
                                                    "text-white font-semibold text-[15px] tracking-wide",
                                                    "py-4 px-6 transition-all duration-200",
                                                    "disabled:opacity-60 disabled:cursor-not-allowed",
                                                    "shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.45)]",
                                                )}
                                            >
                                                {isSubmitting ?
                                                    <>
                                                        <svg
                                                            className="animate-spin w-4 h-4"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle
                                                                className="opacity-25"
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                            />
                                                            <path
                                                                className="opacity-75"
                                                                fill="currentColor"
                                                                d="M4 12a8 8 0 018-8v8H4z"
                                                            />
                                                        </svg>
                                                        Yuborilmoqda...
                                                    </>
                                                :   <>
                                                        Yuborish
                                                        <ArrowRight
                                                            className="w-4 h-4"
                                                            strokeWidth={2.5}
                                                        />
                                                    </>
                                                }
                                            </button>
                                        </div>
                                    </form>
                                </Form>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
