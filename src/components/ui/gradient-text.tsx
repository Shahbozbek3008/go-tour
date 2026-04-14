"use client"

import { cn } from "@/lib/utils/shadcn"
import { CSSProperties, ReactNode, useState } from "react"

interface GradientTextProps {
    children: ReactNode
    className?: string
    colors?: string[]
    animationSpeed?: number
    showBorder?: boolean
    hover?: boolean
    style?: CSSProperties
}

export default function GradientText({
    children,
    className = "",
    colors = ["#D500F9", "#00BCE6"],
    animationSpeed = 8,
    showBorder = false,
    hover = false,
    style,
}: GradientTextProps) {
    const [isHovered, setIsHovered] = useState(false)
    const mappedColors = colors.map((c, i) => {
        return `${c} ${(i * 100) / colors.length}%`
    })

    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${mappedColors.join(", ")})`,
        animationDuration: `${animationSpeed}s`,
        ...style,
    }

    const showGradient = hover ? isHovered : true

    return (
        <div
            className={cn(
                "relative flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer",
                showBorder && "py-1 px-2",
                className,
            )}
            onMouseEnter={hover ? () => setIsHovered(true) : undefined}
            onMouseLeave={hover ? () => setIsHovered(false) : undefined}
        >
            {showBorder && showGradient && (
                <div
                    className="absolute inset-0 bg-cover z-0 pointer-events-none animate-gradient"
                    style={{
                        ...gradientStyle,
                        backgroundSize: "300% 100%",
                    }}
                >
                    <div
                        className="absolute inset-0 bg-black rounded-[1.25rem] z-[-1]"
                        style={{
                            width: "calc(100% - 2px)",
                            height: "calc(100% - 2px)",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    ></div>
                </div>
            )}
            <div
                className={`inline-block relative z-2 ${showGradient ? "text-transparent bg-cover animate-gradient" : "text-background "}`}
                style={
                    showGradient ?
                        {
                            ...gradientStyle,
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            backgroundSize: "300% 100%",
                        }
                    :   {}
                }
            >
                {children}
            </div>
        </div>
    )
}

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         gradient: {
//           '0%': { backgroundPosition: '0% 50%' },
//           '50%': { backgroundPosition: '100% 50%' },
//           '100%': { backgroundPosition: '0% 50%' },
//         },
//       },
//       animation: {
//         gradient: 'gradient 8s linear infinite'
//       },
//     },
//   },
//   plugins: [],
// };
