import { TranslationKey } from "@/components/common/translation/types"
import { OutreachHubRequestType, StatusType, TimeType } from "../_types"

interface RequestTypeItem {
    key: OutreachHubRequestType
    name: TranslationKey
    description: TranslationKey
    className: string
}

export const OUTREACH_HUB_TYPES: RequestTypeItem[] = [
    {
        key: "sponsorship",
        className: "bg-[#F6F4F8] text-[#39204F]",
        name: "sponsorship",
        description: "sponsorshipDesc",
    },
    {
        key: "donation",
        className: "bg-[#F6F4F8] text-[#39204F]",
        name: "donation",
        description: "donationDesc",
    },
    {
        key: "grand assistance",
        className: "bg-[#F6F4F8] text-[#39204F]",
        name: "grandAssistance",
        description: "grandAssistanceDesc",
    },
    {
        key: "aid distribution",
        className: "bg-[#F6F4F8] text-[#39204F]",
        name: "addDistribution",
        description: "addDistributionDesc",
    },
    {
        key: "partnership collaboration",
        className: "bg-[#F6F4F8] text-[#39204F]",
        name: "partnershipCollab",
        description: "partnershipCollabDesc",
    },

    {
        key: "volunteering pro bono services",
        className: "bg-[#F6F4F8] text-[#39204F]",
        name: "volunteeringProBono",
        description: "volunteeringProBonoDesc",
    },
    {
        key: "awareness advocacy campaign",
        className: "bg-[#F6F4F8] text-[#39204F]",
        name: "awarenessAdvocacy",
        description: "awarenessAdvocacyDesc",
    },
    {
        key: "emergency response appeal",
        className: "bg-[#F6F4F8] text-[#39204F]",
        name: "emergencyResponse",
        description: "emergencyResponseDesc",
    },
    {
        key: "development project support",
        className: "bg-[#F6F4F8] text-[#39204F]",
        name: "developmentProject",
        description: "developmentProjectDesc",
    },
]

interface StatusTypeItem {
    key: StatusType
    name: TranslationKey
}

export const OUTREACH_HUB_STATUS_TYPES: StatusTypeItem[] = [
    {
        key: "collected",
        name: "collected",
    },
    {
        key: "in progress",
        name: "inProgress",
    },
]

interface TimeTypeItem {
    key: TimeType
    name: TranslationKey
}

const now = new Date()

const day = new Date(now)
day.setDate(now.getDate() - 1)

const week = new Date(now)
week.setDate(now.getDate() - 7)

const month = new Date(now)
month.setMonth(now.getMonth() - 1)

const year = new Date(now)
year.setFullYear(now.getFullYear() - 1)

const format = (date: Date) => date.toISOString().split("T")[0]

export const OUTREACH_HUB_TIME_TYPES: TimeTypeItem[] = [
    {
        key: format(day),
        name: "dayAgo",
    },
    {
        key: format(week),
        name: "weekAgo",
    },
    {
        key: format(month),
        name: "monthAgo",
    },
    {
        key: format(year),
        name: "yearAgo",
    },
]
