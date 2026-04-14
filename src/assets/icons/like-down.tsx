import { IconProps } from "./types"

export const IconLikeDown = ({
    stroke = "currentColor",
    ...props
}: IconProps) => {
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
                d="M5.25 9.74973V3.74973C5.25 3.33552 4.91421 2.99973 4.5 2.99973H3C2.58579 2.99973 2.25 3.33552 2.25 3.74973V8.99973C2.25 9.41394 2.58579 9.74973 3 9.74973H5.25C6.90685 9.74973 8.25 11.0929 8.25 12.7497V13.4997C8.25 14.3282 8.92157 14.9997 9.75 14.9997C10.5784 14.9997 11.25 14.3282 11.25 13.4997V9.74973H13.5C14.3284 9.74973 15 9.07816 15 8.24973L14.25 4.49973C14.0284 3.55454 13.4169 2.943 12.75 2.99973H7.5C6.25736 2.99973 5.25 4.00709 5.25 5.24973"
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
