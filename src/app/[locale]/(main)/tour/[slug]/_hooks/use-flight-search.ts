"use client"

import { useState } from "react"
import { DEFAULT_ORIGIN } from "../_constants/mockdata"
import type {
    CabinClass,
    City,
    FlightSearchValues,
    PassengerCounts,
} from "../_types/payment"

const DEFAULT_PASSENGERS: PassengerCounts = {
    adults: 1,
    childrenUnder12: 0,
    childrenUnder2: 0,
}

export function useFlightSearch() {
    const [from, setFrom] = useState<City | null>(DEFAULT_ORIGIN)
    const [to, setTo] = useState<City | null>(null)
    const [departureDate, setDepartureDate] = useState<Date | null>(null)
    const [returnDate, setReturnDate] = useState<Date | null>(null)
    const [passengers, setPassengers] =
        useState<PassengerCounts>(DEFAULT_PASSENGERS)
    const [cabinClass, setCabinClass] = useState<CabinClass>("econom")

    const totalPassengers =
        passengers.adults +
        passengers.childrenUnder12 +
        passengers.childrenUnder2

    const passengerLabel =
        totalPassengers === 1 ? "1 пассажир" : `${totalPassengers} пассажира`

    function updatePassenger(
        key: keyof PassengerCounts,
        delta: 1 | -1,
        min: number,
        max: number,
    ) {
        setPassengers((prev) => ({
            ...prev,
            [key]: Math.min(max, Math.max(min, prev[key] + delta)),
        }))
    }

    function handleDepartureSelect(date: Date) {
        setDepartureDate(date)
        if (returnDate && returnDate <= date) setReturnDate(null)
    }

    function handleReturnSelect(date: Date) {
        setReturnDate(date)
    }

    const values: FlightSearchValues = {
        from,
        to,
        departureDate,
        returnDate,
        passengers,
        cabinClass,
    }

    return {
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
    }
}
