import { TranslationKey } from "@/components/common/translation/types"
import { InvestmentItemDetail, InvestmentRequestType } from "../_types"
import {
    BUSINESS_NATURE_OPTIONS,
    BUSINESS_NATURE_OPTIONS_ACQUIRING_BUSINESS,
} from "./business-nature-options"
import {
    BUSINESS_STAGE_OPTIONS,
    BUSINESS_STAGE_OPTIONS_LOOK,
    BUSINESS_STAGE_OPTIONS_SEEK,
    BUSINESS_STAGE_OPTIONS_SELL,
} from "./business-stage-options"
import { DEAL_TYPE_OPTIONS } from "./deal-type-options"
import { GOVERNANCE_OPTIONS } from "./governance-options"
import {
    INVESTMENT_STRUCTURE_OPTIONS,
    INVESTMENT_STRUCTURE_OPTIONS_LOOKING,
    INVESTMENT_STRUCTURE_OPTIONS_SEEKING,
} from "./investment-structure-options"
import {
    INVESTOR_TYPE_OPTIONS,
    INVESTOR_TYPE_OPTIONS_SELLING_BUSINESS,
} from "./investor-type-options"
import {
    SALE_STRUCTURE_OPTIONS,
    SALE_STRUCTURE_OPTIONS_ACQUIRING_BUSINESS,
} from "./sale-structure-options"
import { SELLER_PROFILE_OPTIONS } from "./seller-profile-options"
import { STRATEGIC_OBJECTIVE_OPTIONS } from "./strategic-objectives"
import {
    TARGET_INDUSTRY_OPTIONS,
    TARGET_INDUSTRY_OPTIONS_ACQUIRING_BUSINESS,
    TARGET_INDUSTRY_OPTIONS_LOOKING,
    TARGET_INDUSTRY_OPTIONS_SELL,
    TARGET_INDUSTRY_OPTIONS_STRATEGIC_DEAL,
} from "./target-industry-options"
import { TARGET_SECTOR_OPTIONS } from "./target-sector-options"
import { TRANSACTION_STRUCTURE_OPTIONS } from "./transaction-structure-options"
import { USE_FOUND_OPTIONS } from "./use-found-options"

export interface InvestmentField {
    label: TranslationKey
    className?: string
    fieldType?: "creatable_select" | "text_editor"
    options?: { id: string; name: TranslationKey }[]
    // defaultOptions?: OptionIdString[]
    hideOnDetailPage?: boolean
}
interface PriceField {
    label: TranslationKey
    end_price?: boolean
}
interface RequestTypeItem {
    key: InvestmentRequestType
    name: TranslationKey
    description: TranslationKey
    className: string
    specific_fields: Partial<
        Record<keyof InvestmentItemDetail, InvestmentField>
    >
    priceField: PriceField
}

export const INVESTMENT_REQUEST_TYPES: RequestTypeItem[] = [
    {
        key: "looking_to_invest",
        className: "bg-[#F6F4F8] text-[#39204F]",
        name: "lookingToInvest",
        description: "lookingToInvestDesc",
        specific_fields: {
            target_sector: {
                label: "targetSector",
                className: "col-span-full",
            },
            name: {
                label: "title",
                hideOnDetailPage: true,
                className: "col-span-full",
            },
            start_price: {
                label: "emptyStr",
            },
            description: {
                label: "description",
                hideOnDetailPage: true,
                fieldType: "text_editor",
                className: "col-span-full",
            },
            investment_structure: {
                label: "investmentStructure",
                fieldType: "creatable_select",
                options: INVESTMENT_STRUCTURE_OPTIONS,
                className: "col-span-2",
            },
            business_stage: {
                label: "businessStage",
                fieldType: "creatable_select",
                options: BUSINESS_STAGE_OPTIONS,
                className: "col-span-2",
            },
            target_industry: {
                label: "targetIndustry",
                fieldType: "creatable_select",
                options: TARGET_INDUSTRY_OPTIONS,
                className: "col-span-2",
            },
            strategic_objectives: {
                label: "strategicObjectives",
                fieldType: "creatable_select",
                options: STRATEGIC_OBJECTIVE_OPTIONS,
                className: "col-span-2",
            },
            geographic_focus: {
                label: "geographicalFocus",
                className: "col-span-full",
            },
            non_financial_preferences: {
                label: "nonFinancial",
                className: "col-span-full",
            },
        },
        priceField: {
            label: "investmentSize",
            end_price: true,
        },
    },
    {
        key: "seeking_investment",
        className: "bg-[#EEFCF2] text-[#24470B]",
        name: "seekingInvestment",
        description: "seekingInvestmentDesc",
        specific_fields: {
            target_sector: {
                label: "sector",
                className: "col-span-full",
            },
            name: {
                label: "title",
                hideOnDetailPage: true,
                className: "col-span-full",
            },
            start_price: {
                label: "emptyStr",
            },
            description: {
                label: "description",
                hideOnDetailPage: true,
                fieldType: "text_editor",
                className: "col-span-full",
            },
            investment_structure: {
                label: "investmentStructure",
                fieldType: "creatable_select",
                options: INVESTMENT_STRUCTURE_OPTIONS_SEEKING,
                className: "col-span-2",
            },
            use_of_found_funds: {
                label: "useOfFound",
                fieldType: "creatable_select",
                options: USE_FOUND_OPTIONS,
                className: "col-span-2",
            },
            business_stage: {
                label: "currentBusinessStage",
                fieldType: "creatable_select",
                options: BUSINESS_STAGE_OPTIONS_SEEK,
                className: "col-span-2",
            },
            investor_type: {
                label: "investorType",
                fieldType: "creatable_select",
                options: INVESTOR_TYPE_OPTIONS,
                className: "col-span-2",
            },
            offering: {
                label: "offering",
            },
            geographic_focus: {
                label: "preferredLocation",
            },
        },
        priceField: {
            label: "amountRecognized",
        },
    },
    {
        key: "looking_for_co_investor",
        className: "bg-[#F1FFFE] text-[#0B4B46]",
        name: "lookingForCo",
        description: "lookingForCoDesc",
        specific_fields: {
            target_sector: {
                label: "targetSector",
                className: "col-span-full",
            },
            name: {
                label: "title",
                hideOnDetailPage: true,
                className: "col-span-full",
            },
            start_price: {
                label: "emptyStr",
            },
            description: {
                label: "description",
                hideOnDetailPage: true,
                fieldType: "text_editor",
                className: "col-span-full",
            },
            investment_structure: {
                label: "partnershipStructure",
                fieldType: "creatable_select",
                options: INVESTMENT_STRUCTURE_OPTIONS_LOOKING,
                className: "col-span-2",
            },
            target_industry: {
                label: "category",
                fieldType: "creatable_select",
                options: TARGET_INDUSTRY_OPTIONS_LOOKING,
                className: "col-span-2",
            },
            business_stage: {
                label: "businessStage",
                fieldType: "creatable_select",
                options: BUSINESS_STAGE_OPTIONS_LOOK,
                className: "col-span-2",
            },
            governance: {
                label: "governance",
                fieldType: "creatable_select",
                options: GOVERNANCE_OPTIONS,
                className: "col-span-2",
            },
            existing_investors: {
                label: "existingInvestors",
                className: "col-span-full",
            },
            ideal_partner: {
                label: "idealPartner",
                className: "col-span-full",
            },
            geographic_focus: {
                label: "geographicalPreference",
                className: "col-span-full",
            },
        },
        priceField: {
            label: "totalInvestment",
        },
    },
    {
        key: "selling_business",
        className: "bg-[#EEF5FF] text-[#112D57]",
        name: "sellingBusiness",
        description: "sellingBusinessDesc",
        specific_fields: {
            target_sector: {
                label: "targetSector",
                className: "col-span-full",
            },
            name: {
                label: "title",
                hideOnDetailPage: true,
                className: "col-span-full",
            },
            start_price: {
                label: "emptyStr",
            },
            description: {
                label: "description",
                hideOnDetailPage: true,
                fieldType: "text_editor",
                className: "col-span-full",
            },
            business_nature: {
                label: "businessNature",
                fieldType: "creatable_select",
                options: BUSINESS_NATURE_OPTIONS,
                className: "col-span-2",
            },
            business_stage: {
                label: "businessStage",
                fieldType: "creatable_select",
                options: BUSINESS_STAGE_OPTIONS_SELL,
                className: "col-span-2",
            },
            reason_for_sale: {
                label: "reasonForSale",
                className: "col-span-2",
            },
            target_industry: {
                label: "industry",
                fieldType: "creatable_select",
                options: TARGET_INDUSTRY_OPTIONS_SELL,
                className: "col-span-2",
            },
            permits: {
                label: "permits",
            },
            sale_structure: {
                label: "saleStructure",
                fieldType: "creatable_select",
                options: SALE_STRUCTURE_OPTIONS,
                className: "col-span-2",
            },
            investor_type: {
                label: "preferredBuyer",
                fieldType: "creatable_select",
                options: INVESTOR_TYPE_OPTIONS_SELLING_BUSINESS,
                className: "col-span-2",
            },
            geographic_focus: {
                label: "geographicalPreference",
            },
        },
        priceField: {
            label: "askingPrice",
        },
    },
    {
        key: "acquiring_business",
        className: "bg-[#FFF7F1] text-[#A05E13]",
        name: "acquiringBusiness",
        description: "acquiringBusinessDesc",
        specific_fields: {
            target_sector: {
                label: "targetSector",
                className: "col-span-full",
            },
            name: {
                label: "title",
                hideOnDetailPage: true,
                className: "col-span-full",
            },
            start_price: {
                label: "emptyStr",
            },
            description: {
                label: "description",
                hideOnDetailPage: true,
                fieldType: "text_editor",
                className: "col-span-full",
            },
            business_nature: {
                label: "businessNature",
                fieldType: "creatable_select",
                options: BUSINESS_NATURE_OPTIONS_ACQUIRING_BUSINESS,
                className: "col-span-2",
            },
            business_stage: {
                label: "preferredStage",
                fieldType: "creatable_select",
                options: BUSINESS_NATURE_OPTIONS_ACQUIRING_BUSINESS,
                className: "col-span-2",
            },
            target_industry: {
                label: "industryFocus",
                fieldType: "creatable_select",
                options: TARGET_INDUSTRY_OPTIONS_ACQUIRING_BUSINESS,
                className: "col-span-2",
            },
            geographic_focus: {
                label: "geographicalFocus",
                className: "col-span-2",
            },
            sale_structure: {
                label: "buyStructure",
                fieldType: "creatable_select",
                options: SALE_STRUCTURE_OPTIONS_ACQUIRING_BUSINESS,
                className: "col-span-2",
            },
            seller_profile: {
                label: "sellerProfile",
                fieldType: "creatable_select",
                options: SELLER_PROFILE_OPTIONS,
                className: "col-span-2",
            },
        },
        priceField: {
            label: "acquisitionBudget",
            end_price: true,
        },
    },
    {
        key: "strategic_deal",
        className: "bg-[#F1F1FF] text-[#0D114E]",
        name: "otherStrategic",
        description: "otherStrategicDesc",
        specific_fields: {
            deal_type: {
                label: "dealType",
                fieldType: "creatable_select",
                options: DEAL_TYPE_OPTIONS,
                className: "col-span-2",
            },
            target_sector: {
                label: "targetSector",
                fieldType: "creatable_select",
                options: TARGET_SECTOR_OPTIONS,
                className: "col-span-2",
            },
            name: {
                label: "title",
                hideOnDetailPage: true,
                className: "col-span-full",
            },
            start_price: {
                label: "emptyStr",
            },
            description: {
                label: "description",
                hideOnDetailPage: true,
                fieldType: "text_editor",
                className: "col-span-full",
            },
            strategic_objectives: {
                label: "strategicObjective",
                fieldType: "creatable_select",
                options: STRATEGIC_OBJECTIVE_OPTIONS,
                className: "col-span-2",
            },
            transaction_structure: {
                label: "transactionStructure",
                fieldType: "creatable_select",
                options: TRANSACTION_STRUCTURE_OPTIONS,
                className: "col-span-2",
            },
            business_stage: {
                label: "businessStage",
                fieldType: "creatable_select",
                options: TARGET_INDUSTRY_OPTIONS_STRATEGIC_DEAL,
                className: "col-span-2",
            },
            geographic_focus: {
                label: "geographicalFocus",
                className: "col-span-2",
            },
        },
        priceField: {
            label: "dealSize",
            end_price: true,
        },
    },
]
