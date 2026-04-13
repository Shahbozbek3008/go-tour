"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils/shadcn"

type FilterOption = {
    value: string
    label: string
    count?: number
}

const FILTER_OPTIONS: FilterOption[] = [
    { value: "all", label: "Barchasi" },
    { value: "new", label: "Yangi" },
    { value: "in_progress", label: "Jarayonda" },
    { value: "success", label: "Muvaffaqiyat" },
    { value: "cancelled", label: "Bekor qilingan" },
]

interface MyOrdersFilterProps {
    value?: string
    onChange?: (value: string) => void
}

export const MyOrdersFilter = ({
    value = "all",
    onChange,
}: MyOrdersFilterProps) => {
    return (
        <div className="w-full">
            <p className="text-base font-semibold uppercase mb-3">Filtrlar</p>

            <RadioGroup
                value={value}
                onValueChange={onChange}
                className="flex flex-row flex-wrap gap-2 sm:flex-col sm:gap-1"
            >
                {FILTER_OPTIONS.map((option) => {
                    const isActive = value === option.value

                    return (
                        <Label
                            key={option.value}
                            htmlFor={option.value}
                            className={cn(
                                "flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer",
                                "text-sm transition-colors duration-150 select-none",
                                isActive ?
                                    "bg-blue-50 text-blue-700 font-medium"
                                :   "text-slate-600 hover:bg-slate-50 font-normal",
                            )}
                        >
                            <RadioGroupItem
                                id={option.value}
                                value={option.value}
                                className={cn(
                                    "shrink-0 transition-colors",
                                    isActive ?
                                        "border-blue-600 text-blue-600"
                                    :   "border-slate-300",
                                )}
                            />
                            {option.label}
                            {option.count !== undefined && (
                                <span
                                    className={cn(
                                        "ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                                        isActive ?
                                            "bg-blue-100 text-blue-600"
                                        :   "bg-slate-100 text-slate-400",
                                    )}
                                >
                                    {option.count}
                                </span>
                            )}
                        </Label>
                    )
                })}
            </RadioGroup>
        </div>
    )
}
