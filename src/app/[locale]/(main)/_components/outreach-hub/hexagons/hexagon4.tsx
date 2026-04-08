import { Link } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"

export default function Hexagon4() {
    return (
        <Link href={getHref({ pathname: "/[locale]/outreach-hub" })}>
            <g
                className="mix-blend-hard-light"
                filter="url(#filter1_f_6868_90177)"
            >
                <path
                    d="M520.944 327.747L621.447 269.721L721.951 327.747L721.951 443.798L621.447 501.824L520.944 443.798L520.944 327.747Z"
                    fill="url(#paint5_linear_6868_90177)"
                />
                <path
                    d="M621.447 273.185L718.95 329.479L718.95 442.067L621.447 498.36L523.944 442.066L523.942 329.479L621.447 273.185Z"
                    stroke="url(#paint6_linear_6868_90177)"
                    strokeWidth="6"
                />
            </g>
            <g filter="url(#filter3_i_6868_90177)">
                <path
                    d="M761.059 355.794L704.279 257.449L590.72 257.449L533.941 355.794L590.72 454.139L704.279 454.139L761.059 355.794Z"
                    fill="url(#pattern0_6868_90177)"
                />
            </g>
            <path
                d="M703.414 258.949L591.587 258.949L535.674 355.794L591.587 452.639L703.414 452.639L759.327 355.794L703.414 258.949Z"
                stroke="url(#paint9_linear_6868_90177)"
                strokeWidth="3"
            />
        </Link>
    )
}
