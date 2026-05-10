export interface City {
    name: string
    country: string
    code: string
    sub: string
}

export interface PassengerCounts {
    adults: number
    childrenUnder12: number
    childrenUnder2: number
}

export type CabinClass = "econom" | "business"

export interface FlightSearchValues {
    from: City | null
    to: City | null
    departureDate: Date | null
    returnDate: Date | null
    passengers: PassengerCounts
    cabinClass: CabinClass
}

export interface DateRange {
    from: Date | null
    to: Date | null
}
