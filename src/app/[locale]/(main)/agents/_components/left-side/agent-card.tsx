import { cn } from "@/lib/utils/shadcn"
import { TravelAgencyResponse } from "@/types/api/agents"
import { MapPin, Star, Users } from "lucide-react"
import Image from "next/image"
import { memo } from "react"
import { AgentLogoFallback } from "./agent-logo-fallback"

interface AgentCardProps {
    agent: TravelAgencyResponse
    selected: boolean
    onSelect: (id: number) => void
}

export const AgentCard = memo(({ agent, selected, onSelect }: AgentCardProps) => {
    return (
        <button
            onClick={() => onSelect(agent.id)}
            className={cn(
                "w-full text-left rounded-2xl p-4 transition-all duration-200 cursor-pointer",
                "focus-visible:outline-none",
                "flex items-center gap-3",
                "min-w-[210px] md:min-w-0 border-2",
                selected ?
                    "bg-white border-primary"
                :   "bg-white border-zinc-100 hover:border-primary hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]",
            )}
        >
            <div
                className={cn(
                    "shrink-0 w-11 h-11 rounded-xl overflow-hidden relative border",
                    selected ? "ring-2 ring-blue-200 border-primary/20" : "border-zinc-100",
                )}
            >
                {agent.logo ? (
                    <Image
                        src={agent.logo}
                        alt={agent.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <AgentLogoFallback name={agent.name} />
                )}
            </div>

            <div className="flex-1 min-w-0">
                <p
                    className={cn(
                        "text-[13.5px] font-semibold leading-tight truncate",
                        selected ? "text-blue-600" : "text-zinc-800",
                    )}
                >
                    {agent.name}
                </p>

                <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                    <p className="text-[11.5px] text-zinc-400 truncate">
                        {agent.address}
                    </p>
                </div>

                <div className="flex items-center gap-2 mt-1.5">
                    <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-[11.5px] font-semibold text-zinc-700">
                            {agent.rating?.toFixed(1) || "0.0"}
                        </span>
                        <span className="text-[11px] text-zinc-400">
                            ({agent.reviewsCount || 0})
                        </span>
                    </span>
                    <span className="w-px h-3 bg-zinc-200 shrink-0" />
                    <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-zinc-400" />
                        <span className="text-[11px] text-zinc-400">
                            {agent.toursCount || 0} tur
                        </span>
                    </span>
                </div>
            </div>

            <div
                className={cn(
                    "hidden md:block shrink-0 w-2 h-2 rounded-full transition-all duration-200",
                    selected ? "bg-blue-500" : "bg-zinc-200",
                )}
            />
        </button>
    )
})

AgentCard.displayName = "AgentCard"
