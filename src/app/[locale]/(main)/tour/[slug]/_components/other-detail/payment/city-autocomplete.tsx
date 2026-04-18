"use client"

import { cn } from "@/lib/utils/shadcn"
import { useCityAutocomplete } from "../../../_hooks/use-city-autocomplete"
import type { City } from "../../../_types/payment"

interface CityAutocompleteProps {
    placeholder: string
    initialCity?: City | null
    onSelect: (city: City) => void
    showCode?: boolean
    className?: string
    "aria-label"?: string
}

export function CityAutocomplete({
    placeholder,
    initialCity,
    onSelect,
    showCode = false,
    className,
    "aria-label": ariaLabel,
}: CityAutocompleteProps) {
    const {
        query,
        suggestions,
        isOpen,
        selected,
        inputRef,
        search,
        handleFocus,
        handleSelect,
        handleBlur,
    } = useCityAutocomplete(initialCity ?? null)

    function handleCitySelect(city: City) {
        handleSelect(city)
        onSelect(city)
    }

    return (
        <div className={cn("relative w-full", className)}>
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => search(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    aria-label={ariaLabel ?? placeholder}
                    aria-autocomplete="list"
                    aria-expanded={isOpen}
                    role="combobox"
                    className={cn(
                        "h-[52px] w-full rounded-[8px] border border-[0.5px] border-border",
                        "bg-muted px-3.5 pr-16 text-sm text-foreground",
                        "placeholder:text-muted-foreground",
                        "outline-none transition-colors duration-150",
                        "hover:border-border/70",
                        "focus:border-[#84cc16] focus:bg-background",
                    )}
                />
                {showCode && selected && (
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded bg-muted px-1.5 py-0.5 text-[11px] font-semibold tracking-widest text-muted-foreground">
                        {selected.code}
                    </span>
                )}
            </div>

            {isOpen && suggestions.length > 0 && (
                <div
                    role="listbox"
                    className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-[8px] border border-[0.5px] border-border bg-background shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                >
                    {suggestions.map((city) => (
                        <button
                            key={city.code}
                            role="option"
                            aria-selected={selected?.code === city.code}
                            onMouseDown={() => handleCitySelect(city)}
                            className={cn(
                                "flex w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors duration-100",
                                "hover:bg-muted",
                                selected?.code === city.code && "bg-muted",
                            )}
                        >
                            <div className="min-w-0 flex-1">
                                <div className="text-sm text-foreground">
                                    {city.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {city.country} · {city.sub}
                                </div>
                            </div>
                            <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[11px] font-semibold tracking-widest text-muted-foreground">
                                {city.code}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
