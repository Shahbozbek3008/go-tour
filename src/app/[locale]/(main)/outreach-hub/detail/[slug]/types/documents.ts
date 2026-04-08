import { IconDoc } from "@/assets/icons/docx"
import { IconPdf } from "@/assets/icons/pdf"
import { IconXLSX } from "@/assets/icons/xls"

import { IconProps } from "@/assets/icons/types"

export const extensionIconMap: Record<string, React.FC<IconProps>> = {
    pdf: IconPdf,
    docx: IconDoc,
    xlsx: IconXLSX,
}

export const DOCUMENTS = [
    {
        id: 1,
        name: "Financial Projections",
        Icon: IconPdf,
    },
    {
        id: 2,
        name: "Financial Projections",
        Icon: IconDoc,
    },
    {
        id: 3,
        name: "Financial Projections",
        Icon: IconXLSX,
    },
]
