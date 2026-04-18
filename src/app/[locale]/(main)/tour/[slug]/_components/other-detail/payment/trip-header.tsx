import { cn } from "@/lib/utils/shadcn"
import { MONTHS_GENITIVE } from "../../../_constants/mockdata"

interface TripPoint {
    label: string
    date: Date | null
    colorClass: string
    dotColor: string
}

interface TripHeaderProps {
    departureDate: Date | null
    returnDate: Date | null
    className?: string
}

function formatTripDate(date: Date): string {
    return `${date.getDate()} ${MONTHS_GENITIVE[date.getMonth()]}`
}

function TripPointItem({ label, date, dotColor }: TripPoint) {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
                <div className={cn("h-2.5 w-2.5 rounded-full", dotColor)} />
                <span
                    className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    {label}
                </span>
            </div>
            <div className="pl-[18px] text-[15px] text-foreground">
                {date ? formatTripDate(date) : "—"}
            </div>
        </div>
    )
}

export function TripHeader({
    departureDate,
    returnDate,
    className,
}: TripHeaderProps) {
    if (!departureDate && !returnDate) return null

    return (
        <div className={cn("flex gap-12", className)}>
            <TripPointItem
                label="Старт"
                date={departureDate}
                dotColor="bg-[#84cc16]"
                colorClass="text-[#84cc16]"
            />
            <TripPointItem
                label="Финиш"
                date={returnDate}
                dotColor="bg-[#a855f7]"
                colorClass="text-[#a855f7]"
            />
        </div>
    )
}
