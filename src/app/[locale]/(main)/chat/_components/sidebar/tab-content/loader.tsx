import { Skeleton } from "@/components/ui/skeleton"

export default function Loader() {
    return Array.from({ length: 15 }).map((_, i: number) => (
        <div className="flex items-center space-x-4 p-3" key={i}>
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-[90%]" />
            </div>
        </div>
    ))
}
