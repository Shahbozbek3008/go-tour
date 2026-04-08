import { useId } from "react"
import { IconProps } from "./types"

export default function IconArrowUpRightSquare(props: IconProps) {
    const gradientId = useId() // har bir icon uchun unikal id

    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 16C1.79086 16 0 14.2091 0 12V4C0 1.79086 1.79086 0 4 0H12C14.2091 0 16 1.79086 16 4V12C16 14.2091 14.2091 16 12 16H4Z"
                fill={`url(#${gradientId})`}
            />
            <path
                d="M9.80469 9.69678V5.92554"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.65608 10.0745L9.80444 5.92618"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.03333 5.92542H9.80456"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient
                    id={gradientId}
                    x1="3.28682"
                    y1="0.637003"
                    x2="18.3785"
                    y2="13.1257"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#00BCE6" />
                    <stop offset="1" stopColor="#D500F9" />
                </linearGradient>
            </defs>
        </svg>
    )
}
