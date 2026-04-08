import { type IconProps } from "./types"

export default function IconX2(props: IconProps) {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M9 3L3 9"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3 3L9 9"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
