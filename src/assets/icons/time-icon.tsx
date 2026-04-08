import { type IconProps } from "./types"

export default function IconTime({ ...props }: IconProps) {
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
                r="6.75"
                stroke="#212121"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9 5.25V9L11.25 11.25"
                stroke="#212121"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
