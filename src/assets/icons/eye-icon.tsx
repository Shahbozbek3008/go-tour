import { IconProps } from "./types"

export default function IconEye(props: IconProps) {
    return (
        <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle
                cx="9"
                cy="9.13892"
                r="2"
                fill="white"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16.5 9.13892C14.4997 12.6392 12 14.3889 9 14.3889C6 14.3889 3.50025 12.6392 1.5 9.13892C3.50025 5.63867 6 3.88892 9 3.88892C12 3.88892 14.4997 5.63867 16.5 9.13892"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
