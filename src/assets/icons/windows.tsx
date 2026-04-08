import { type IconProps } from "./types"

const IconWindows = (props: IconProps) => {
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
                d="M16.3141 18.3333L5.31406 16.9583C4.3974 16.8666 3.66406 16.1333 3.66406 15.2166V6.7833C3.66406 5.86664 4.3974 5.1333 5.31406 5.04164L16.3141 3.66664C17.4141 3.57497 18.3307 4.39997 18.3307 5.4083V16.5C18.3307 17.6 17.3224 18.425 16.3141 18.2416V18.3333Z"
                stroke="#00BAD1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.9974 4.58325V17.4166"
                stroke="#00BAD1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.66406 11.0001H18.3307"
                stroke="#00BAD1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default IconWindows
