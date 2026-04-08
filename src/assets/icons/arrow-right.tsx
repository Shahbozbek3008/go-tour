import { IconProps } from "./types"

export const IconArrowRight = ({ stroke = "white", ...props }: IconProps) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M15.8926 10.0005H4.10744"
                stroke={stroke}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.5898 4.69641L15.8931 9.99971L10.5898 15.303"
                stroke={stroke}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
