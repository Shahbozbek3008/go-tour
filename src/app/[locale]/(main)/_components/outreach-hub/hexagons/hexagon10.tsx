import { Link } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"

export default function Hexagon10() {
    return (
        <Link href={getHref({ pathname: "/[locale]/outreach-hub" })}>
            <path
                d="M807.399 695.604L753.603 695.604L726.704 742.194L753.603 788.782L807.399 788.782L834.298 742.194L807.399 695.604Z"
                fill="url(#pattern2_6868_90177)"
                stroke="url(#paint11_linear_6868_90177)"
                strokeWidth="3"
            />
        </Link>
    )
}
