import { IconProps } from "./types"

export default function IconBell(props: IconProps) {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <mask
                id="mask0_6260_1249"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="32"
                height="32"
            >
                <path
                    d="M30.5 30.5V1.5H1.5V30.5H30.5Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="3"
                />
            </mask>
            <g mask="url(#mask0_6260_1249)">
                <path
                    d="M16 3.50001V6"
                    stroke="white"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M18.5 23.5V26C18.5 27.3807 17.3807 28.5 16 28.5C14.6193 28.5 13.5 27.3807 13.5 26V23.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M6 23.5C7.38068 23.5 8.49999 22.3807 8.49999 21V13.5C8.49999 9.35792 11.8579 6.00005 16 6.00005C20.1421 6.00005 23.4999 9.35792 23.4999 13.5V21C23.4999 22.3807 24.6193 23.5 25.9999 23.5M6 23.5H25.9999Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    )
}
