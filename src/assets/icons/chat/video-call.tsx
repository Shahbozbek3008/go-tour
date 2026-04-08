import { type IconProps } from "../types"

export const IconVideoCall = (props: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.75 9.1669L17.9236 7.08056C18.2077 6.93861 18.545 6.9538 18.8151 7.12072C19.0853 7.28764 19.2498 7.58249 19.25 7.90006V14.1004C19.2498 14.418 19.0853 14.7128 18.8151 14.8797C18.545 15.0467 18.2077 15.0619 17.9236 14.9199L13.75 12.8336V9.1669Z"
                stroke="#808390"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <rect
                x="2.75"
                y="5.5"
                width="11"
                height="11"
                rx="2"
                stroke="#808390"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
