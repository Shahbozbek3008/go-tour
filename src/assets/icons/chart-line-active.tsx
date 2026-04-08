import { type IconProps } from "./types"

export const IconChartLineActive = (props: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            {...props}
        >
            <path
                d="M3 14.25H15"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3 11.25L6 6.75L9 8.25L12 4.5L15 7.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
