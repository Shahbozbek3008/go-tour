import { TranslationKey } from "@/components/common/translation/types"

interface Option {
    id: string
    name: TranslationKey
}

export const SALE_STRUCTURE_OPTIONS: Option[] = [
    { id: "Full Sale", name: "fullSale" },
    { id: "Partial Sale", name: "partialSale" },
    { id: "Joint Venture", name: "jointVenture" },
    { id: "Open to Offers", name: "openToOffers" },
]

export const SALE_STRUCTURE_OPTIONS_ACQUIRING_BUSINESS: Option[] = [
    { id: "Full Buyout", name: "fullBuyout" },
    { id: "Majority Stake", name: "majorityStake" },
    { id: "Minority Stake", name: "minorityStake" },
    { id: "Asset Purchase Only", name: "assetPurchaseOnly" },
    { id: "Joint Venture Option", name: "jointVentureOption" },
    { id: "Open to Discussion", name: "openToDiscussion" },
]
