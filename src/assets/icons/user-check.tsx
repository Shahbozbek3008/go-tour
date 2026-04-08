import { type IconProps } from "./types"

export const IconUsercheck = (props: IconProps) => {
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
                cx="6.75"
                cy="5.25"
                r="3"
                stroke="#212121"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.25 15.75V14.25C2.25 12.5931 3.59315 11.25 5.25 11.25H8.25C9.90685 11.25 11.25 12.5931 11.25 14.25V15.75"
                stroke="#212121"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 8.25L13.5 9.75L16.5 6.75"
                stroke="#212121"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
