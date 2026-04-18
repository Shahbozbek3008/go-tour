"use client"

import { cn } from "@/lib/utils/shadcn"
import { ChevronDownIcon, MinusIcon, PlusIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import {
    MAX_ADULTS,
    MAX_CHILDREN_UNDER_12,
    MAX_CHILDREN_UNDER_2,
} from "../../../_constants/mockdata"
import type { CabinClass, PassengerCounts } from "../../../_types/payment"

interface PassengerSelectorProps {
    passengers: PassengerCounts
    cabinClass: CabinClass
    passengerLabel: string
    onChangePassenger: (
        key: keyof PassengerCounts,
        delta: 1 | -1,
        min: number,
        max: number,
    ) => void
    onChangeCabinClass: (cls: CabinClass) => void
}

interface CounterRowProps {
    label: string
    sub?: string
    value: number
    min: number
    max: number
    onDecrement: () => void
    onIncrement: () => void
}

function CounterRow({
    label,
    sub,
    value,
    min,
    max,
    onDecrement,
    onIncrement,
}: CounterRowProps) {
    return (
        <div className="flex items-center justify-between py-2.5 border-b border-[0.5px] border-border last:border-0">
            <div>
                <div className="text-sm text-foreground">{label}</div>
                {sub && (
                    <div className="text-[11px] text-muted-foreground">
                        {sub}
                    </div>
                )}
            </div>
            <div className="flex items-center gap-2.5">
                <button
                    type="button"
                    onClick={onDecrement}
                    disabled={value <= min}
                    aria-label={`Убрать: ${label}`}
                    className={cn(
                        "flex h-[26px] w-[26px] items-center justify-center rounded-full border-[1.5px] border-[#84cc16]",
                        "text-[#84cc16] transition-colors duration-120",
                        "hover:bg-[#84cc16] hover:text-white",
                        "disabled:cursor-not-allowed disabled:border-border disabled:text-muted-foreground disabled:hover:bg-transparent disabled:hover:text-muted-foreground",
                    )}
                >
                    <MinusIcon className="h-3.5 w-3.5" />
                </button>
                <span className="w-4 text-center text-sm font-medium text-foreground">
                    {value}
                </span>
                <button
                    type="button"
                    onClick={onIncrement}
                    disabled={value >= max}
                    aria-label={`Добавить: ${label}`}
                    className={cn(
                        "flex h-[26px] w-[26px] items-center justify-center rounded-full border-[1.5px] border-[#84cc16]",
                        "text-[#84cc16] transition-colors duration-120",
                        "hover:bg-[#84cc16] hover:text-white",
                        "disabled:cursor-not-allowed disabled:border-border disabled:text-muted-foreground disabled:hover:bg-transparent disabled:hover:text-muted-foreground",
                    )}
                >
                    <PlusIcon className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    )
}

interface RadioOptionProps {
    label: string
    checked: boolean
    onClick: () => void
}

function RadioOption({ label, checked, onClick }: RadioOptionProps) {
    return (
        <button
            type="button"
            role="radio"
            aria-checked={checked}
            onClick={onClick}
            className="flex items-center gap-2.5 py-2 text-sm text-foreground w-full text-left"
        >
            <div
                className={cn(
                    "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors duration-120",
                    checked ? "border-[#84cc16]" : "border-border",
                )}
            >
                {checked && (
                    <div className="h-[9px] w-[9px] rounded-full bg-[#84cc16]" />
                )}
            </div>
            {label}
        </button>
    )
}

export function PassengerSelector({
    passengers,
    cabinClass,
    passengerLabel,
    onChangePassenger,
    onChangeCabinClass,
}: PassengerSelectorProps) {
    const [isOpen, setIsOpen] = useState(false)
    const wrapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleOutside(e: MouseEvent) {
            if (
                wrapRef.current &&
                !wrapRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleOutside)
        return () => document.removeEventListener("mousedown", handleOutside)
    }, [])

    return (
        <div ref={wrapRef} className="relative">
            <button
                type="button"
                aria-expanded={isOpen}
                aria-haspopup="dialog"
                onClick={() => setIsOpen((v) => !v)}
                className={cn(
                    "flex h-[52px] w-full items-center justify-between rounded-[8px] border border-[0.5px] border-border",
                    "bg-muted px-3.5 text-sm text-foreground transition-colors duration-150",
                    "hover:border-border/70",
                    isOpen && "border-[#84cc16] bg-background",
                )}
            >
                <span>{passengerLabel}</span>
                <ChevronDownIcon
                    className={cn(
                        "h-4 w-4 text-[#84cc16] transition-transform duration-200",
                        isOpen && "rotate-180",
                    )}
                />
            </button>

            {isOpen && (
                <div
                    role="dialog"
                    aria-label="Выбор пассажиров и класса"
                    className={cn(
                        "absolute left-0 right-0 top-[calc(100%+6px)] z-50 rounded-[8px]",
                        "border border-[0.5px] border-[#84cc16] bg-background p-4",
                        "shadow-[0_8px_24px_rgba(0,0,0,0.08)]",
                    )}
                >
                    <CounterRow
                        label="Взрослые"
                        value={passengers.adults}
                        min={1}
                        max={MAX_ADULTS}
                        onDecrement={() =>
                            onChangePassenger("adults", -1, 1, MAX_ADULTS)
                        }
                        onIncrement={() =>
                            onChangePassenger("adults", 1, 1, MAX_ADULTS)
                        }
                    />
                    <CounterRow
                        label="Дети до 12 лет"
                        value={passengers.childrenUnder12}
                        min={0}
                        max={MAX_CHILDREN_UNDER_12}
                        onDecrement={() =>
                            onChangePassenger(
                                "childrenUnder12",
                                -1,
                                0,
                                MAX_CHILDREN_UNDER_12,
                            )
                        }
                        onIncrement={() =>
                            onChangePassenger(
                                "childrenUnder12",
                                1,
                                0,
                                MAX_CHILDREN_UNDER_12,
                            )
                        }
                    />
                    <CounterRow
                        label="Дети до 2 лет"
                        value={passengers.childrenUnder2}
                        min={0}
                        max={MAX_CHILDREN_UNDER_2}
                        onDecrement={() =>
                            onChangePassenger(
                                "childrenUnder2",
                                -1,
                                0,
                                MAX_CHILDREN_UNDER_2,
                            )
                        }
                        onIncrement={() =>
                            onChangePassenger(
                                "childrenUnder2",
                                1,
                                0,
                                MAX_CHILDREN_UNDER_2,
                            )
                        }
                    />

                    <div
                        className="mt-3 border-t border-[0.5px] border-border pt-3"
                        role="radiogroup"
                        aria-label="Класс обслуживания"
                    >
                        <RadioOption
                            label="Эконом"
                            checked={cabinClass === "econom"}
                            onClick={() => onChangeCabinClass("econom")}
                        />
                        <RadioOption
                            label="Бизнес"
                            checked={cabinClass === "business"}
                            onClick={() => onChangeCabinClass("business")}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
