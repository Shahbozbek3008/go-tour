"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils/shadcn"
import { Info, X } from "lucide-react"
import { useState } from "react"
import {
    CATEGORIES,
    DURATIONS,
    LANGUAGES,
    PRICE_MAX,
    PRICE_MIN,
    RATINGS,
} from "../../_constants"
import { useFilter } from "../../_hooks"
import { FilterSection } from "./filter-section"
import { RadioItem } from "./radio-item"
import { StarDisplay } from "./star-display"

const CATEGORIES_DEFAULT_COUNT = 6
const LANGUAGES_DEFAULT_COUNT = 4

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
        minInput,
        maxInput,
        toggleTag,
        setFilters,
        resetFilters,
        handleMinInput,
        handleMaxInput,
        hasActiveFilters,
        handlePriceSlider,
        activeFiltersCount,
        toggleLanguage,
    } = useFilter()

    const [showAllCategories, setShowAllCategories] = useState(false)
    const [showAllLanguages, setShowAllLanguages] = useState(false)

    const visibleCategories =
        showAllCategories ? CATEGORIES : (
            CATEGORIES.slice(0, CATEGORIES_DEFAULT_COUNT)
        )

    const visibleLanguages =
        showAllLanguages ? LANGUAGES : (
            LANGUAGES.slice(0, LANGUAGES_DEFAULT_COUNT)
        )

    const hasMoreCategories = CATEGORIES.length > CATEGORIES_DEFAULT_COUNT
    const hiddenCount = CATEGORIES.length - CATEGORIES_DEFAULT_COUNT

    const hasMoreLanguages = LANGUAGES.length > LANGUAGES_DEFAULT_COUNT
    const hiddenLanguageCount = LANGUAGES.length - LANGUAGES_DEFAULT_COUNT

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="h-[100vh] flex flex-col rounded-none">
                <DrawerHeader className="sticky top-0 bg-white flex items-center justify-between z-10 pt-4 pb-3 border-b border-zinc-100 shrink-0">
                    <div className="flex items-center w-full justify-between gap-2">
                        <DrawerTitle className="flex items-center gap-2 text-[15px] font-bold text-zinc-900 tracking-tight">
                            Filterlar
                            {activeFiltersCount > 0 && (
                                <Badge className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-blue-600 text-white text-[11px] font-bold">
                                    {activeFiltersCount}
                                </Badge>
                            )}
                        </DrawerTitle>
                        <DrawerClose asChild>
                            <button
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-700 transition-colors duration-150 focus-visible:outline-none"
                                aria-label="Yopish"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </DrawerClose>
                    </div>
                </DrawerHeader>

                <div className="overflow-y-auto no-scrollbar flex-1 px-5 divide-y divide-zinc-100">
                    <div className="py-2.5 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 cursor-pointer select-none">
                                <span className="text-[14px] text-zinc-900 font-medium">
                                    Faqat skidkali turlar
                                </span>
                                <Info
                                    strokeWidth={1.5}
                                    className="w-[18px] h-[18px] text-zinc-400"
                                />
                            </div>
                            <Switch
                                checked={filters.promotional}
                                onCheckedChange={(val) =>
                                    setFilters((p) => ({
                                        ...p,
                                        promotional: val,
                                    }))
                                }
                                className="data-[state=checked]:bg-blue-600"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 cursor-pointer select-none">
                                <span className="text-[14px] text-zinc-900 font-medium">
                                    Ishonchli turlar
                                </span>
                                <Info
                                    strokeWidth={1.5}
                                    className="w-[18px] h-[18px] text-zinc-400"
                                />
                            </div>
                            <Switch
                                checked={filters.guaranteed}
                                onCheckedChange={(val) =>
                                    setFilters((p) => ({
                                        ...p,
                                        guaranteed: val,
                                    }))
                                }
                                className="data-[state=checked]:bg-blue-600"
                            />
                        </div>
                    </div>

                    <FilterSection title="Kategoriya">
                        <RadioGroup
                            value={filters.category}
                            onValueChange={(val) =>
                                setFilters((p) => ({ ...p, category: val }))
                            }
                            className="gap-0"
                        >
                            <div
                                className={cn(
                                    "overflow-hidden transition-all duration-300 ease-in-out",
                                    showAllCategories ? "max-h-[1000px]" : (
                                        "max-h-[220px]"
                                    ),
                                )}
                            >
                                {visibleCategories.map(({ id, label }) => (
                                    <RadioItem
                                        key={id}
                                        id={`bs-cat-${id}`}
                                        value={id}
                                        label={label}
                                        isActive={filters.category === id}
                                    />
                                ))}
                            </div>
                        </RadioGroup>

                        {hasMoreCategories && (
                            <button
                                onClick={() => setShowAllCategories((p) => !p)}
                                className="cursor-pointer mt-2 w-full rounded-lg bg-zinc-100 py-2 text-[13px] font-medium text-zinc-600 transition-colors duration-150 focus-visible:outline-none"
                            >
                                {showAllCategories ?
                                    "Kamroq ko'rsatish"
                                :   `Barcha turlar (${hiddenCount})`}
                            </button>
                        )}
                    </FilterSection>

                    <FilterSection title="Narx">
                        <div className="space-y-3 pt-1">
                            <Slider
                                min={PRICE_MIN}
                                max={PRICE_MAX}
                                step={100}
                                value={filters.priceRange}
                                onValueChange={handlePriceSlider}
                                className="w-full"
                            />
                            <div className="flex items-center justify-between text-[11px] text-zinc-400 select-none">
                                <span>$0</span>
                                <span>$5,000</span>
                                <span>$10,000</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[12px] text-zinc-400 pointer-events-none">
                                        $
                                    </span>
                                    <Input
                                        type="number"
                                        value={minInput}
                                        onChange={handleMinInput}
                                        min={PRICE_MIN}
                                        max={filters.priceRange[1]}
                                        className="pl-5 h-8 text-[12px] tabular-nums border-zinc-200 rounded-lg bg-zinc-50 shadow-none focus-visible:ring-0 focus-visible:border-zinc-400"
                                    />
                                </div>
                                <span className="text-zinc-300 text-sm select-none">
                                    —
                                </span>
                                <div className="relative flex-1">
                                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[12px] text-zinc-400 pointer-events-none">
                                        $
                                    </span>
                                    <Input
                                        type="number"
                                        value={maxInput}
                                        onChange={handleMaxInput}
                                        min={filters.priceRange[0]}
                                        max={PRICE_MAX}
                                        className="pl-5 h-8 text-[12px] tabular-nums border-zinc-200 rounded-lg bg-zinc-50 shadow-none focus-visible:ring-0 focus-visible:border-zinc-400"
                                    />
                                </div>
                            </div>
                        </div>
                    </FilterSection>

                    <FilterSection title="Davomiylik" defaultOpen={false}>
                        <RadioGroup
                            value={filters.duration}
                            onValueChange={(val) =>
                                setFilters((p) => ({ ...p, duration: val }))
                            }
                            className="gap-0"
                        >
                            {DURATIONS.map(({ value, label }) => (
                                <RadioItem
                                    key={value}
                                    id={`bs-dur-${value}`}
                                    value={value}
                                    label={label}
                                    isActive={filters.duration === value}
                                />
                            ))}
                        </RadioGroup>
                    </FilterSection>

                    <FilterSection title="Reyting">
                        <RadioGroup
                            value={filters.rate}
                            onValueChange={(val) =>
                                setFilters((p) => ({ ...p, rate: val }))
                            }
                            className="gap-0"
                        >
                            {RATINGS.map(({ value, label, stars }) => (
                                <RadioItem
                                    key={value}
                                    id={`bs-rat-${value}`}
                                    value={value}
                                    isActive={filters.rate === value}
                                    label={
                                        <span className="flex items-center gap-2">
                                            <span>{label}</span>
                                            {stars > 0 && (
                                                <StarDisplay filled={stars} />
                                            )}
                                        </span>
                                    }
                                />
                            ))}
                        </RadioGroup>
                    </FilterSection>

                    <FilterSection title="Mashhur shaharlar">
                        <p className="text-[12px] text-zinc-400 py-1">
                            Tez kunda…
                        </p>
                    </FilterSection>

                    <FilterSection title="Til bo'yicha">
                        <div className="flex flex-wrap gap-2 pt-0.5 transition-all duration-300 ease-in-out">
                            {visibleLanguages.map((lang) => {
                                const active = filters.languages.includes(
                                    lang.id,
                                )
                                return (
                                    <FieldGroup
                                        className="w-full"
                                        key={lang.id}
                                    >
                                        <Field orientation="horizontal">
                                            <Checkbox
                                                id={`bs-lang-${lang.id}`}
                                                name={`bs-lang-${lang.id}`}
                                                checked={active}
                                                onCheckedChange={() =>
                                                    toggleLanguage(lang.id)
                                                }
                                            />
                                            <FieldLabel
                                                htmlFor={`bs-lang-${lang.id}`}
                                                className="cursor-pointer text-zinc-500"
                                            >
                                                {lang.label}
                                            </FieldLabel>
                                        </Field>
                                    </FieldGroup>
                                )
                            })}
                            {hasMoreLanguages && (
                                <button
                                    onClick={() =>
                                        setShowAllLanguages((prev) => !prev)
                                    }
                                    className="cursor-pointer mt-2 w-full rounded-lg bg-zinc-100 py-2 text-[13px] font-medium text-zinc-600 transition-colors duration-150 focus-visible:outline-none"
                                >
                                    {showAllLanguages ?
                                        "Kamroq ko'rsatish"
                                    :   `Barcha tillar (${hiddenLanguageCount})`
                                    }
                                </button>
                            )}
                        </div>
                    </FilterSection>
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
