import { TranslationKey } from "@/components/common/translation/types"
import { OptionIdString } from "@/types/common"
import {
    MarketplaceProductDetail,
    MarketplaceRequestType,
    PricingModelType,
} from "../_types"
import { CONDITION_OPTIONS } from "./condition-options"
import { ENGAGEMENT_TYPE_OPTIONS } from "./engagement-type-options"
import { SUPPLY_REQUIREMENT_OPTIONS } from "./supply-requirement-options"

export interface MarketplaceProductField {
    label: TranslationKey
    displayKey?: keyof MarketplaceProductDetail
    className?: string
    hideOnDetailPage?: boolean
    fieldType?: "select" | "date"
    options?: OptionIdString[]
}

export interface RequestTypeItem {
    key: MarketplaceRequestType
    title: TranslationKey
    name: TranslationKey
    description: TranslationKey
    className: string
    nameField: string
    specific_fields: Partial<
        Record<keyof MarketplaceProductDetail, MarketplaceProductField>
    >
    priceModel?: {
        priceLabels?: Partial<
            Record<
                Extract<PricingModelType, "Fixed Price" | "Tender-Based">,
                TranslationKey
            >
        >
        percentageLabels?: Partial<
            Record<
                Extract<
                    PricingModelType,
                    "Commission-Based" | "Revenue-Linked"
                >,
                TranslationKey
            >
        >
        options: { id: PricingModelType; name: TranslationKey }[]
    }
    additionalFields?: boolean
}
export const MARKETPLACE_REQUEST_TYPES: RequestTypeItem[] = [
    {
        key: "sell",
        title: "sellRequest",
        name: "sellRequest",
        description: "sellRequestDesc",
        className: "bg-[#FCFAE3] text-[#796B05]",
        nameField: "productName",
        specific_fields: {
            condition: {
                label: "condition",
                displayKey: "condition_display",
                className: "col-span-2",
                fieldType: "select",
                options: CONDITION_OPTIONS,
            },
            quantity: { label: "quantity", className: "col-span-2" },
            product_or_service_locations: {
                label: "stockLocation",
                className: "col-span-2",
            },
            product_or_service_target_locations: {
                label: "shippingScope",
                className: "col-span-2",
            },
            specification: {
                label: "specifications",
                className: "col-span-full",
                hideOnDetailPage: true,
            },
            commercial_terms: {
                label: "commercialTerms",
                className: "col-span-2",
                hideOnDetailPage: true,
            },
            incoterm: { label: "incoterm", className: "col-span-2" },
        },
        priceModel: {
            priceLabels: {
                "Fixed Price": "fixedPrice",
                "Tender-Based": "startingPrice",
            },
            options: [
                { id: "Fixed Price", name: "fixedPrice" },
                { id: "Negotiable", name: "negotiable" },
                { id: "Tender-Based", name: "tenderBased" },
                { id: "Price on Request", name: "priceOnRequest" },
                { id: "Not Applicable", name: "notApplicable" },
            ],
        },
        additionalFields: true,
    },
    {
        key: "buy",
        description: "buyRequestDesc",
        title: "buyRequest",
        name: "buyRequest",
        className: "bg-[#EEFCF2] text-[#24470B]",
        nameField: "productName",
        specific_fields: {
            // condition: {
            //     label: "condition",
            //     displayKey: "condition_display",
            //     className: "col-span-2",
            //     fieldType: "select",
            //     options: CONDITION_OPTIONS,
            // },
            quantity: { label: "quantity", className: "col-span-2" },
            product_or_service_locations: {
                label: "deliveryLocation",
                className: "col-span-2",
            },
            product_or_service_target_locations: {
                label: "preferredCountries",
                className: "col-span-2",
            },
            specification: {
                label: "specifications",
                className: "col-span-full",
                hideOnDetailPage: true,
            },
            commercial_terms: {
                label: "commercialTerms",
                className: "col-span-full",
                hideOnDetailPage: true,
            },
            incoterm: { label: "incoterm", className: "col-span-full" },
        },
        priceModel: {
            priceLabels: {
                "Fixed Price": "fixedPrice",
                "Tender-Based": "startingPrice",
            },
            options: [
                { id: "Fixed Price", name: "fixedPrice" },
                { id: "Negotiable", name: "negotiable" },
                { id: "Tender-Based", name: "tenderBased" },
                {
                    id: "Request for Quotation (RFQ)",
                    name: "requestForQuotation",
                },
                { id: "Not Applicable", name: "notApplicable" },
            ],
        },
    },
    {
        key: "seeking_supplier_vendor",
        title: "seekingSuppkier",
        name: "seekingSuppkier",
        description: "seekingSuppkierDesc",
        className: "bg-[#F1FFFE] text-[#0B4B46]",
        nameField: "productName",
        specific_fields: {
            // condition: {
            //     label: "condition",
            //     displayKey: "condition_display",
            //     className: "col-span-2",
            //     fieldType: "select",
            //     options: CONDITION_OPTIONS,
            // },
            quantity: { label: "quantity", className: "col-span-1" },
            supply_requirement: {
                label: "supplyRequirement",
                displayKey: "supply_requirement_display",
                className: "col-span-1",
                hideOnDetailPage: true,
                fieldType: "select",
                options: SUPPLY_REQUIREMENT_OPTIONS,
            },
            product_or_service_locations: {
                label: "preferredCountries",
                className: "col-span-2",
            },
            product_or_service_target_locations: {
                label: "deliveryLocation",
                className: "col-span-2",
            },
            procurement_type: {
                label: "procurementType",
                className: "col-span-full",
            },
            delivery_start_date: {
                label: "deliveryStartDate",
                className: "col-span-full",
                fieldType: "date",
            },
            specification: {
                label: "specifications",
                className: "col-span-full",
                hideOnDetailPage: true,
            },
            commercial_terms: {
                label: "commercialTerms",
                className: "col-span-full",
                hideOnDetailPage: true,
            },
            incoterm: { label: "incoterm", className: "col-span-full" },
        },
        priceModel: {
            priceLabels: {
                "Tender-Based": "startingPrice",
            },
            options: [
                { id: "Negotiable", name: "negotiable" },
                { id: "Tender-Based", name: "tenderBased" },
                {
                    id: "Request for Quotation (RFQ)",
                    name: "requestForQuotation",
                },
                { id: "Not Applicable", name: "notApplicable" },
            ],
        },
        additionalFields: true,
    },
    {
        key: "seeking_client_buyer",
        title: "seekingClient",
        name: "seekingClient",
        description: "seekingClientDesc",
        className: "bg-[#EEF5FF] text-[#112D57]",
        nameField: "productName",
        specific_fields: {
            condition: {
                label: "condition",
                displayKey: "condition_display",
                className: "col-span-2",
                fieldType: "select",
                options: CONDITION_OPTIONS,
            },
            quantity: { label: "quantity", className: "col-span-1" },
            supply_requirement: {
                label: "supplyRequirement",
                displayKey: "supply_requirement_display",
                className: "col-span-1",
                hideOnDetailPage: true,
                fieldType: "select",
                options: SUPPLY_REQUIREMENT_OPTIONS,
            },
            product_or_service_target_locations: {
                label: "targetGeography",
                className: "col-span-2",
            },
            delivery_type: { label: "deliveryType", className: "col-span-2" },
            target_client: {
                label: "targetClient",
                className: "col-span-full",
            },
            commercial_terms: {
                label: "commercialTerms",
                className: "col-span-full",
                hideOnDetailPage: true,
            },
        },
        priceModel: {
            priceLabels: {
                "Fixed Price": "fixedPrice",
                "Tender-Based": "startingPrice",
            },
            percentageLabels: {
                "Commission-Based": "percentage",
            },
            options: [
                { id: "Fixed Price", name: "fixedPrice" },
                { id: "Negotiable", name: "negotiable" },
                { id: "Tender-Based", name: "tenderBased" },
                { id: "Price on Request", name: "priceOnRequest" },
                { id: "Commission-Based", name: "commissionBased" },
                { id: "Not Applicable", name: "notApplicable" },
            ],
        },
        additionalFields: true,
    },
    {
        key: "seeking_service_provider",
        title: "seekingService",
        name: "seekingService",
        description: "seekingServiceDesc",
        className: "bg-[#FFF7F1] text-[#A05E13]",
        nameField: "serviceName",
        specific_fields: {
            // product_or_service_locations: {
            //     label: "serviceLocation",
            //     className: "col-span-2",
            // },
            languages: { label: "languages", className: "col-span-2" },
            requirements: { label: "requirements", className: "col-span-2" },
            engagement_type: {
                label: "engagementType",
                displayKey: "engagement_type_display",
                className: "col-span-2",
                fieldType: "select",
                options: ENGAGEMENT_TYPE_OPTIONS,
            },
            deliverables: { label: "deliverables", className: "col-span-2" },
            experience: { label: "experience", className: "col-span-2" },
            // commercial_terms: {
            //     label: "commercialTerms",
            //     className: "col-span-full",
            //     hideOnDetailPage: true,
            // },
        },
        priceModel: {
            priceLabels: {
                "Fixed Price": "fixedPrice",
                "Tender-Based": "startingPrice",
            },
            options: [
                { id: "Fixed Price", name: "fixedPrice" },
                { id: "Negotiable", name: "negotiable" },
                { id: "Tender-Based", name: "tenderBased" },
                { id: "Not Applicable", name: "notApplicable" },
            ],
        },
        additionalFields: true,
    },
    {
        key: "detailed_service",
        title: "offeringService",
        name: "offeringService",
        description: "offeringServiceDesc",
        className: "bg-[#F1F1FF] text-[#0D114E]",
        nameField: "serviceName",
        specific_fields: {
            // product_or_service_locations: {
            //     label: "serviceLocation",
            //     className: "col-span-2",
            // },
            // engagement_type: {
            //     label: "engagementType",
            //     displayKey: "engagement_type",
            //     className: "col-span-2",
            //     fieldType: "select",
            //     options: ENGAGEMENT_TYPE_OPTIONS,
            // },
            requirements: {
                label: "certifications",
                className: "col-span-full",
            },
            deliverables: { label: "deliverables", className: "col-span-2" },
            experience: { label: "experience", className: "col-span-2" },
            languages: { label: "languages", className: "col-span-2" },
            commercial_terms: {
                label: "commercialTerms",
                className: "col-span-2",
                hideOnDetailPage: true,
            },
        },
        priceModel: {
            priceLabels: {
                "Fixed Price": "fixedPrice",
                "Tender-Based": "startingPrice",
            },
            percentageLabels: {
                "Commission-Based": "percentage",
                "Revenue-Linked": "percentage",
            },
            options: [
                { id: "Fixed Price", name: "fixedPrice" },
                { id: "Negotiable", name: "negotiable" },
                { id: "Tender-Based", name: "tenderBased" },
                // {
                //     id: "Request for Quotation (RFQ)",
                //     name: "requestForQuotation",
                // },
                // { id: "Price on Request", name: "priceOnRequest" },
                { id: "Commission-Based", name: "commissionBased" },
                // { id: "Revenue-Linked", name: "revenueLinked" },
                // { id: "Not Applicable", name: "notApplicable" },
            ],
        },
        additionalFields: true,
    },
    {
        key: "distributor_reseller_needed",
        title: "distributorReseller",
        name: "distributorReseller",
        description: "distributorResellerDesc",
        className: "bg-[#F9FFE8] text-[#2E4C0D]",
        nameField: "productName",
        specific_fields: {
            // condition: {
            //     label: "condition",
            //     displayKey: "condition_display",
            //     className: "col-span-2",
            //     fieldType: "select",
            //     options: CONDITION_OPTIONS,
            // },
            quantity: { label: "quantity", className: "col-span-1" },
            supply_requirement: {
                label: "supplyRequirement",
                displayKey: "supply_requirement_display",
                className: "col-span-1",
                hideOnDetailPage: true,
                fieldType: "select",
                options: SUPPLY_REQUIREMENT_OPTIONS,
            },
            product_or_service_target_locations: {
                label: "targetMarkets",
                className: "col-span-2",
            },
            target_client: { label: "targetClient", className: "col-span-2" },
            partner_type: { label: "partnerType", className: "col-span-2" },
            requirements: {
                label: "partnerRequirements",
                className: "col-span-2",
            },
            right_options: {
                label: "rightOptions",
                className: "col-span-full",
            },
            support: { label: "supports", className: "col-span-2" },
            submission_type: {
                label: "submissionType",
                className: "col-span-2",
            },
        },
        priceModel: {
            percentageLabels: {
                "Commission-Based": "percentage",
                "Revenue-Linked": "percentage",
            },
            options: [
                { id: "Negotiable", name: "negotiable" },
                { id: "Price on Request", name: "priceOnRequest" },
                { id: "Commission-Based", name: "commissionBased" },
                { id: "Revenue-Linked", name: "revenueLinked" },
                { id: "Not Applicable", name: "notApplicable" },
            ],
        },
        additionalFields: true,
    },
    {
        key: "partnership",
        title: "partnership",
        name: "partnership",
        description: "partnershipDesc",
        className: "bg-[#F6F4F8] text-[#39204F]",
        nameField: "serviceName",
        specific_fields: {
            partner_type: {
                label: "partnerType",
                className: "col-span-full",
            },
            your_contribution: {
                label: "yourContribution",
                className: "col-span-full",
            },
            partner_contribution: {
                label: "partnerExpectedContribution",
                className: "col-span-full",
            },
            // product_or_service_target_locations: {
            //     label: "geographicFocus",
            //     className: "col-span-2",
            // },
            // target_client: {
            //     label: "targetPartnerProfile",
            //     className: "col-span-2",
            // },
            collaboration_structure: {
                label: "collaborationStructure",
                className: "col-span-2",
            },
            support: {
                label: "supportOffered",
                className: "col-span-2",
            },
            credentials: { label: "credentials", className: "col-span-2" },
            expected_response: {
                label: "expectedResponse",
                className: "col-span-2",
            },
        },
        priceModel: {
            percentageLabels: {
                "Commission-Based": "percentage",
                "Revenue-Linked": "percentage",
            },
            options: [
                { id: "Negotiable", name: "negotiable" },
                { id: "Commission-Based", name: "commissionBased" },
                { id: "Revenue-Linked", name: "revenueLinked" },
            ],
        },
    },
    {
        key: "barter_trade_exchange",
        title: "barterTrade",
        name: "barterTrade",
        description: "barterTradeDesc",
        className: "bg-[#F6F2F4] text-[#6D4455]",
        nameField: "productName",
        specific_fields: {
            in_exchange_for: {
                label: "inExchangeFor",
                className: "col-span-full",
            },
            condition: {
                label: "myProductCondition",
                displayKey: "condition_display",
                className: "col-span-full",
                fieldType: "select",
                options: CONDITION_OPTIONS,
            },
            product_or_service_locations: {
                label: "locationOrOfferedGoods",
                className: "col-span-2",
            },
            product_or_service_target_locations: {
                label: "preferredRegionOfCounterparty",
                className: "col-span-2",
            },
            cash_component: {
                label: "cashComponent",
                className: "col-span-2",
            },
            delivery_terms: {
                label: "deliveryTerms",
                className: "col-span-2",
            },
            trade_validity: {
                label: "tradeValidaty",
                className: "col-span-2",
            },
            documentation_needed: {
                label: "documentationNeeded",
                className: "col-span-2",
            },
        },
        priceModel: {
            priceLabels: {
                "Fixed Price": "fixedPrice",
            },
            options: [
                { id: "Fixed Price", name: "fixedPrice" },
                { id: "Negotiable", name: "negotiable" },
                {
                    id: "Request for Quotation (RFQ)",
                    name: "requestForQuotation",
                },
                { id: "Price on Request", name: "priceOnRequest" },
                { id: "Not Applicable", name: "notApplicable" },
            ],
        },
    },
]
