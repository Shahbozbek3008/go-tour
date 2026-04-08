import { Skeleton } from "@/components/ui/skeleton"
import { TableCell, TableRow } from "@/components/ui/table"

export default function SkeletonDesktopRow() {
    return (
        <TableRow className="grid grid-cols-7 overflow-hidden">
            <TableCell className="w-full col-span-1">
                <div className="w-full flex items-start gap-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="w-full flex flex-col gap-1">
                        <Skeleton className="h-3 w-full rounded-xl" />
                        <Skeleton className="h-3 w-full" />
                    </div>
                </div>
            </TableCell>

            {[1, 2, 3, 4, 5, 6].map((_, i) => (
                <TableCell
                    key={i}
                    className="w-full col-span-1 flex items-center justify-center"
                >
                    <Skeleton className="h-4 max-w-[11.25rem] w-full" />
                </TableCell>
            ))}
        </TableRow>
    )
}
