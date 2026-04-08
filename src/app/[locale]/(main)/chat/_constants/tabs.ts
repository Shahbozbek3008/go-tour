import { IconConnections } from "@/assets/icons/chat/connections"
import { IconConnectionsActive } from "@/assets/icons/chat/connections-active"
import { IconInvestment } from "@/assets/icons/chat/investment"
import { IconInvestmentActive } from "@/assets/icons/chat/investment-active"
import { IconInvitations } from "@/assets/icons/chat/invitations"
import { IconInvitationsActive } from "@/assets/icons/chat/invitations-active"
import { IconMarketplace } from "@/assets/icons/chat/marketplace"
import { IconMarketplaceActive } from "@/assets/icons/chat/marketplace-active"
import { IconOutreachHub } from "@/assets/icons/chat/outreach-hub"
import { IconOutreachHubActive } from "@/assets/icons/chat/outreach-hub-active"
// import { Tab } from "../_types/tabs"

export const initialTabs = [
    {
        Icon: IconConnections,
        IconActive: IconConnectionsActive,
        label: "Connections",
        active: true,
        tabKey: "connections",
    },
    {
        Icon: IconInvitations,
        IconActive: IconInvitationsActive,
        label: "Invitations",
        tabKey: "invitations",
    },
    {
        Icon: IconMarketplace,
        IconActive: IconMarketplaceActive,
        label: "Marketplace",
        tabKey: "marketplace",
    },
    {
        Icon: IconInvestment,
        IconActive: IconInvestmentActive,
        label: "Investment",
        tabKey: "investment",
    },
    {
        Icon: IconOutreachHub,
        IconActive: IconOutreachHubActive,
        label: "Outreach...",
        tabKey: "outreach_hub",
    },
    // {
    //     Icon: IconEdit,
    //     IconActive: IconEditActive,
    //     label: "Edit",
    //     tabKey: "edit",
    // },
]

export const FOLDERS = [
    {
        id: 1,
        Icon: IconConnections,
        folder_name: "Connections",
        type: "connections",
    },
    {
        id: 2,
        Icon: IconInvitations,
        folder_name: "Invitations",
        type: "invitations",
    },
    {
        id: 3,
        Icon: IconMarketplace,
        folder_name: "Marketplace",
        type: "marketplace",
    },
    {
        id: 4,
        Icon: IconInvestment,
        folder_name: "Investment",
        type: "investment",
    },
    {
        id: 5,
        Icon: IconOutreachHub,
        folder_name: "Outreach hub",
        type: "outreach_hub",
    },
]
