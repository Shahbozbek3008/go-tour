"use client"

import { cn } from "@/lib/utils/shadcn"
import { PlaneTakeoffIcon } from "lucide-react"
import { DEFAULT_ORIGIN } from "../../../_constants/mockdata"
import { useFlightSearch } from "../../../_hooks/use-flight-search"
import { CityAutocomplete } from "./city-autocomplete"
import { DateRangePicker } from "./daterange-picker"
import { PassengerSelector } from "./passenger-selector"

export function FlightSearchForm() {
    const {
        setTo,
        values,
        setFrom,
        cabinClass,
        returnDate,
        passengers,
        setCabinClass,
        departureDate,
        passengerLabel,
        updatePassenger,
        handleReturnSelect,
        handleDepartureSelect,
    } = useFlightSearch()

    return (
        <div className="w-full mb-16">
            <div className="rounded-[14px] border border-[0.5px] border-border bg-card p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <CityAutocomplete
                            placeholder="Where from"
                            initialCity={DEFAULT_ORIGIN}
                            onSelect={setFrom}
                            showCode
                            aria-label="Where from"
                        />
                        <CityAutocomplete
                            placeholder="Where to — city or airport"
                            onSelect={setTo}
                            aria-label="Where to — city or airport"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="grid grid-cols-2 gap-3 sm:col-span-2">
                            <DateRangePicker
                                departureDate={departureDate}
                                returnDate={returnDate}
                                onDepartureSelect={handleDepartureSelect}
                                onReturnSelect={handleReturnSelect}
                            />
                        </div>

                        <PassengerSelector
                            passengers={passengers}
                            cabinClass={cabinClass}
                            passengerLabel={passengerLabel}
                            onChangePassenger={updatePassenger}
                            onChangeCabinClass={setCabinClass}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => {}}
                        disabled={!values.to}
                        className={cn(
                            "h-[52px] w-full rounded-[8px] border border-[0.5px] border-border",
                            "font-display bg-muted font-semibold tracking-[0.01em] text-muted-foreground",
                            "transition-all duration-150",
                            "hover:border-lime-500 hover:bg-lime-500 hover:text-white",
                            "active:scale-[0.99]",
                            "disabled:cursor-not-allowed disabled:opacity-60",
                            "disabled:hover:border-border disabled:hover:bg-muted disabled:hover:text-muted-foreground",
                        )}
                        aria-label="Find tickets"
                    >
                        Find tickets
                    </button>
                </div>

                <div className="mt-3 flex items-center justify-end gap-1.5">
                    <PlaneTakeoffIcon className="h-3.5 w-3.5 text-muted-foreground/50" />
                    <span className="text-[11px] text-muted-foreground/50">
                        Powered by
                    </span>
                    <span className="text-[11px] font-semibold text-lime-700">
                        Aviasales
                    </span>
                </div>
            </div>
        </div>
    )
}
