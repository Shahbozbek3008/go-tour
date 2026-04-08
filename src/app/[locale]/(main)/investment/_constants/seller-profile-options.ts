import { TranslationKey } from "@/components/common/translation/types"

interface Option {
    id: string
    name: TranslationKey
}

export const SELLER_PROFILE_OPTIONS: Option[] = [
    { id: "Corporate Seller", name: "corporateSeller" },
    { id: "Private Owner", name: "privateOwner" },
    { id: "Financial Seller (PE, VC)", name: "financialSellerPe" },
    { id: "Government Entity", name: "governmentEntity" },
    { id: "Open to All", name: "openToAll" },
]
