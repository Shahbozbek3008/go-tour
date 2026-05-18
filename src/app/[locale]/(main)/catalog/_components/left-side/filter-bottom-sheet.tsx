"use client"

import { useCurrency } from "@/app/_providers/currency-provider"
import ClientTranslate from "@/components/common/translation/client-translate"
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
import { useAllDestinationsQuery } from "@/hooks/react-query/use-all-destinations-query"
import { useLanguage } from "@/hooks/use-language"
import { formatNumber } from "@/lib/utils/format-number"
import { getCurrencySign } from "@/lib/utils/money"
import { cn } from "@/lib/utils/shadcn"
import { Info, Minus, Plus, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import {
    CATEGORIES,
    DURATIONS,
    getPriceLimit,
    LANGUAGES,
    RATINGS,
} from "../../_constants"
import { useFilter } from "../../_hooks"
import { ChildAgeSelect } from "./child-select"
import { FilterSection } from "./filter-section"
import { RadioItem } from "./radio-item"
import { StarDisplay } from "./star-display"

const CATEGORIES_DEFAULT_COUNT = 6
const LANGUAGES_DEFAULT_COUNT = 4
const DESTINATIONS_DEFAULT_COUNT = 5

interface FilterBottomSheetProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    totalTours: number
}

export const FilterBottomSheet = ({
    open,
    onOpenChange,
    totalTours,
}: FilterBottomSheetProps) => {
    const t = useTranslations()
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
        toggleDestination,
    } = useFilter()
    const { currency } = useCurrency()
    const { isRussian } = useLanguage()
    const {
        min: PRICE_MIN,
        max: PRICE_MAX,
        step: PRICE_STEP,
    } = getPriceLimit(currency)
    const currencySign = getCurrencySign(currency)
    const sign = currencySign.symbol || currencySign.iso
    const { allDestinations } = useAllDestinationsQuery()
    const [showAllDestinations, setShowAllDestinations] = useState(false)
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

    const visibleDestinations =
        showAllDestinations ? allDestinations : (
            allDestinations.slice(0, DESTINATIONS_DEFAULT_COUNT)
        )

    const hasMoreCategories = CATEGORIES.length > CATEGORIES_DEFAULT_COUNT
    const hiddenCount = CATEGORIES.length - CATEGORIES_DEFAULT_COUNT

    const hasMoreLanguages = LANGUAGES.length > LANGUAGES_DEFAULT_COUNT
    const hiddenLanguageCount = LANGUAGES.length - LANGUAGES_DEFAULT_COUNT
    const hiddenDestinationCount =
        allDestinations.length - DESTINATIONS_DEFAULT_COUNT

    const hasMoreDestinations =
        allDestinations.length > DESTINATIONS_DEFAULT_COUNT

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent
                className={cn(
                    "flex h-[100dvh] max-h-[100dvh] flex-col rounded-none border-0",
                    "[&[data-vaul-drawer-direction=bottom]]:inset-0",
                    "[&[data-vaul-drawer-direction=bottom]]:mt-0",
                    "[&[data-vaul-drawer-direction=bottom]]:max-h-[100dvh]",
                    "[&[data-vaul-drawer-direction=bottom]]:rounded-none",
                    "[&[data-vaul-drawer-direction=bottom]]:border-0",
                )}
            >
                <DrawerHeader className="sticky top-0 bg-white flex items-center justify-between z-10 pt-4 pb-3 border-b border-zinc-100 shrink-0">
                    <div className="flex items-center w-full justify-between gap-2">
                        <DrawerTitle className="flex items-center gap-2 text-[15px] font-bold text-zinc-900 tracking-tight">
                            <ClientTranslate translationKey="catalogFilterTitle" />
                            {activeFiltersCount > 0 && (
                                <Badge className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-blue-600 text-white text-[11px] font-bold">
                                    {activeFiltersCount}
                                </Badge>
                            )}
                        </DrawerTitle>
                        {hasActiveFilters ?
                            <Button
                                variant="ghost"
                                onClick={resetFilters}
                                className="text-red-500 hover:text-red-600 p-0! hover:bg-transparent"
                            >
                                <ClientTranslate translationKey="catalogFilterClear" />
                            </Button>
                        :   <DrawerClose asChild>
                                <button
                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-700 transition-colors duration-150 focus-visible:outline-none"
                                    aria-label={t("catalogFilterClose")}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </DrawerClose>
                        }
                    </div>
                </DrawerHeader>

                <div className="overflow-y-auto no-scrollbar flex-1 px-5 divide-y divide-zinc-100">
                    <div className="py-2.5 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 cursor-pointer select-none">
                                <span className="text-[14px] text-zinc-900 font-medium">
                                    <ClientTranslate translationKey="catalogFilterDiscountOnly" />
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
                                    <ClientTranslate translationKey="catalogFilterTrustedOnly" />
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
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 cursor-pointer select-none">
                                <span className="text-[14px] text-zinc-900 font-medium">
                                    <ClientTranslate translationKey="catalogFilterReviewsOnly" />
                                </span>
                                <Info
                                    strokeWidth={1.5}
                                    className="w-[18px] h-[18px] text-zinc-400"
                                />
                            </div>
                            <Switch
                                checked={filters.hasReviews}
                                onCheckedChange={(val) =>
                                    setFilters((p) => ({
                                        ...p,
                                        hasReviews: val,
                                    }))
                                }
                                className="data-[state=checked]:bg-blue-600"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 cursor-pointer select-none">
                                <span className="text-[14px] text-zinc-900 font-medium">
                                    <ClientTranslate translationKey="catalogFilterNoVisa" />
                                </span>
                                <Info
                                    strokeWidth={1.5}
                                    className="w-[18px] h-[18px] text-zinc-400"
                                />
                            </div>
                            <Switch
                                checked={filters.visaRequired}
                                onCheckedChange={(val) =>
                                    setFilters((p) => ({
                                        ...p,
                                        visaRequired: val,
                                    }))
                                }
                                className="data-[state=checked]:bg-blue-600"
                            />
                        </div>
                    </div>

                    <FilterSection title={t("catalogFilterCategory")}>
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
                                        label={
                                            <ClientTranslate
                                                translationKey={label}
                                            />
                                        }
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
                                    t("catalogFilterShowLess")
                                :   t("catalogFilterAllTours", {
                                        count: hiddenCount,
                                    })
                                }
                            </button>
                        )}
                    </FilterSection>

                    <FilterSection title={t("catalogFilterPrice")}>
                        <div className="space-y-3 pt-1">
                            <Slider
                                min={PRICE_MIN}
                                max={PRICE_MAX}
                                step={PRICE_STEP}
                                value={filters.priceRange}
                                onValueChange={handlePriceSlider}
                                className="w-full"
                            />
                            <div className="flex items-center justify-between text-[11px] text-zinc-400 select-none">
                                <span>
                                    {sign}
                                    {formatNumber(PRICE_MIN, {
                                        isShowZero: true,
                                    })}
                                </span>
                                <span>
                                    {sign}
                                    {formatNumber(PRICE_MAX / 2)}
                                </span>
                                <span>
                                    {sign}
                                    {formatNumber(PRICE_MAX)}
                                </span>
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
                                        className="pl-5 h-8 text-xs tabular-nums border-zinc-200 rounded-lg bg-zinc-50 shadow-none focus-visible:ring-0 focus-visible:border-zinc-400"
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

                    <FilterSection
                        title={t("catalogFilterDuration")}
                        defaultOpen={false}
                    >
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
                                    label={
                                        <ClientTranslate
                                            translationKey={label}
                                        />
                                    }
                                    isActive={filters.duration === value}
                                />
                            ))}
                        </RadioGroup>
                    </FilterSection>

                    <FilterSection title={t("catalogFilterRating")}>
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
                                            <span>
                                                {value === "all" ?
                                                    <ClientTranslate
                                                        translationKey={label}
                                                    />
                                                :   <ClientTranslate
                                                        translationKey="rat_stars"
                                                        values={{
                                                            stars: label,
                                                        }}
                                                    />
                                                }
                                            </span>
                                            {stars > 0 && (
                                                <StarDisplay filled={stars} />
                                            )}
                                        </span>
                                    }
                                />
                            ))}
                        </RadioGroup>
                    </FilterSection>

                    <FilterSection title={t("catalogFilterPopularCities")}>
                        <div className="flex flex-col gap-1 pt-0.5">
                            <div
                                className={cn(
                                    "overflow-hidden transition-all duration-300 ease-in-out flex flex-col gap-2",
                                    showAllDestinations ? "max-h-[1000px]" : (
                                        "max-h-[185px]"
                                    ),
                                )}
                            >
                                {visibleDestinations.map((dest) => {
                                    const active =
                                        filters.destinations.includes(dest.id)
                                    return (
                                        <FieldGroup
                                            className="w-full"
                                            key={dest.id}
                                        >
                                            <Field orientation="horizontal">
                                                <Checkbox
                                                    id={`dest-${dest.id}`}
                                                    name={`dest-${dest.id}`}
                                                    checked={active}
                                                    onCheckedChange={() =>
                                                        toggleDestination(
                                                            dest.id,
                                                        )
                                                    }
                                                />
                                                <FieldLabel
                                                    htmlFor={`dest-${dest.id}`}
                                                    className="cursor-pointer text-zinc-500 text-[14px]"
                                                >
                                                    {isRussian ?
                                                        dest.nameRu
                                                    :   dest.nameUz}
                                                </FieldLabel>
                                            </Field>
                                        </FieldGroup>
                                    )
                                })}
                            </div>
                            {hasMoreDestinations && (
                                <button
                                    onClick={() =>
                                        setShowAllDestinations((prev) => !prev)
                                    }
                                    className="cursor-pointer mt-2 w-full rounded-lg bg-zinc-100 py-2 text-[13px] font-medium text-zinc-600 transition-colors duration-150 focus-visible:outline-none"
                                >
                                    {showAllDestinations ?
                                        t("catalogFilterShowLess")
                                    :   t("catalogFilterAllCities", {
                                            count: hiddenDestinationCount,
                                        })
                                    }
                                </button>
                            )}
                        </div>
                    </FilterSection>
                    <FilterSection title={t("catalogFilterAdditional")}>
                        <div className="flex flex-col gap-4 pt-1">
                            <div className="space-y-2">
                                <span className="text-[13px] font-medium text-zinc-600 block">
                                    <ClientTranslate translationKey="catalogFilterChildCount" />
                                </span>
                                <div className="flex items-center justify-between p-3 border border-zinc-200 rounded-xl bg-zinc-50/50">
                                    <div className="flex flex-col">
                                        <span className="text-[11px] text-zinc-400 font-medium leading-none mb-1">
                                            <ClientTranslate translationKey="catalogFilterChildCount" />
                                        </span>
                                        <span className="text-[16px] font-bold text-zinc-900 tabular-nums">
                                            {filters.childrenCount ?? 0}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                setFilters((p) => ({
                                                    ...p,
                                                    childrenCount:
                                                        (
                                                            (p.childrenCount ??
                                                                0) <= 1
                                                        ) ?
                                                            null
                                                        :   (p.childrenCount ??
                                                                0) - 1,
                                                }))
                                            }
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white hover:opacity-90 transition-opacity"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setFilters((p) => ({
                                                    ...p,
                                                    childrenCount:
                                                        (p.childrenCount ?? 0) +
                                                        1,
                                                }))
                                            }
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-100 text-zinc-400 hover:bg-zinc-200 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <span className="text-[13px] font-medium text-zinc-600 block">
                                    <ClientTranslate translationKey="catalogFilterChildAgeLabel" />
                                </span>
                                <ChildAgeSelect
                                    value={filters.childAge}
                                    onChange={(val) =>
                                        setFilters((p) => ({
                                            ...p,
                                            childAge: val,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    </FilterSection>
                    <FilterSection title={t("catalogFilterByLanguage")}>
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
                                                <ClientTranslate
                                                    translationKey={lang.label}
                                                />
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
                                        t("catalogFilterShowLess")
                                    :   t("catalogFilterAllLanguages", {
                                            count: hiddenLanguageCount,
                                        })
                                    }
                                </button>
                            )}
                        </div>
                    </FilterSection>
                </div>

                <div className="sticky -bottom-4 bg-white px-5 py-4 border-t border-zinc-100 flex gap-3">
                    <DrawerClose asChild>
                        <Button className="flex-1 rounded-xl h-11">
                            {t("catalogFilterShowResultsCount", {
                                count: totalTours,
                            })}
                        </Button>
                    </DrawerClose>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
