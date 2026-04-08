import { DocumentPayload } from "@/types/common/extra"
import { OutreachhubItemDetail } from "../../_types"

type OmittedDetail = Omit<OutreachhubItemDetail, "documents" | "tags">

export interface OutreachHubItemForm extends OmittedDetail {
    documents: DocumentPayload[]
    tags: string[]
    offered_tags: string[]
}
