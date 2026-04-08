"use client"

import { Skeleton } from "@/components/ui/skeleton"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import SkeletonDesktopRow from "./desktop/skeleton-desktop-row"

export default function SkeletonTable() {
    return (
        <div className="overflow-hidden">
            {/* desktop view */}
            <div className="hidden md:block">
                <div className="overflow-y-auto max-h-[60vh] scrollbar">
                    <Table className="min-w-full">
                        <TableHeader className="bg-white sticky top-0 z-10">
                            <TableRow className="grid grid-cols-7">
                                {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
                                    <TableHead
                                        key={i}
                                        className="w-full col-span-1 flex items-center justify-center"
                                    >
                                        <Skeleton className="max-w-[12.5rem] w-full h-5" />
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {[1, 2, 3, 4].map((_, i) => (
                                <SkeletonDesktopRow key={i} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* mobile view */}
            <li className="px-3 py-2">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0 max-w-[260px] w-full">
                        <Skeleton className="!h-10 !w-10 rounded-full" />
                        <div className="min-w-0 w-[7.5rem] flex flex-col gap-1">
                            <Skeleton className="h-3 w-full rounded-xl" />
                            <Skeleton className="h-3 w-full rounded-xl" />
                        </div>
                    </div>
                    <Skeleton className="w-[7.5rem] h-7 rounded-full" />
                </div>
            </li>
        </div>
    )
}
