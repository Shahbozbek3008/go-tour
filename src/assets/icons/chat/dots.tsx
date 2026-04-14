import { type IconProps } from "../types"

export const IconDots = (props: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            {...props}
        >
            <circle
                cx="11.0026"
                cy="10.9999"
                r="0.916667"
                stroke="#808390"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle
                cx="11.0026"
                cy="17.4167"
                r="0.916667"
                stroke="#808390"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <ellipse
                cx="11.0026"
                cy="4.58341"
                rx="0.916667"
                ry="0.916667"
                stroke="#808390"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
