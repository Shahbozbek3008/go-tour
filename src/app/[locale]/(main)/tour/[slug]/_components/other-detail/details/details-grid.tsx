import ClientTranslate from "@/components/common/translation/client-translate"
import { TranslationKey } from "@/components/common/translation/types"
import { Activity, Bed, Calendar, Compass, Globe, Users } from "lucide-react"
import { useTourDetailQuery } from "../../../_hooks"
import { TourDetailResponse, TourDetails } from "../../../_types"

interface DetailItem {
    icon: React.ElementType
    label: string
    value: string
}

function buildDetailItems(
    details: TourDetails,
    detail: TourDetailResponse,
): DetailItem[] {
    return [
        {
            icon: Calendar,
            label: "duration",
            value: `${detail?.durationInDays}`,
        },
        { icon: Compass, label: "tourType", value: detail?.categories?.[0] },
        { icon: Globe, label: "language", value: details.language },
        { icon: Bed, label: "comfort", value: details.comfort },
        { icon: Activity, label: "activityLevel", value: details.activity },
        { icon: Users, label: "ageGroup", value: details.ageGroup },
    ]
}

interface TourDetailsGridProps {
    details: TourDetails
}

export function TourDetailsGrid({ details }: TourDetailsGridProps) {
    const { detail } = useTourDetailQuery()
    const items = buildDetailItems(details, detail!)

    return (
        <div className="rounded-2xl border border-border/60 p-6 bg-[#F6F7FA]">
            <h2 className="text-lg font-semibold text-foreground mb-5">
                <ClientTranslate translationKey="tourDetails" />
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
                                <ClientTranslate translationKey={label} />
                            </p>
                            <p className="text-sm font-medium text-foreground">
                                {label === "duration" ?
                                    <>
                                        {value}{" "}
                                        <ClientTranslate translationKey="days_label" />
                                    </>
                                : label === "tourType" ?
                                    <ClientTranslate
                                        translationKey={
                                            `cat_${value}` as TranslationKey
                                        }
                                        // fallback={value}
                                    />
                                :   value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
