import { type IconProps } from "./types"

const IconFileDigit = (props: IconProps) => {
    return (
        <svg
            width="31"
            height="30"
            viewBox="0 0 31 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M18.2521 3.75V8.75C18.2521 9.44036 18.8117 10 19.5021 10H24.5021"
                stroke="#212121"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <rect
                x="12.0021"
                y="15"
                width="3.75"
                height="6.25"
                rx="1"
                stroke="#212121"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.0021 26.25H9.50211C8.12139 26.25 7.00211 25.1307 7.00211 23.75V6.25C7.00211 4.86929 8.12139 3.75 9.50211 3.75H18.2521L24.5021 10V23.75C24.5021 25.1307 23.3828 26.25 22.0021 26.25Z"
                stroke="#212121"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M19.5021 15V21.25"
                stroke="#212121"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default IconFileDigit
