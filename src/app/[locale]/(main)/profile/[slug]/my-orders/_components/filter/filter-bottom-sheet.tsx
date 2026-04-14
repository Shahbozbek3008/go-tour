"use client"

import { RadioItem } from "@/components/radio-item"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { RadioGroup } from "@/components/ui/radio-group"
import { FILTER_OPTIONS } from "../../_constants"
import { useFilter } from "../../_hooks"

interface FilterBottomSheetProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const FilterBottomSheet = ({
    open,
    onOpenChange,
}: FilterBottomSheetProps) => {
    const {
        filters,
        setFilters,
        resetFilters,
        hasActiveFilters,
        activeFiltersCount,
    } = useFilter()

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="max-h-[92dvh] flex flex-col">
                <DrawerHeader className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-zinc-100 shrink-0">
                    <div className="flex items-center gap-2">
                        <DrawerTitle className="text-[15px] font-bold text-zinc-900 tracking-tight">
                            Filterlar
                        </DrawerTitle>
                        {activeFiltersCount > 0 && (
                            <Badge className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                                {activeFiltersCount}
                            </Badge>
                        )}
                    </div>
                </DrawerHeader>

                <div className="overflow-y-auto flex-1 px-5 divide-y divide-zinc-100">
                    <RadioGroup
                        value={filters.category}
                        onValueChange={(val) =>
                            setFilters((p) => ({ ...p, category: val }))
                        }
                        className="gap-0"
                    >
                        {FILTER_OPTIONS.map((option) => (
                            <RadioItem
                                key={option.value}
                                id={`bs-cat-${option.value}`}
                                value={option.value}
                                label={option.label}
                                isActive={filters.category === option.value}
                            />
                        ))}
                    </RadioGroup>
                </div>

                <div className="shrink-0 px-5 py-4 border-t border-zinc-100 flex gap-3">
                    <Button
                        variant="outline"
                        onClick={resetFilters}
                        disabled={!hasActiveFilters}
                        className="flex-1 rounded-xl h-11 border-zinc-200 text-zinc-600"
                    >
                        Tozalash
                    </Button>
                    <DrawerClose asChild>
                        <Button className="flex-1 rounded-xl h-11">
                            Natijalarni ko'rish
                        </Button>
                    </DrawerClose>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
