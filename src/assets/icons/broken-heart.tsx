import { type IconProps } from "./types"

export const IconBrokenHeart = ({
    stroke = "#999CA6",
    ...props
}: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="22"
            viewBox="0 0 21 22"
            fill="none"
            {...props}
        >
            <mask
                id="mask0_2989_39239"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="21"
                height="22"
            >
                <path d="M0 0.500061H20.9999V21.5H0V0.500061Z" fill="white" />
            </mask>
            <g mask="url(#mask0_2989_39239)">
                <path
                    d="M10.5 5.25639C10.5 5.25639 12.1537 2.79546 15.4218 2.79546C18.3356 2.79546 20.1796 5.32189 20.1796 8.26418C20.1796 11.6699 17.6064 15.6994 10.5 19.2017C3.39358 15.6994 0.820312 11.6699 0.820312 8.26418C0.820312 5.32189 2.66437 2.79546 5.57811 2.79546C8.84623 2.79546 10.5 5.25639 10.5 5.25639Z"
                    stroke={stroke}
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M10.5 5.25639L8.85938 9.35794L12.1406 12.6392L10.5 19.2017"
                    stroke={stroke}
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    )
}
