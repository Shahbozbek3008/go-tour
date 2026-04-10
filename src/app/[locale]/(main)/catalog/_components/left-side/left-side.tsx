"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils/shadcn"
import {
    CATEGORIES,
    DURATIONS,
    PRICE_MAX,
    PRICE_MIN,
    RATINGS,
    TAGS,
} from "../../_constants"
import { useFilter } from "../../_hooks"
import { FilterSection } from "./filter-section"
import { RadioItem } from "./radio-item"
import { StarDisplay } from "./star-display"

export const CatalogLeftSide = () => {
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
    } = useFilter()

    return (
        <aside className="w-full max-w-[300px] border border-zinc-200 rounded-xl p-3 shrink-0 sticky top-24">
            <div className="flex items-center justify-between mb-1">
                <span className="text-[15px] font-bold text-zinc-900 tracking-tight">
                    Filterlar
                </span>
            </div>

            <div className="divide-y divide-zinc-100">
                <FilterSection title="Kategoriya">
                    <RadioGroup
                        value={filters.category}
                        onValueChange={(val) =>
                            setFilters((p) => ({ ...p, category: val }))
                        }
                        className="gap-0"
                    >
                        {CATEGORIES.map(({ id, label }) => (
                            <RadioItem
                                key={id}
                                id={`cat-${id}`}
                                value={id}
                                label={label}
                                isActive={filters.category === id}
                            />
                        ))}
                    </RadioGroup>
                </FilterSection>

                {/* ── Narx ── */}
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
                        value={filters.rating}
                        onValueChange={(val) =>
                            setFilters((p) => ({ ...p, rating: val }))
                        }
                        className="gap-0"
                    >
                        {RATINGS.map(({ value, label, stars }) => (
                            <RadioItem
                                key={value}
                                id={`rat-${value}`}
                                value={value}
                                isActive={filters.rating === value}
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
                    <p className="text-[12px] text-zinc-400 py-1">Tez kunda…</p>
                </FilterSection>

                <FilterSection title="Mashhur teglar">
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {TAGS.map((tag) => {
                            const active = filters.tags.includes(tag)
                            return (
                                <button
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    className={cn(
                                        "inline-flex items-center rounded-full px-2.5 py-1",
                                        "text-[12px] font-medium transition-all duration-150",
                                        "focus-visible:outline-none",
                                        active ?
                                            "bg-primary text-white"
                                        :   "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700",
                                    )}
                                >
                                    {tag}
                                </button>
                            )
                        })}
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
    )
}

export default CatalogLeftSide
