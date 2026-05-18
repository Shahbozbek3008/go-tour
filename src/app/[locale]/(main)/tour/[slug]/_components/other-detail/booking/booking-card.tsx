"use client"

import { useCurrency } from "@/app/_providers/currency-provider"
import { OpenLogo } from "@/assets/icons/open-logo"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils/shadcn"
import { format } from "date-fns"
import { ru, uz } from "date-fns/locale"
import { CalendarOff, Check, FileX, Zap } from "lucide-react"
import { useState } from "react"
import { useTourInstallmentSessionQuery } from "../../../_hooks"
import { InstallmentOption, TourPricing, TourSession } from "../../../_types"
import { Participants } from "./participants"

interface BookingCardProps {
    pricing: TourPricing
    sessions: TourSession[]
    instantBooking: boolean
}

export function BookingCard({
    pricing,
    sessions,
    instantBooking,
}: BookingCardProps) {
    const { isRussian } = useLanguage()
    const { currency } = useCurrency()
    const [selectedSessionId, setSelectedSessionId] = useState<string>(
        sessions?.[0]?.id?.toString() ?? "",
    )
    const [participants, setParticipants] = useState(1)
    const [paymentTab, setPaymentTab] = useState<"cash" | "installment">(
        "installment",
    )
    const [selectedMonths, setSelectedMonths] = useState<number | null>(null)

    const { installmentSession } = useTourInstallmentSessionQuery(
        {
            options: {
                enabled: !!selectedSessionId,
            },
        },
        selectedSessionId,
    )

    const installmentOptions: InstallmentOption[] = installmentSession ?? []

    if (
        installmentOptions.length > 0 &&
        selectedMonths === null &&
        paymentTab === "installment"
    ) {
        setSelectedMonths(installmentOptions[0].months)
    }

    const activeSession = sessions?.find(
        (s) => s.id.toString() === selectedSessionId,
    )

    const fallbackPrice =
        sessions?.length ?
            Math.min(...sessions.map((s) => s.price))
        :   pricing.currentPrice

    const displayPrice = activeSession?.price ?? fallbackPrice
    const totalPrice = displayPrice * participants

    const hasDiscount =
        activeSession ? activeSession.hasDiscount : pricing.discountPercent

    const originalPrice =
        activeSession ?
            activeSession.hasDiscount ?
                (activeSession.price /
                    (1 - (activeSession.discountPercent || 0) / 100)) *
                participants
            :   null
        :   pricing.originalPrice * participants

    const availableSpots = activeSession?.availableSlots ?? 0

    const formatDateRange = (start: number, end: number, isRu: boolean) => {
        const dLocale = isRu ? ru : uz
        const startDate = new Date(start)
        const endDate = new Date(end)
        const startMonth = format(startDate, "MMM", {
            locale: dLocale,
        }).toLowerCase()
        const endMonth = format(endDate, "MMM", {
            locale: dLocale,
        }).toLowerCase()
        const year = format(endDate, "yyyy")
        if (startMonth === endMonth) {
            return `${format(startDate, "d")} – ${format(endDate, "d")} ${endMonth} ${year}`
        }
        return `${format(startDate, "d")} ${startMonth} – ${format(endDate, "d")} ${endMonth} ${year}`
    }

    const getPlacesString = (count: number, isRu: boolean) => {
        if (!isRu) return `${count} ta joy`
        const lastDigit = count % 10
        const lastTwo = count % 100
        if (lastDigit === 1 && lastTwo !== 11) return `${count} место`
        if (lastDigit >= 2 && lastDigit <= 4 && (lastTwo < 10 || lastTwo >= 20))
            return `${count} места`
        return `${count} мест`
    }

    const selectedInstallment = installmentOptions.find(
        (opt) => opt.months === selectedMonths,
    )

    const formatNumber = (num: number) =>
        num.toLocaleString(undefined, { maximumFractionDigits: 2 })

    const currencyLabel =
        currency === "USD" ? "$"
        : isRussian ? "сум"
        : "so'm"

    return (
        <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-4">
            {/* ─── Price header ─── */}
            <div className="flex items-baseline gap-2 flex-wrap">
                {!activeSession && sessions?.length > 0 && (
                    <span className="text-2xl font-bold text-foreground mr-1">
                        <ClientTranslate translationKey="from" />
                    </span>
                )}
                <span className="text-2xl font-bold text-foreground">
                    {totalPrice.toLocaleString()}{" "}
                    {currency === "USD" ?
                        "$"
                    :   <ClientTranslate translationKey="uzs" />}
                </span>
                {hasDiscount && originalPrice ?
                    <>
                        <span className="text-base text-muted-foreground line-through">
                            {originalPrice.toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                            })}{" "}
                            {currency === "USD" ?
                                "$"
                            :   <ClientTranslate translationKey="uzs" />}
                        </span>
                        <Badge className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg">
                            {activeSession?.discountPercent ??
                                pricing.discountPercent}
                            %
                        </Badge>
                    </>
                :   null}
            </div>

            <p className="text-xs text-muted-foreground -mt-2">
                $ {pricing.pricePerDay.toLocaleString()} /{" "}
                <ClientTranslate translationKey="day_label" /> ·{" "}
                {pricing.totalDays}{" "}
                <ClientTranslate translationKey="days_label" />
            </p>

            {/* ─── Session select ─── */}
            <div className="space-y-3">
                <Select
                    value={selectedSessionId}
                    onValueChange={(val) => {
                        setSelectedSessionId(val)
                        setParticipants(1)
                        setSelectedMonths(null)
                    }}
                >
                    <SelectTrigger className="w-full text-foreground font-medium h-auto! placeholder:text-sm rounded-xl">
                        <SelectValue
                            placeholder={
                                <ClientTranslate translationKey="selectDates" />
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {!sessions || sessions.length === 0 ?
                            <div className="py-8 px-4 text-center flex flex-col items-center justify-center">
                                <div className="size-10 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                                    <CalendarOff className="size-5 text-muted-foreground/70" />
                                </div>
                                <p className="text-sm font-semibold text-foreground">
                                    <ClientTranslate translationKey="dateAreNotAvailable" />
                                </p>
                                <p className="text-xs text-muted-foreground mt-1 max-w-[200px] leading-relaxed">
                                    <ClientTranslate translationKey="currentlyNoDates" />
                                </p>
                            </div>
                        :   sessions?.map((session) => (
                                <SelectItem
                                    key={session.id}
                                    value={session.id.toString()}
                                    className="p-3 cursor-pointer"
                                    data-tour-session-item
                                >
                                    <div className="flex lg:flex-row flex-col lg:items-center items-start gap-2 justify-between w-full min-w-[240px] pr-2">
                                        <span className="lg:text-sm text-xs font-medium text-foreground min-w-0 pr-4">
                                            {formatDateRange(
                                                session?.startDate,
                                                session?.endDate,
                                                isRussian,
                                            )}
                                        </span>
                                        <span
                                            className={cn(
                                                "shrink-0 inline-flex items-center px-2 py-0.5 rounded-md border lg:text-sm text-xs font-semibold tracking-wide bg-background",
                                                session.availableSlots < 3 ?
                                                    "border-[#b180ad]/40 text-[#b180ad] bg-[#b180ad]/5 dark:text-[#c49bc0]"
                                                :   "border-[#a5c156]/40 text-[#a5c156] bg-[#a5c156]/5 dark:text-[#b4ce6a]",
                                            )}
                                        >
                                            {session.price}{" "}
                                            <span className="opacity-40 mx-1.5">
                                                •
                                            </span>{" "}
                                            {getPlacesString(
                                                session.availableSlots,
                                                isRussian,
                                            )}
                                        </span>
                                    </div>
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>

                <Participants
                    participants={participants}
                    setParticipants={setParticipants}
                    activeSession={activeSession}
                />
            </div>

            {activeSession && (
                <p className="text-xs font-medium text-primary text-center">
                    {isRussian ?
                        `${availableSpots} из ${availableSpots} мест осталось`
                    :   `${availableSpots} ta joy qoldi`}
                </p>
            )}

            {!activeSession && (
                <p className="text-xs font-medium text-muted-foreground text-center">
                    <ClientTranslate translationKey="pleaseSelectDate" />
                </p>
            )}

            {/* ─── Installment / Cash payment section ─── */}
            {selectedSessionId && installmentOptions.length > 0 && (
                <div className="space-y-3">
                    <div className="flex rounded-xl border border-border/60 bg-muted/30 p-1 gap-1">
                        <button
                            onClick={() => {
                                setPaymentTab("installment")
                                if (
                                    selectedMonths === null &&
                                    installmentOptions.length > 0
                                ) {
                                    setSelectedMonths(
                                        installmentOptions[
                                            installmentOptions.length - 1
                                        ].months,
                                    )
                                }
                            }}
                            className={cn(
                                "flex-1 py-2 px-3 rounded-lg lg:text-sm text-xs font-semibold transition-all duration-200",
                                paymentTab === "installment" ?
                                    "bg-card text-foreground shadow-sm border border-border/40"
                                :   "text-muted-foreground hover:text-foreground",
                            )}
                        >
                            <ClientTranslate translationKey="installment" />
                        </button>
                        <button
                            onClick={() => setPaymentTab("cash")}
                            className={cn(
                                "flex-1 py-2 px-3 rounded-lg lg:text-sm text-xs font-medium transition-all duration-200",
                                paymentTab === "cash" ?
                                    "bg-card text-foreground shadow-sm border border-border/40"
                                :   "text-muted-foreground hover:text-foreground",
                            )}
                        >
                            <ClientTranslate translationKey="cashless" />
                        </button>
                    </div>

                    {paymentTab === "installment" && (
                        <div className="space-y-3">
                            <div className="flex flex-wrap gap-1">
                                {[...installmentOptions]
                                    .sort((a, b) => b.months - a.months)
                                    .map((opt) => (
                                        <button
                                            key={opt.months}
                                            onClick={() =>
                                                setSelectedMonths(opt.months)
                                            }
                                            className={cn(
                                                "px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all duration-200",
                                                selectedMonths === opt.months ?
                                                    "bg-primary text-primary-foreground border-primary shadow-sm"
                                                :   "bg-muted/30 border-border/60 text-muted-foreground hover:border-primary/50 hover:text-foreground",
                                            )}
                                        >
                                            {opt.months}{" "}
                                            <ClientTranslate translationKey="month" />
                                        </button>
                                    ))}
                            </div>

                            {selectedInstallment && (
                                <div className="rounded-xl border border-border/50 bg-muted/20 overflow-hidden">
                                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40 bg-muted/30">
                                        <div className="flex items-center gap-2">
                                            <OpenLogo />
                                            <span className="text-xs text-muted-foreground font-medium">
                                                {isRussian ?
                                                    "Рассрочка"
                                                :   "Muddatli to'lov"}
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                            {isRussian ?
                                                "Без документов"
                                            :   "Hujjatsiz"}
                                        </span>
                                    </div>

                                    <div className="px-4 py-3 flex items-end justify-between gap-3">
                                        <div>
                                            <p className="text-[11px] text-muted-foreground mb-0.5">
                                                {isRussian ?
                                                    "Ежемесячный платёж"
                                                :   "Oylik to'lov"}
                                            </p>
                                            <p className="text-xl font-bold text-foreground leading-tight">
                                                {formatNumber(
                                                    selectedInstallment.monthlyPayment *
                                                        participants,
                                                )}{" "}
                                                <span className="text-sm font-normal text-muted-foreground">
                                                    {currencyLabel}
                                                </span>
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                × {selectedInstallment.months}{" "}
                                                {isRussian ? "месяцев" : "oy"}
                                            </p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-[11px] text-muted-foreground mb-0.5">
                                                {isRussian ? "Итого" : "Jami"}
                                            </p>
                                            <p className="text-sm font-semibold text-foreground">
                                                {formatNumber(
                                                    selectedInstallment.totalPayment *
                                                        participants,
                                                )}{" "}
                                                <span className="font-normal text-muted-foreground">
                                                    {currencyLabel}
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="px-4 pb-3 space-y-1.5 border-t border-border/30 pt-2.5">
                                        {[
                                            isRussian ?
                                                "От 10 000 до 82 400 000 сум"
                                            :   "10 000 so'mdan 82 400 000 so'mgacha",
                                            isRussian ? "2, 4 или 6 месяцев" : (
                                                "2, 4 yoki 6 oyga bo'lib to'lash"
                                            ),
                                            isRussian ?
                                                "Без документов и анкет"
                                            :   "Hujjatlar va anketa talab etilmaydi",
                                        ].map((text, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-2"
                                            >
                                                <div className="size-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                    <Check className="size-2.5 text-primary" />
                                                </div>
                                                <span className="text-xs text-muted-foreground">
                                                    {text}
                                                </span>
                                            </div>
                                        ))}
                                        <div className="flex items-center gap-2 pt-0.5">
                                            <div className="size-4 rounded-full bg-muted/50 flex items-center justify-center shrink-0">
                                                <FileX className="size-2.5 text-muted-foreground/60" />
                                            </div>
                                            <span className="text-xs text-muted-foreground">
                                                {isRussian ?
                                                    "Для всех держателей банковских карт"
                                                :   "Barcha bank kartalari egalari uchun"
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {instantBooking && (
                <div className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg border border-dashed border-primary/40 bg-primary/5">
                    <Zap className="size-3.5 text-primary" />
                    <span className="text-xs font-medium text-primary">
                        <ClientTranslate translationKey="instant_booking" />
                    </span>
                </div>
            )}

            <Button
                disabled={!activeSession}
                className="w-full rounded-xl h-12 text-sm font-semibold bg-primary hover:bg-primary/90 shadow-sm"
            >
                <ClientTranslate translationKey="bookTour" />
            </Button>

            <Separator />

            <div className="text-center space-y-0.5">
                <p className="text-xs text-muted-foreground">
                    <ClientTranslate translationKey="prepayment" /> –{" "}
                    {activeSession ?
                        (
                            ((activeSession.price * pricing.prepayment) /
                                pricing.currentPrice) *
                            participants
                        ).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                        })
                    :   (pricing.prepayment * participants).toLocaleString()
                    }{" "}
                    {currencyLabel}
                </p>
                <p className="text-xs text-muted-foreground">
                    <ClientTranslate translationKey="cancellation_24h" />
                </p>
            </div>
        </div>
    )
}
