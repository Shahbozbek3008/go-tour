import useDidUpdateEffect from "@/hooks/use-did-update-effect"
import { cn } from "@/lib/utils/shadcn"
import { useInView } from "react-intersection-observer"
import Spinner from "../ui/spinner"

export interface ScrollPaginationProps {
    className?: string
    isFetchingNextPage?: boolean
    hasNextPage: boolean
    fetchNextPage: () => void
}

export function ScrollPagination({
    className,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
}: ScrollPaginationProps) {
    const { ref, inView } = useInView()

    useDidUpdateEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage])

    return (
        <div ref={ref} className={cn("grid place-items-center h-0", className)}>
            {isFetchingNextPage && <Spinner />}
            {/* {!hasNextPage && !isFetchingNextPage && "Hamma ma'lumot yuklandi"} */}
        </div>
    )
}
