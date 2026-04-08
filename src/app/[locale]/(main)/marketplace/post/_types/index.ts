import { DocumentPayload } from "@/types/common/extra"
import { MarketplaceProductDetail } from "../../_types"

type OmittedDetail = Omit<MarketplaceProductDetail, "documents" | "tags">

export interface MarketplaceProductForm extends OmittedDetail {
    documents: DocumentPayload[]
    tags: string[]
    offered_tags: string[]
}
