import { Flag, ShieldCheck } from "lucide-react"

interface OrganizerStatsProps {
    toursCount: number
    memberSince: string
    isVerified: boolean
}

export function OrganizerStats({
    toursCount,
    memberSince,
    isVerified,
}: OrganizerStatsProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-sm text-foreground">
                <Flag className="size-4 fill-primary text-primary shrink-0" />
                <span className="font-medium">
                    {toursCount} tours conducted
                </span>
            </div>
            {isVerified && (
                <div className="flex items-center gap-2 text-sm text-foreground">
                    <ShieldCheck className="size-4 fill-primary text-primary shrink-0" />
                    <span className="font-medium">
                        Reliable organizer: with us {memberSince}
                    </span>
                </div>
            )}
        </div>
    )
}
