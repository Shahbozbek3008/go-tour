export interface TourSession {
    id: number
    startDate: number
    endDate: number
    availableSlots: number
    price: number
    discountPercent: number | null
    hasDiscount: boolean | null
    discountAmount: number | null
}
