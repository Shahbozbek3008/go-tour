"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Minus, Plus, Users, Zap } from "lucide-react"
import { useState } from "react"
import { TourPricing } from "../../../_types"

interface BookingCardProps {
    pricing: TourPricing
    dateRange: { start: string; end: string }
    availableSpots: number
    instantBooking: boolean
}

export function BookingCard({
    pricing,
    dateRange,
    availableSpots,
    instantBooking,
}: BookingCardProps) {
    const [participants, setParticipants] = useState(1)

    const totalPrice = pricing.currentPrice * participants

    return (
        <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-4">
            <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-2xl font-bold text-foreground">
                    ₽ {totalPrice.toLocaleString()}
                </span>
                <span className="text-base text-muted-foreground line-through">
                    ₽ {(pricing.originalPrice * participants).toLocaleString()}
                </span>
                <Badge className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg">
                    {pricing.discountPercent}%
                </Badge>
            </div>
            <p className="text-xs text-muted-foreground -mt-2">
                ₽ {pricing.pricePerDay.toLocaleString()} / day ·{" "}
                {pricing.totalDays} days
            </p>

            <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-muted/20">
                    <CalendarDays className="size-4 text-primary shrink-0" />
                    <span className="text-sm text-foreground font-medium">
                        {dateRange.start} – {dateRange.end}
                    </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/20">
                    <div className="flex items-center gap-2">
                        <Users className="size-4 text-primary" />
                        <span className="text-sm text-foreground font-medium">
                            Participants
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
                                    Math.min(availableSpots, p + 1),
                                )
                            }
                            className="size-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40"
                            disabled={participants >= availableSpots}
                        >
                            <Plus className="size-3" />
                        </button>
                    </div>
                </div>
            </div>

            <p className="text-xs font-medium text-primary text-center">
                {availableSpots} of {availableSpots} spots left
            </p>

            {instantBooking && (
                <div className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg border border-dashed border-primary/40 bg-primary/5">
                    <Zap className="size-3.5 text-primary" />
                    <span className="text-xs font-medium text-primary">
                        Instant booking
                    </span>
                </div>
            )}

            <Button className="w-full rounded-xl h-12 text-sm font-semibold bg-primary hover:bg-primary/90 shadow-sm">
                Book Now
            </Button>

            <Separator />

            <div className="text-center space-y-0.5">
                <p className="text-xs text-muted-foreground">
                    Prepayment – ₽{" "}
                    {(pricing.prepayment * participants).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                    Full cancellation within 24 hours
                </p>
            </div>
        </div>
    )
}
