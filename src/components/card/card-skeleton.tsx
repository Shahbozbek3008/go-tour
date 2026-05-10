import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

export const ProductCardSkeleton = () => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100 flex-shrink-0 w-full animate-in fade-in duration-500">
            {/* Image Area */}
            <div className="relative h-[200px]">
                <Skeleton className="w-full h-full rounded-none" />

                {/* Badge Skeleton */}
                <div className="absolute top-3 left-3">
                    <Skeleton className="w-16 h-5 rounded-full" />
                </div>

                {/* Author Skeleton */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <Skeleton className="w-7 h-7 rounded-full" />
                    <Skeleton className="w-20 h-3 rounded-md" />
                </div>
            </div>

            {/* Content Area */}
            <div className="p-4 space-y-3">
                {/* Rating row */}
                <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <Skeleton className="w-10 h-3 rounded-md" />
                    <Skeleton className="w-20 h-3 rounded-md" />
                </div>

                {/* Title */}
                <div className="space-y-1.5">
                    <Skeleton className="w-full h-4 rounded-md" />
                    <Skeleton className="w-3/4 h-4 rounded-md" />
                </div>

                {/* Subtitle */}
                <Skeleton className="w-full h-3 rounded-md" />

                {/* Footer price/dates */}
                <div className="flex items-end justify-between pt-2">
                    <div className="space-y-1.5">
                        <Skeleton className="w-16 h-5 rounded-md" />
                        <Skeleton className="w-12 h-3 rounded-md" />
                    </div>
                    <Skeleton className="w-20 h-6 rounded-full" />
                </div>
            </div>
        </div>
    )
}

export const ProductGridSkeleton = ({ count = 6 }: { count?: number }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={`skeleton-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ProductCardSkeleton />
                </motion.div>
            ))}
        </>
    )
}
