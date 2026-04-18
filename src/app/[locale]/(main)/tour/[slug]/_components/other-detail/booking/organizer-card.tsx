"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageCircle, Star } from "lucide-react"
import { TourOrganizer } from "../../../_types"

interface OrganizerCardProps {
    organizer: TourOrganizer
}

export function OrganizerCard({ organizer }: OrganizerCardProps) {
    return (
        <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-3">
                <Avatar className="size-11 ring-2 ring-primary/20">
                    <AvatarImage src={organizer.avatar} alt={organizer.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {organizer.name[0]}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex items-center gap-1.5">
                        <p className="text-sm font-semibold text-foreground">
                            {organizer.name}
                        </p>
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium text-foreground">
                            {organizer.rating}
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Organizer</p>
                </div>
            </div>
            <Button size="lg" className="gap-2">
                <MessageCircle className="size-4" />
                Message
            </Button>
        </div>
    )
}
