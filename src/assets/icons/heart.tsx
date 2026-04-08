import { type IconProps } from "./types"

export const IconHeart = (props: IconProps) => {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g clipPath="url(#clip0_2964_79679)">
                <mask
                    id="mask0_2964_79679"
                    style={{ maskType: "luminance" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="14"
                    height="14"
                >
                    <path
                        d="M0.828125 0.885347H13.0634V13.1206H0.828125V0.885347Z"
                        fill="white"
                    />
                </mask>
                <g mask="url(#mask0_2964_79679)">
                    <path
                        d="M6.94438 4.61167C6.94438 4.61167 7.63263 2.22197 9.81202 2.22197C11.5097 2.22197 12.5841 3.59203 12.5841 5.21511C12.5841 7.45988 10.3458 8.94627 6.94438 11.7808C3.543 8.94627 1.30469 7.45988 1.30469 5.21511C1.30469 3.59203 2.3791 2.22197 4.07674 2.22197C6.25614 2.22197 6.94438 4.61167 6.94438 4.61167Z"
                        stroke="white"
                        strokeWidth="1.52941"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
            </g>
            <defs>
                <clipPath id="clip0_2964_79679">
                    <rect
                        width="12.2353"
                        height="12.2353"
                        fill="white"
                        transform="translate(0.828125 0.882324)"
                    />
                </clipPath>
            </defs>
        </svg>
    )
}
