import { SpecialOffers } from "@/components/special-offers"
import { AgentsHeader } from "./header/header"
import { AgentsLeftSide } from "./left-side"
import { AgentsRightSide } from "./right-side"

export const AgentsLayout = () => {
    return (
        <div className="w-full bg-[#f5f9ff]">
            <AgentsHeader />

            <div className="flex flex-col md:flex-row md:items-start md:gap-8 lg:px-15 px-6">
                <AgentsLeftSide />
                <div className="flex-1 min-w-0 mt-6 md:mt-0">
                    <AgentsRightSide />
                </div>
            </div>

            <div className="lg:p-15 px-6 py-10">
                <SpecialOffers />
            </div>
        </div>
    )
}
