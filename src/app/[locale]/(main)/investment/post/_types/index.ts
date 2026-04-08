import { DocumentPayload } from "@/types/common/extra"
import { InvestmentItemDetail } from "../../_types"

type OmittedDetail = Omit<InvestmentItemDetail, "documents" | "tags">

export interface InvestmentItemForm extends OmittedDetail {
    documents: DocumentPayload[]
    tags: string[]
    offered_tags: string[]
}
