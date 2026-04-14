import { type IconProps } from "./types"

export default function IconGradientSearch(props: IconProps) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle
                cx="8.33333"
                cy="8.33333"
                r="5.83333"
                stroke="url(#paint0_linear_3204_47713)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M17.5 17.5L12.5 12.5"
                stroke="url(#paint1_linear_3204_47713)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_3204_47713"
                    x1="13.7022"
                    y1="4.89664"
                    x2="4.59585"
                    y2="15.901"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#00BCE6" />
                    <stop offset="1" stopColor="#D500F9" />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_3204_47713"
                    x1="17.3009"
                    y1="13.5271"
                    x2="13.3982"
                    y2="18.2433"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#00BCE6" />
                    <stop offset="1" stopColor="#D500F9" />
                </linearGradient>
            </defs>
        </svg>
    )
}
