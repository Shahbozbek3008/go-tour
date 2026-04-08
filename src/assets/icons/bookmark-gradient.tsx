import { IconProps } from "./types"

export const IconBookmarkGradient = (props: IconProps) => {
    return (
        <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M10.2 4H19.8C21.5673 4 23 5.23122 23 6.75V26L15 21.875L7 26V6.75C7 5.23122 8.43269 4 10.2 4"
                stroke="url(#paint0_linear_10672_51197)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_10672_51197"
                    x1="22.363"
                    y1="8.51938"
                    x2="5.02711"
                    y2="23.7552"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#00BCE6" />
                    <stop offset="1" stopColor="#D500F9" />
                </linearGradient>
            </defs>
        </svg>
    )
}
