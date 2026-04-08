import { IconProps } from "./types"

export const IconEyeOpen = ({ stroke = "#212121", ...props }: IconProps) => {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle
                cx="9"
                cy="9"
                r="2"
                fill={stroke}
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16.5 9C14.4997 12.5002 12 14.25 9 14.25C6 14.25 3.50025 12.5002 1.5 9C3.50025 5.49975 6 3.75 9 3.75C12 3.75 14.4997 5.49975 16.5 9"
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
