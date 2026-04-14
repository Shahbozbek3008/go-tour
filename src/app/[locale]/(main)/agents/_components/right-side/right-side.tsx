import ClientTranslate from "@/components/common/translation/client-translate"
import { SpecialOffers } from "@/components/special-offers"
import { Badge } from "@/components/ui/badge"

export const AgentsRightSide = () => {
    return (
        <div className="flex flex-col gap-6 min-w-0 w-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h5 className="text-base font-semibold">Tanlangan:</h5>
                    <Badge
                        variant="destructive"
                        className="px-2 py-1 font-medium bg-white text-black text-xs"
                    >
                        Asia Travel Group
                    </Badge>
                </div>
            </div>
            <div className="overflow-hidden">
                <h2 className="text-3xl font-semibold mb-10">
                    <ClientTranslate translationKey="tours" /> — Asia Travel
                    Group
                </h2>
                <SpecialOffers hasLike={false} title="" />
            </div>
        </div>
    )
}
