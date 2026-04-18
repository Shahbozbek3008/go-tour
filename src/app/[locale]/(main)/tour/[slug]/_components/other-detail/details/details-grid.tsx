import { Activity, Bed, Calendar, Compass, Globe, Users } from "lucide-react"
import { TourDetails } from "../../../_types"

interface DetailItem {
    icon: React.ElementType
    label: string
    value: string
}

function buildDetailItems(details: TourDetails): DetailItem[] {
    return [
        { icon: Calendar, label: "Duration", value: `${details.days} days` },
        { icon: Compass, label: "Tour type", value: details.type },
        { icon: Globe, label: "Language", value: details.language },
        { icon: Bed, label: "Comfort", value: details.comfort },
        { icon: Activity, label: "Activity level", value: details.activity },
        { icon: Users, label: "Age group", value: details.ageGroup },
    ]
}

interface TourDetailsGridProps {
    details: TourDetails
}

export function TourDetailsGrid({ details }: TourDetailsGridProps) {
    const items = buildDetailItems(details)

    return (
        <div className="rounded-2xl border border-border/60 p-6 bg-[#F6F7FA]">
            <h2 className="text-lg font-semibold text-foreground mb-5">
                Tour Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
                {items.map(({ icon: Icon, label, value }) => (
                    <div
                        key={label}
                        className="flex items-start gap-3 p-3 rounded-xl"
                    >
                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="size-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                {label}
                            </p>
                            <p className="text-sm font-medium text-foreground">
                                {value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
