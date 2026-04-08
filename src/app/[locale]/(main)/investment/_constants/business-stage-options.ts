import { TranslationKey } from "@/components/common/translation/types"

interface Option {
    id: string
    name: TranslationKey
}

export const BUSINESS_STAGE_OPTIONS: Option[] = [
    { id: "Idea / Concept", name: "ideaConcept" },
    { id: "Prototype / MVP", name: "prototypeMvp" },
    { id: "Revenue-generating", name: "revenueGenerating" },
    { id: "Profitable / Break-even", name: "profitableBreakEven" },
    { id: "Scaling / Expanding", name: "scalingExpanding" },
    { id: "Mature / Established", name: "matureEstablished" },
    { id: "Open to All", name: "openToAll" },
]

export const BUSINESS_STAGE_OPTIONS_SEEK: Option[] = [
    { id: "Idea / Concept Stage", name: "ideaConceptStage" },
    { id: "Prototype / MVP Ready", name: "prototypeMvpReady" },
    { id: "Generating Revenue (Pre-Profit)", name: "revenueGeneratingProfit" },
    { id: "Profitable / Break-even", name: "profitableBreakEven" },
    { id: "Scaling / Expanding", name: "scalingExpanding" },
    { id: "Established / Mature Business", name: "matureEstablishedBusiness" },
]

export const BUSINESS_STAGE_OPTIONS_LOOK: Option[] = [
    { id: "Feasibility Study Completed", name: "feasibilityStudy" },
    { id: "Pre-Construction", name: "preConstruction" },
]

export const BUSINESS_STAGE_OPTIONS_SELL: Option[] = [
    { id: "Exploration / Feasibility", name: "explorationFeasibility" },
    { id: "Pre-Construction", name: "preConstruction" },
    { id: "Under Construction", name: "underConstruction" },
    { id: "Operational", name: "operational" },
    { id: "Temporarily Suspended", name: "temporarilySuspended" },
    { id: "Closed / Idle", name: "closedIdle" },
]

export const BUSINESS_STAGE_OPTIONS_ACQUIRING_BUSINESS: Option[] = [
    { id: "Exploration / Feasibility", name: "explorationFeasibility" },
    { id: "Pre-Construction", name: "preConstruction" },
    { id: "Under Construction", name: "underConstruction" },
    { id: "Operational", name: "operational" },
    { id: "Distressed / Turnaround", name: "distressedTurnaround" },
]
