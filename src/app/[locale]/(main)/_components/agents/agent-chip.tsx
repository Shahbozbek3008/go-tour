import { MapPin } from "lucide-react"
import Image from "next/image"
import { TravelAgencyResponse } from "./_hooks"

export const AgentChip = ({ agent }: { agent: TravelAgencyResponse }) => (
    <div className="group flex items-center gap-4 rounded-2xl p-4 border border-gray-100 bg-white hover:border-transparent hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full relative overflow-hidden select-none">
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-[40px] opacity-0 transition-opacity duration-500 group-hover:opacity-20 pointer-events-none" />
        <div className="relative z-10 flex items-center gap-4 w-full">
            <div className="w-14 h-14 rounded-2xl flex-shrink-0 overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105 shadow-sm border border-black/5">
                <Image
                    src={agent?.logo}
                    alt={agent.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 object-cover"
                    draggable={false}
                    unoptimized
                />
            </div>
            <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-gray-900 truncate transition-colors duration-300">
                    <span className="group-hover:text-[var(--hover-color)] transition-colors duration-300">
                        {agent.name}
                    </span>
                </h3>
                <div className="flex items-center gap-1.5 mt-1.5">
                    <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-500 font-medium truncate">
                        {agent?.address}
                    </span>
                </div>
            </div>
        </div>
    </div>
)
