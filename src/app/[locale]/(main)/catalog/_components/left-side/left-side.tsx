"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils/shadcn"
import { Info } from "lucide-react"
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

export const CatalogLeftSide = () => {
    const {
        filters,
        minInput,
        maxInput,
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
        <div className="w-full">
            <aside className="w-[300px] border border-zinc-200 rounded-xl p-3 shrink-0 sticky top-24">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[15px] font-bold text-zinc-900 tracking-tight">
                        Filterlar
                    </span>
                    {activeFiltersCount > 0 && (
                        <Badge className="flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full bg-blue-600 text-white text-[11px] font-bold animate-in zoom-in duration-300">
                            {activeFiltersCount}
                        </Badge>
                    )}
                </div>

                <div className="divide-y divide-zinc-100">
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
                                        id={`cat-${id}`}
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
                                        value={minInput}
                                        onChange={handleMinInput}
                                        min={PRICE_MIN}
                                        max={filters.priceRange[1]}
                                        type="number"
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
                                    id={`dur-${value}`}
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
                                    id={`rat-${value}`}
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
                                                id={`lang-${lang.id}`}
                                                name={`lang-${lang.id}`}
                                                checked={active}
                                                onCheckedChange={() =>
                                                    toggleLanguage(lang.id)
                                                }
                                            />
                                            <FieldLabel
                                                htmlFor={`lang-${lang.id}`}
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
                <Button
                    size="lg"
                    onClick={resetFilters}
                    disabled={!hasActiveFilters}
                    className="w-full mt-4 rounded-lg"
                >
                    Tozalash
                </Button>
            </aside>
        </div>
    )
}

export default CatalogLeftSide
