import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, MessageSquareText } from "lucide-react"
import type { Organizer } from "../../../_types"
import { OrganizerAvatar } from "./organizer-avatar"
import { OrganizerRating } from "./organizer-rating"
import { OrganizerStats } from "./organizer-stats"

interface OrganizerCardProps {
    organizer: Organizer
    onMessage?: () => void
}

export function OrganizerCard({ organizer, onMessage }: OrganizerCardProps) {
    return (
        <Card className="w-full bg-[#f6f7fa] rounded-2xl">
            <CardContent className="p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                        <OrganizerAvatar
                            src={organizer.avatar}
                            name={organizer.name}
                        />

                        <div className="flex flex-col gap-2 min-w-0">
                            <a
                                href={`/organizers/${organizer.id}`}
                                className="inline-flex items-center gap-0.5 font-semibold text-base text-primary hover:text-primary/80 transition-colors w-fit"
                            >
                                {organizer.name}
                                <ChevronRight className="size-4 shrink-0" />
                            </a>

                            <OrganizerRating
                                rating={organizer.rating}
                                reviewCount={organizer.reviewCount}
                            />

                            <OrganizerStats
                                toursCount={organizer.toursCount}
                                memberSince={organizer.memberSince}
                                isVerified={organizer.isVerified}
                            />
                        </div>
                    </div>

                    <Button
                        onClick={onMessage}
                        className="hidden sm:inline-flex shrink-0 bg-primary hover:bg-primary/80 active:bg-primary/90 text-white rounded-xl px-5 py-2.5 text-sm font-semibold gap-2 transition-colors cursor-pointer"
                    >
                        <MessageSquareText className="size-4" />
                        Write
                    </Button>
                </div>

                <Button
                    onClick={onMessage}
                    className="sm:hidden mt-4 w-full bg-primary hover:bg-primary/80 active:bg-primary/90 text-white rounded-xl text-sm font-semibold gap-2 transition-colors cursor-pointer"
                >
                    <MessageSquareText className="size-4" />
                    Write
                </Button>
            </CardContent>
        </Card>
    )
}
