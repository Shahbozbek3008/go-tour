import { IconProps } from "./types"

export const IconCheckCircleGradient = (props: IconProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <mask
                id="mask0_12026_58131"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
            >
                <path d="M24 0H0V24H24V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_12026_58131)">
                <path
                    d="M16 9L9.90263 15L7 12.1438"
                    stroke="url(#paint0_linear_12026_58131)"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <path
                d="M23 12C23 18.0751 18.0751 23 12 23C5.92488 23 1 18.0751 1 12C1 5.92488 5.92488 1 12 1C18.0751 1 23 5.92488 23 12Z"
                stroke="url(#paint1_linear_12026_58131)"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_12026_58131"
                    x1="15.6417"
                    y1="13.7674"
                    x2="11.6089"
                    y2="6.45738"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#00BCE6" />
                    <stop offset="1" stopColor="#D500F9" />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_12026_58131"
                    x1="22.1241"
                    y1="18.4806"
                    x2="4.95217"
                    y2="-2.2705"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#00BCE6" />
                    <stop offset="1" stopColor="#D500F9" />
                </linearGradient>
            </defs>
        </svg>
    )
}
