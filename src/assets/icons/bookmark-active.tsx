import { type IconProps } from "./types"

export const IconBookmarkActive = (props: IconProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-current"
            {...props}
        >
            <path
                d="M9 6H15C16.1046 6 17 6.7835 17 7.75V20L12 17.375L7 20V7.75C7 6.7835 7.89543 6 9 6"
                stroke="#fff"
                strokeOpacity="0.9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
