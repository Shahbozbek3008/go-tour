import { IconProps } from "./types"

export const IconInfoCircle = (props: IconProps) => {
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
                stroke="#2F2B3D"
                strokeOpacity="0.9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.00016 6H9.00766"
                stroke="#2F2B3D"
                strokeOpacity="0.9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.25 9H9V12H9.75"
                stroke="#2F2B3D"
                strokeOpacity="0.9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
