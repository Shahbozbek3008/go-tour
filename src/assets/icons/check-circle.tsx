import { IconProps } from "./types"

export const IconCheckCircle = (props: IconProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <mask
                id="mask0_5906_27949"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
            >
                <path d="M24 0H0V24H24V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_5906_27949)">
                <path
                    d="M16 9L9.90263 15L7 12.1438"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <mask
                    id="mask1_5906_27949"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                >
                    <path
                        d="M0 7.05719e-05H23.9999V24H0V7.05719e-05Z"
                        fill="white"
                    />
                </mask>
                <g mask="url(#mask1_5906_27949)">
                    <path
                        d="M23 12C23 18.0751 18.0751 23 12 23C5.92488 23 1 18.0751 1 12C1 5.92488 5.92488 1 12 1C18.0751 1 23 5.92488 23 12Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
            </g>
        </svg>
    )
}
