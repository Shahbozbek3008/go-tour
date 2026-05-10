import { Organizer } from "../../../_types"
import { ReadMore } from "../read-more"
import { OrganizerCard } from "./organizer-card"

interface TourOrganizerProps {
    organizer: Organizer
    onMessage?: () => void
}

export function TourOrganizer({ organizer, onMessage }: TourOrganizerProps) {
    return (
        <section className="w-full space-y-4 shadow-sm p-6 rounded-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                Tour organizer
            </h2>
            <OrganizerCard organizer={organizer} onMessage={onMessage} />
            <ReadMore lines={2}>{organizer?.description}</ReadMore>
        </section>
    )
}
