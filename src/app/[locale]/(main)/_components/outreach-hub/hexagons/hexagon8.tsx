import { Link } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"

export default function Hexagon8() {
    return (
        <Link href={getHref({ pathname: "/[locale]/outreach-hub" })}>
            <g filter="url(#filter4_i_6868_90177)">
                <path
                    d="M433.047 884.34L387.773 805.924L297.227 805.924L251.953 884.34L297.227 962.756L387.773 962.756L433.047 884.34Z"
                    fill="url(#pattern1_6868_90177)"
                />
            </g>
            <path
                d="M386.908 807.424L298.093 807.424L253.686 884.34L298.093 961.256L386.908 961.256L431.315 884.34L386.908 807.424Z"
                stroke="url(#paint10_linear_6868_90177)"
                strokeWidth="3"
            />
        </Link>
    )
}
