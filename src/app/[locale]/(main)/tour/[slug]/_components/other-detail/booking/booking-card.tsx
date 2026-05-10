"use client"

import { useCurrency } from "@/app/_providers/currency-provider"
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
import { CalendarOff, Check, Minus, Plus, Users, Zap } from "lucide-react"
import { useState } from "react"
import { useTourInstallmentSessionQuery } from "../../../_hooks"
import { InstallmentOption, TourPricing, TourSession } from "../../../_types"

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
    const [selectedSessionId, setSelectedSessionId] = useState<string>("")
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
        } else {
            return `${format(startDate, "d")} ${startMonth} – ${format(endDate, "d")} ${endMonth} ${year}`
        }
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

    return (
        <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-4">
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

            <div className="space-y-3">
                <Select
                    value={selectedSessionId}
                    onValueChange={(val) => {
                        setSelectedSessionId(val)
                        setParticipants(1)
                        setSelectedMonths(null)
                    }}
                >
                    <SelectTrigger className="w-full text-foreground font-medium h-20 placeholder:text-sm rounded-xl">
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
                                    className="py-3 px-3 cursor-pointer"
                                >
                                    <div className="flex items-center justify-between w-full min-w-[240px] pr-2">
                                        <span className="text-sm font-medium text-foreground min-w-0 pr-4">
                                            {formatDateRange(
                                                session?.startDate,
                                                session?.endDate,
                                                isRussian,
                                            )}
                                        </span>
                                        <span
                                            className={cn(
                                                "shrink-0 inline-flex items-center px-2 py-0.5 rounded-md border text-[13px] font-semibold tracking-wide bg-background",
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

                <div className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/20">
                    <div className="flex items-center gap-2">
                        <Users className="size-4 text-primary" />
                        <span className="text-sm text-foreground font-medium">
                            <ClientTranslate translationKey="participants" />
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() =>
                                setParticipants((p) => Math.max(1, p - 1))
                            }
                            className="size-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40"
                            disabled={participants <= 1}
                        >
                            <Minus className="size-3" />
                        </button>
                        <span className="text-sm font-semibold w-4 text-center">
                            {participants}
                        </span>
                        <button
                            onClick={() =>
                                setParticipants((p) =>
                                    Math.min(
                                        activeSession ? availableSpots : 1,
                                        p + 1,
                                    ),
                                )
                            }
                            className="size-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40"
                            disabled={
                                !activeSession || participants >= availableSpots
                            }
                        >
                            <Plus className="size-3" />
                        </button>
                    </div>
                </div>
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
                    {/* Payment type tabs */}
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
                                "flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200",
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
                                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200",
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
                            <div className="flex flex-wrap gap-2">
                                {[...installmentOptions]
                                    .sort((a, b) => b.months - a.months)
                                    .map((opt) => (
                                        <button
                                            key={opt.months}
                                            onClick={() =>
                                                setSelectedMonths(opt.months)
                                            }
                                            className={cn(
                                                "px-3 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200",
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

                            {/* Open installment card */}
                            {selectedInstallment && (
                                <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-orange-300/60 bg-orange-50/60 dark:bg-orange-950/20 dark:border-orange-700/40">
                                    <div className="flex items-center gap-3">
                                        {/* Open logo */}
                                        <div className="flex-shrink-0">
                                            <svg
                                                width="52"
                                                height="22"
                                                viewBox="0 0 52 22"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="block"
                                            >
                                                <text
                                                    x="0"
                                                    y="18"
                                                    fontFamily="Arial, sans-serif"
                                                    fontWeight="700"
                                                    fontSize="20"
                                                    fill="url(#openGrad)"
                                                >
                                                    open
                                                </text>
                                                <defs>
                                                    <linearGradient
                                                        id="openGrad"
                                                        x1="0"
                                                        y1="0"
                                                        x2="52"
                                                        y2="0"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop
                                                            offset="0%"
                                                            stopColor="#8B5CF6"
                                                        />
                                                        <stop
                                                            offset="50%"
                                                            stopColor="#3B82F6"
                                                        />
                                                        <stop
                                                            offset="100%"
                                                            stopColor="#06B6D4"
                                                        />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-foreground leading-tight">
                                                {formatNumber(
                                                    selectedInstallment.monthlyPayment,
                                                )}{" "}
                                                ${"  "}
                                                <span className="font-normal text-muted-foreground">
                                                    ×{" "}
                                                    {selectedInstallment.months}{" "}
                                                    {isRussian ?
                                                        "месяцев"
                                                    :   "oy"}
                                                </span>
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                <ClientTranslate translationKey="total_label" />{" "}
                                                {formatNumber(
                                                    selectedInstallment.totalPayment,
                                                )}{" "}
                                                $
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 ml-2">
                                        <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Check className="size-3.5 text-primary" />
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
                    <ClientTranslate translationKey="prepayment" /> – ${" "}
                    {activeSession ?
                        (
                            ((activeSession.price * pricing.prepayment) /
                                pricing.currentPrice) *
                            participants
                        ).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                        })
                    :   (pricing.prepayment * participants).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                    <ClientTranslate translationKey="cancellation_24h" />
                </p>
            </div>
        </div>
    )
}
