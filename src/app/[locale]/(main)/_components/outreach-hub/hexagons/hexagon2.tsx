import { Link } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"

export default function Hexagon2() {
    return (
        <Link href={getHref({ pathname: "/[locale]/outreach-hub" })}>
            <path
                d="M405.223 412.017L382.326 372.359L336.534 372.359L313.638 412.016L336.534 451.674L382.327 451.674L405.223 412.017Z"
                fill="white"
                stroke="url(#paint32_linear_6868_90177)"
                strokeWidth="3"
            />
            <g clipPath="url(#clip3_6868_90177)">
                <mask
                    id="mask3_6868_90177"
                    className="mask-type-luminance"
                    maskUnits="userSpaceOnUse"
                    x="342"
                    y="396"
                    width="34"
                    height="33"
                >
                    <path
                        d="M342.99 396.345H375.007V428.361H342.99V396.345Z"
                        fill="white"
                    />
                </mask>
                <g mask="url(#mask3_6868_90177)">
                    <path
                        d="M358.999 406.098C358.999 406.098 360.8 399.845 366.503 399.845C370.945 399.845 373.756 403.43 373.756 407.677C373.756 413.551 367.899 417.44 358.999 424.857C350.098 417.44 344.241 413.551 344.241 407.677C344.241 403.43 347.053 399.845 351.495 399.845C357.198 399.845 358.999 406.098 358.999 406.098Z"
                        stroke="url(#paint33_linear_6868_90177)"
                        strokeWidth="3"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
            </g>
        </Link>
    )
}
