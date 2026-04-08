import { Link } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"

export default function Hexagon3() {
    return (
        <Link href={getHref({ pathname: "/[locale]/outreach-hub" })}>
            <path
                d="M533.391 113.239L507.608 113.239L494.718 135.567L507.608 157.894L533.391 157.894L546.282 135.567L533.391 113.239Z"
                fill="white"
                stroke="url(#paint13_linear_6868_90177)"
                strokeWidth="3"
            />
            <g clipPath="url(#clip0_6868_90177)">
                <mask
                    id="mask0_6868_90177"
                    className="mask-type-luminance"
                    maskUnits="userSpaceOnUse"
                    x="506"
                    y="122"
                    width="28"
                    height="27"
                >
                    <path
                        d="M506.992 122.059H533.006V148.073H506.992V122.059Z"
                        fill="white"
                    />
                </mask>
                <g mask="url(#mask0_6868_90177)">
                    <path
                        d="M515.705 130.039C515.705 134.12 519.997 137.091 519.997 137.091C519.997 137.091 524.29 134.12 524.29 130.039C524.29 125.958 519.997 122.987 519.997 122.987C519.997 122.987 515.705 125.958 515.705 130.039Z"
                        stroke="url(#paint14_linear_6868_90177)"
                        strokeMiterlimit="10"
                    />
                    <path
                        d="M511.833 141.238C514.719 144.124 519.855 143.19 519.855 143.19C519.855 143.19 520.789 138.054 517.903 135.168C515.017 132.282 509.882 133.217 509.882 133.217C509.882 133.217 508.947 138.352 511.833 141.238Z"
                        stroke="url(#paint15_linear_6868_90177)"
                        strokeMiterlimit="10"
                    />
                    <path
                        d="M528.164 141.238C525.278 144.124 520.142 143.19 520.142 143.19C520.142 143.19 519.208 138.054 522.094 135.168C524.98 132.282 530.115 133.217 530.115 133.217C530.115 133.217 531.05 138.352 528.164 141.238Z"
                        stroke="url(#paint16_linear_6868_90177)"
                        strokeMiterlimit="10"
                    />
                    <path
                        d="M520.144 143.19L525.129 138.204"
                        stroke="url(#paint17_linear_6868_90177)"
                        strokeMiterlimit="10"
                    />
                    <path
                        d="M514.869 138.204L519.855 143.19"
                        stroke="url(#paint18_linear_6868_90177)"
                        strokeMiterlimit="10"
                    />
                    <path
                        d="M519.998 137.091V130.039"
                        stroke="url(#paint19_linear_6868_90177)"
                        strokeMiterlimit="10"
                    />
                    <path
                        d="M519.998 141.391V148.073"
                        stroke="url(#paint20_linear_6868_90177)"
                        strokeMiterlimit="10"
                    />
                </g>
            </g>
        </Link>
    )
}
