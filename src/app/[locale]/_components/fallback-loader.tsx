// import logo from "@/assets/images/logo.png"

import { cn } from "@/lib/utils/shadcn"

type Props = {
    className?: string
}

export default function FallbackLoader({ className }: Props) {
    return (
        <video
            autoPlay
            loop
            muted
            playsInline
            className={cn("w-full h-screen object-cover", className)}
        >
            <source src="/videos/loader.mp4" type="video/mp4" />
        </video>
    )
    // return (
    //     <div
    //         className={cn(
    //             "absolute rounded top-0 left-0 w-full h-full inset-0 z-50 gradient-2 grid place-items-center",
    //             className,
    //         )}
    //     >
    //         <Image src={logo} alt="logo" />
    //     </div>
    // )
}
