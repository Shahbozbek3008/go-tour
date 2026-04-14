import { cn } from "@/lib/utils/shadcn"
import Spinner from "../ui/spinner"

type Props = {
    className?: string
}

export default function Loader({ className }: Props) {
    return (
        <div
            className={cn(
                "absolute rounded top-0 left-0 w-full h-full inset-0 z-50 bg-black/1 grid place-items-center",
                className,
            )}
        >
            <Spinner />
        </div>
    )
}
