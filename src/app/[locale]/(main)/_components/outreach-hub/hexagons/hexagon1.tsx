import { Link } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"

export default function Hexagon1() {
    return (
        <Link href={getHref({ pathname: "/[locale]/outreach-hub" })}>
            <g
                className="mix-blend-hard-light"
                filter="url(#filter2_f_6868_90177)"
            >
                <path
                    d="M134.354 174.351L202.614 134.941L270.874 174.351L270.874 253.171L202.614 292.58L134.354 253.171L134.354 174.351Z"
                    fill="url(#paint7_linear_6868_90177)"
                />
                <path
                    d="M202.614 138.405L267.872 176.083L267.873 251.439L202.613 289.116L137.354 251.439L137.353 176.083L202.614 138.405Z"
                    stroke="url(#paint8_linear_6868_90177)"
                    strokeWidth="6"
                />
            </g>
            <g filter="url(#filter5_i_6868_90177)">
                <path
                    d="M339.049 215.649L292.775 135.5L200.227 135.5L153.953 215.649L200.227 295.798L292.775 295.798L339.049 215.649Z"
                    fill="url(#pattern3_6868_90177)"
                />
            </g>
            <path
                d="M291.909 137L201.094 137L155.686 215.649L201.094 294.297L291.909 294.297L337.317 215.649L291.909 137Z"
                stroke="url(#paint12_linear_6868_90177)"
                strokeWidth="3"
            />
        </Link>
    )
}
