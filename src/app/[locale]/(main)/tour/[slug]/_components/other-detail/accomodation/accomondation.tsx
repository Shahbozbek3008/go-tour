import { ACCOMODATION_OPTIONS } from "../../../_constants/mockdata"
import { AccommodationCard } from "./accomodation-card"

export function Accommodation() {
    return (
        <section className="w-full my-15">
            <h2 className="text-2xl font-bold text-foreground mb-6 tracking-tight">
                Accommodation
            </h2>
            <div className="flex flex-col gap-4">
                {ACCOMODATION_OPTIONS.map((option) => (
                    <AccommodationCard key={option.id} option={option} />
                ))}
            </div>
        </section>
    )
}
