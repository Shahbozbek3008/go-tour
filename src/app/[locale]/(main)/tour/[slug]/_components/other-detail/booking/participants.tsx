import ClientTranslate from "@/components/common/translation/client-translate"
import { Minus, Plus, Users } from "lucide-react"
import { Dispatch, SetStateAction } from "react"
import { TourSession } from "../../../_types"

interface ParticipantsProps {
    participants: number
    setParticipants: Dispatch<SetStateAction<number>>
    activeSession?: TourSession
}

export const Participants = ({
    participants,
    setParticipants,
    activeSession,
}: ParticipantsProps) => {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/20">
            <div className="flex items-center gap-2">
                <Users className="size-4 text-primary" />
                <span className="text-sm text-foreground font-medium">
                    <ClientTranslate translationKey="participants" />
                </span>
            </div>
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setParticipants((p) => Math.max(1, p - 1))}
                    className="size-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40"
                    disabled={participants <= 1}
                >
                    <Minus className="size-3" />
                </button>
                <span className="text-sm font-semibold w-4 text-center">
                    {participants}
                </span>
                <button
                    onClick={() =>
                        setParticipants((p) =>
                            Math.min(
                                activeSession ?
                                    activeSession?.availableSlots
                                :   1,
                                p + 1,
                            ),
                        )
                    }
                    className="size-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40"
                    disabled={
                        !activeSession ||
                        participants >= activeSession.availableSlots
                    }
                >
                    <Plus className="size-3" />
                </button>
            </div>
        </div>
    )
}
