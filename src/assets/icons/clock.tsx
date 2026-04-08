import { type IconProps } from "./types"

export const IconClock = ({ stroke = "#2F2B3D", ...props }: IconProps) => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle
                cx="8"
                cy="8"
                r="6"
                stroke={stroke}
                strokeOpacity="0.9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8 4.6665V7.99984L10 9.99984"
                stroke={stroke}
                strokeOpacity="0.9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
