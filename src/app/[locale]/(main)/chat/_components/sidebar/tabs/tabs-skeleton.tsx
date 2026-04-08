import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils/shadcn"
import { FC } from "react"

interface TabsSkeletonProps {
    count?: number
}

const TabsSkeleton: FC<TabsSkeletonProps> = ({ count = 4 }) => {
    return (
        <div className={cn("h-full border-r w-20 flex flex-col")}>
            {Array.from({ length: count }).map((_, idx) => (
                <div
                    key={idx}
                    className="flex flex-col items-center py-3 px-2 cursor-wait"
                >
                    <Skeleton className="h-7 w-7 rounded-md" />
                    <Skeleton className="h-2 w-14 mt-2 rounded" />
                </div>
            ))}
        </div>
    )
}

export default TabsSkeleton
