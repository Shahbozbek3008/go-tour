import { type IconProps } from "./types"

export const IconLocation = (props: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <circle
                cx="12"
                cy="11"
                r="3"
                stroke="currentColor"
                strokeOpacity="0.7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.657 16.6567L13.414 20.8997C12.6331 21.6798 11.3679 21.6798 10.587 20.8997L6.343 16.6567C3.21892 13.5325 3.21901 8.46723 6.34319 5.3431C9.46738 2.21897 14.5326 2.21897 17.6568 5.3431C20.781 8.46723 20.7811 13.5325 17.657 16.6567V16.6567Z"
                stroke="currentColor"
                strokeOpacity="0.7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
