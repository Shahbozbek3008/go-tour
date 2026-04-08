import { TranslationKey } from "@/components/common/translation/types"

interface Option {
    id: string
    name: TranslationKey
}

export const INVESTOR_TYPE_OPTIONS: Option[] = [
    { id: "Venture Capital (VC) Firm", name: "ventureCapitalFirm" },
    { id: "Private Equity (PE) Firm", name: "privateEquityFirm" },
    { id: "Strategic Investor / Corporate", name: "privateEquityFirm" },
    { id: "Family Office", name: "familyOffice" },
    { id: "High Net Worth Individual (HNWI)", name: "highNetWorth" },
    { id: "Impact or ESG Investor", name: "impactOrEsgInvestor" },
    { id: "Open to All / Flexible", name: "openToAllFlexible" },
    {
        id: "Development Finance Institution (DFI)",
        name: "developmentFinanceInstitution",
    },
    {
        id: "Bank or Financial Institution",
        name: "bankOrFinance",
    },
    { id: "Sovereign Wealth Fund", name: "sovereignWealthFund" },
    { id: "Crowdfunding Platform / Network", name: "crowfundingPlatform" },
]

export const INVESTOR_TYPE_OPTIONS_SELLING_BUSINESS: Option[] = [
    { id: "Strategic Industry Investor", name: "strategicIndustryInvestor" },
    {
        id: "Financial Investor (PE, VC, Family Office)",
        name: "financialInvestor",
    },
    { id: "Institutional Buyer", name: "institutionalBuyer" },
    { id: "Private Buyer", name: "privateBuyer" },
    { id: "Open to All", name: "openToAll" },
]
