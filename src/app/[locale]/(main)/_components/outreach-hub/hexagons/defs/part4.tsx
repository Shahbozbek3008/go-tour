export default function Part4() {
    return (
        <>
            <filter
                id="filter10_f_6868_90177"
                x="313"
                y="481.632"
                width="348"
                height="306.736"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                />
                <feGaussianBlur
                    stdDeviation="10"
                    result="effect1_foregroundBlur_6868_90177"
                />
            </filter>
            <filter
                id="filter11_i_6868_90177"
                x="333"
                y="501.632"
                width="308"
                height="270.736"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="15" />
                <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                />
                <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_6868_90177"
                />
            </filter>
            <filter
                id="filter12_f_6868_90177"
                x="361.965"
                y="596.006"
                width="69.2791"
                height="69.2783"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                />
                <feGaussianBlur
                    stdDeviation="8"
                    result="effect1_foregroundBlur_6868_90177"
                />
            </filter>
            <pattern
                id="pattern5_6868_90177"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
            >
                <use href="#image4_6868_90177" transform="scale(0.000976562)" />
            </pattern>
        </>
    )
}
