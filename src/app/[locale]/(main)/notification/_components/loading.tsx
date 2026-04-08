import { format } from "date-fns"

interface Props {
    days?: number
    perDay?: number
}

export default function NotificationsSkeleton({ days = 3, perDay = 3 }: Props) {
    const compact = false
    const dates = Array.from({ length: days }).map((_, i) =>
        format(new Date(Date.now() - i * 24 * 60 * 60 * 1000), "MMMM d, yyyy"),
    )

    return (
        <div className="flex flex-col gap-6">
            {dates.map((d) => (
                <div key={d} className="grid gap-4">
                    <div className="grid gap-4">
                        {Array.from({ length: perDay }).map((_, j) => (
                            <div
                                key={j}
                                role="status"
                                className={`w-full rounded-lg p-4 md:p-5 border border-stroke-gray/30 bg-background/50 animate-pulse`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-full bg-gray-200/60 shrink-0" />

                                    <div className="flex-1">
                                        <div className="h-4 w-3/5 rounded-md bg-gray-200/60 mb-3" />
                                        <div
                                            className={`h-3 rounded-md bg-gray-200/60 ${compact ? "w-1/2" : "w-4/5"} mb-2`}
                                        />
                                        {!compact && (
                                            <div className="h-3 w-2/3 rounded-md bg-gray-200/60 mb-2" />
                                        )}

                                        <div className="flex items-center justify-between mt-3">
                                            <div className="h-3 w-24 rounded-md bg-gray-200/60" />
                                            <div className="h-3 w-8 rounded-md bg-gray-200/60" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
