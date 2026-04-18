import { SpecialOffers } from "@/components/special-offers"
import { AgentsHeader } from "./header/header"
import { AgentsLeftSide } from "./left-side"
import { AgentsRightSide } from "./right-side"

export const AgentsLayout = () => {
    return (
        <div className="w-full bg-[#f5f9ff] overflow-x-hidden md:overflow-visible">
            <AgentsHeader />
            <div className="flex flex-col md:flex-row md:items-start md:gap-8 pt-10 lg:pt-16 home-container">
                <AgentsLeftSide />
                <div className="flex-1 min-w-0 mt-6 md:mt-0">
                    <AgentsRightSide />
                </div>
            </div>
            <div className="home-container py-10">
                <SpecialOffers />
            </div>
        </div>
    )
}
