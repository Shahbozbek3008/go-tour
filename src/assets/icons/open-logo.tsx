export const OpenLogo = ({ className }: { className?: string }) => (
    <svg
        width="48"
        height="20"
        viewBox="0 0 48 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Open"
    >
        <text
            x="0"
            y="17"
            fontFamily="Arial, sans-serif"
            fontWeight="800"
            fontSize="18"
            fill="url(#openGradBooking)"
        >
            open
        </text>
        <defs>
            <linearGradient
                id="openGradBooking"
                x1="0"
                y1="0"
                x2="48"
                y2="0"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
        </defs>
    </svg>
)
