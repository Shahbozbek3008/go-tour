"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { CURRENCIES } from "@/lib/constants/currency"
import { getStoredCurrency, setStoredCurrency } from "@/lib/cookies/currency"
import { cn } from "@/lib/utils/shadcn"
import { CheckIcon, ChevronDown } from "lucide-react"
import { useState } from "react"

export default function CurrencySelect() {
    const { queryClient } = useRevalidate()
    const [currency, setCurrency] = useState(() => {
        const storedCurrencyId = getStoredCurrency()
        return (
            CURRENCIES.find((c) => c.id === storedCurrencyId) || CURRENCIES[0]
        )
    })

    function handleCurrencyChange(o: (typeof CURRENCIES)[number]) {
        setCurrency(o)
        setStoredCurrency(o.id)
        queryClient.invalidateQueries()
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger
                className={cn(
                    "flex items-center gap-1 w-14 shadow-none border-none px-2 focus:ring-0 focus:outline-none focus-visible:ring-0 data-[state=open]:ring-0 data-[state=open]:outline-none uppercase",
                    "data-[state=open]:[&_svg]:rotate-180",
                )}
            >
                {currency.iso}{" "}
                <span>
                    <ChevronDown size={16} />
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-20">
                {CURRENCIES.map((o) => {
                    const isActive = o.id === currency.id
                    return (
                        <DropdownMenuItem
                            key={o.id}
                            onClick={() => {
                                handleCurrencyChange(o)
                            }}
                            className={cn(
                                isActive && "bg-accent",
                                "cursor-pointer",
                            )}
                        >
                            <div className="flex items-center gap-2 w-full uppercase">
                                {/* <Image
                                    width={16}
                                    height={16}
                                    src={item.src}
                                    alt={item.label}
                                    className="w-4 h-4"
                                /> */}
                                {o.iso}
                                {isActive && (
                                    <span className="flex-1 flex justify-end">
                                        <CheckIcon size={16} />
                                    </span>
                                )}
                            </div>
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
