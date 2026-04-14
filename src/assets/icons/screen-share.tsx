import { type IconProps } from "./types"

export const IconScreenShare = (props: IconProps) => {
    return (
        <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M17.9112 15V18C17.9112 18.5523 17.4635 19 16.9112 19H6.91119C6.35891 19 5.91119 18.5523 5.91119 18V8C5.91119 7.44772 6.35891 7 6.91119 7H9.91119"
                stroke="#212121"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15.9112 5H19.9112V9"
                stroke="#212121"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.9112 13L19.9112 5"
                stroke="#212121"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
