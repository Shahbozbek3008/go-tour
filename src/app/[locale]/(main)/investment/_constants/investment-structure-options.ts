import { TranslationKey } from "@/components/common/translation/types"

interface Option {
    id: string
    name: TranslationKey
}

export const INVESTMENT_STRUCTURE_OPTIONS: Option[] = [
    { id: "Equity Investment", name: "equityInvestment" },
    { id: "Debt Financing", name: "debtFinancing" },
    { id: "Convertible Note", name: "convertibleNote" },
    { id: "Revenue Sharing", name: "revenueSharing" },
    { id: "Joint Venture", name: "jointVenture" },
    { id: "Grant / Donation", name: "grantDonation" },
    { id: "Flexible / To Discuss", name: "flexibleToDiscuss" },
]

export const INVESTMENT_STRUCTURE_OPTIONS_SEEKING: Option[] = [
    { id: "Equity Investment", name: "equityInvestment" },
    { id: "Debt Financing", name: "debtFinancing" },
    { id: "Convertible Note", name: "convertibleNote" },
    { id: "Revenue or Profit Sharing", name: "revenueOrProfitSharing" },
    {
        id: "Joint Venture / Strategic Partnership",
        name: "jointVentureStrategic",
    },
    { id: "Grant / Donation", name: "grantDonation" },
    { id: "Open to Discussion", name: "openToDiscussion" },
]

export const INVESTMENT_STRUCTURE_OPTIONS_LOOKING: Option[] = [
    { id: "Joint Venture (JV)", name: "joinVentureJv" },
    { id: "Revenue Sharing Agreement", name: "revenueSharingAgreement" },
]
