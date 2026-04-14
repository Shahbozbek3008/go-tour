import { cn } from "@/lib/utils/shadcn"
import { MapPin, Star, Users } from "lucide-react"
import { AgentLogoFallback } from "./agent-logo-fallback"

interface Agent {
    id: number
    name: string
    location: string
    district: string
    logo: string
    rating: number
    reviews: number
    tourCount: number
}

interface AgentCardProps {
    agent: Agent
    selected: boolean
    onSelect: (id: number) => void
}

export const AgentCard = ({ agent, selected, onSelect }: AgentCardProps) => {
    return (
        <button
            onClick={() => onSelect(agent.id)}
            className={cn(
                "w-full text-left rounded-2xl p-4 transition-all duration-200 cursor-pointer",
                "focus-visible:outline-none",
                "flex items-center gap-3",
                "min-w-[210px] md:min-w-0",
                selected ?
                    "bg-white border-2 border-primary"
                :   "bg-white border-2 border-zinc-100 hover:border-primary hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]",
            )}
        >
            <div
                className={cn(
                    "shrink-0 w-11 h-11 rounded-xl overflow-hidden",
                    selected ? "ring-2 ring-blue-200" : "ring-1 ring-zinc-100",
                )}
            >
                <AgentLogoFallback name={agent.name} />
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
                        {agent.location}, {agent.district}
                    </p>
                </div>

                <div className="flex items-center gap-2 mt-1.5">
                    <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-[11.5px] font-semibold text-zinc-700">
                            {agent.rating}
                        </span>
                        <span className="text-[11px] text-zinc-400">
                            ({agent.reviews})
                        </span>
                    </span>
                    <span className="w-px h-3 bg-zinc-200 shrink-0" />
                    <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-zinc-400" />
                        <span className="text-[11px] text-zinc-400">
                            {agent.tourCount} tur
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
}
