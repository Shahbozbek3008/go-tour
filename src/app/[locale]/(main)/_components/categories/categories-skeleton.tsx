import { cn } from "@/lib/utils/shadcn"
import { getCategoryGridClass } from "./categories.utils"

const SKELETON_IDS = ["beach", "city", "nature", "adventure", "hiking", "ski"]

function SkeletonCard({ id }: { id: string }) {
    const gridClass = getCategoryGridClass(id)
    const cityExtra =
        id === "city" ?
            "col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-2"
        :   ""

    return (
        <div
            className={cn(
                "rounded-xl min-h-[160px] md:min-h-0 w-full h-full",
                "bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200",
                "animate-[shimmer_1.5s_infinite]",
                "bg-[length:200%_100%]",
                gridClass,
                cityExtra,
            )}
        />
    )
}

export function CategoriesSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1fr_2fr_1fr_1fr] lg:grid-rows-2 gap-3 w-full h-auto lg:h-[360px]">
            {SKELETON_IDS.map((id) => (
                <SkeletonCard key={id} id={id} />
            ))}
        </div>
    )
}
