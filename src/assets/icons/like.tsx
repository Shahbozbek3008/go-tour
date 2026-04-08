import { type IconProps } from "./types"

export const IconLike = ({ stroke = "currentColor", ...props }: IconProps) => {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M5.25 8.25V14.25C5.25 14.6642 4.91421 15 4.5 15H3C2.58579 15 2.25 14.6642 2.25 14.25V9C2.25 8.58579 2.58579 8.25 3 8.25H5.25C6.90685 8.25 8.25 6.90685 8.25 5.25V4.5C8.25 3.67157 8.92157 3 9.75 3C10.5784 3 11.25 3.67157 11.25 4.5V8.25H13.5C14.3284 8.25 15 8.92157 15 9.75L14.25 13.5C14.0284 14.4452 13.4169 15.0567 12.75 15H7.5C6.25736 15 5.25 13.9926 5.25 12.75"
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
