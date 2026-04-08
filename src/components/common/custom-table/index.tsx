"use client"

import Spinner from "@/components/ui/spinner"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableProps,
    TableRow,
} from "@/components/ui/table"
import useSearch from "@/hooks/use-search"
import { SEARCH_PARAMS } from "@/lib/constants/search-params"
import { cn } from "@/lib/utils/shadcn"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    Row,
    RowData,
    useReactTable,
} from "@tanstack/react-table"
import { ReactNode, useState } from "react"
import { ScrollPagination, ScrollPaginationProps } from "../scroll-pagination"
import { Pagination } from "./pagination"
import TableActions from "./table-actions"
import { TCellProps } from "./types"
import { rowsPerPageOptions } from "./utils"

// --- Extend ColumnMeta
declare module "@tanstack/table-core" {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> extends TCellProps {
        className?: string
        thClassName?: string
        tdClassName?: string
        // hideOnMobile?: boolean
    }
}

interface DataTableProps<TData, TValue> {
    columns: (ColumnDef<TData, TValue> & { fixed?: "left" | "right" })[]
    data: TData[]
    count?: number | undefined
    className?: string
    isLoading?: boolean
    pageKey?: string
    pageSizeKey?: string
    prev?: null | string
    next?: null | string
    rowClassName?: (item: TData) => string
    disableNumeration?: boolean
    onEdit?: (data: Row<TData>) => void
    onDelete?: (data: Row<TData>) => void
    onUndo?: (data: Row<TData>) => void
    onView?: (data: Row<TData>) => void
    additionalActions?: ((data: Row<TData>) => React.ReactNode)[]
    actionMenuMode?: boolean
    actionHeader?: ReactNode
    tableProps?: TableProps
    scrollPaginationProps?: ScrollPaginationProps
}

export function CustomTable<TData, TValue>({
    columns,
    data = [],
    count,
    className,
    isLoading = false,
    pageKey = SEARCH_PARAMS.PAGE,
    pageSizeKey = SEARCH_PARAMS.PAGE_SIZE,
    rowClassName,
    disableNumeration = false,
    onDelete,
    onEdit,
    onUndo,
    onView,
    additionalActions,
    actionMenuMode,
    actionHeader,
    tableProps,
    scrollPaginationProps,
}: DataTableProps<TData, TValue>) {
    const isAction =
        onDelete ||
        onView ||
        onEdit ||
        onUndo ||
        additionalActions ||
        actionHeader

    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns:
            isAction ?
                [
                    ...columns,
                    {
                        header: () => actionHeader || " ",
                        accessorKey: "action",
                        cell: ({ row }) => (
                            <TableActions
                                menuMode={actionMenuMode}
                                onDelete={
                                    onDelete ? () => onDelete?.(row) : undefined
                                }
                                onEdit={
                                    onEdit ? () => onEdit?.(row) : undefined
                                }
                                onUndo={
                                    onUndo ? () => onUndo?.(row) : undefined
                                }
                                onView={
                                    onView ? () => onView?.(row) : undefined
                                }
                                additionalActions={additionalActions?.map(
                                    (action) => action(row),
                                )}
                            />
                        ),
                        meta: {
                            fixed: "right",
                            thClassName: cn(
                                "text-center w-20",
                                actionHeader && "py-2",
                            ),
                        },
                    },
                ]
            :   columns,
        getCoreRowModel: getCoreRowModel(),
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    })

    const search = useSearch()
    const page = search[pageKey] || 1
    const pageSize = search[pageSizeKey] || rowsPerPageOptions[0].id

    return (
        <main className={cn("w-full overflow-auto", className)}>
            <div className="rounded-md border relative bg-background">
                {isLoading && (
                    <div className="absolute inset-0 grid place-items-center bg-foreground/60 z-20 rounded-md">
                        <Spinner />
                    </div>
                )}

                <Table containerClassName="overflow-visible" {...tableProps}>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup, i) => (
                            <TableRow key={i}>
                                {!disableNumeration && (
                                    <TableHead
                                        fixed="left"
                                        className="border border-b-2 w-5"
                                    >
                                        №
                                    </TableHead>
                                )}
                                {headerGroup.headers.map((h, i) => {
                                    const {
                                        column: {
                                            columnDef: { meta, header },
                                        },
                                        getContext,
                                    } = h
                                    return (
                                        <TableHead
                                            key={i}
                                            className={cn(
                                                "border border-b-2",
                                                meta?.className,
                                                meta?.thClassName,
                                            )}
                                            fixed={meta?.fixed}
                                            fixedPosition={meta?.fixedPosition}
                                        >
                                            {h.isPlaceholder ? null : (
                                                flexRender(header, getContext())
                                            )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ?
                            table.getRowModel().rows.map((row, i) => (
                                <TableRow
                                    key={row.id}
                                    className={cn(
                                        rowClassName ?
                                            rowClassName(row.original)
                                        :   "",
                                    )}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {!disableNumeration && (
                                        <TableCell
                                            fixed="left"
                                            className="w-4 border text-center"
                                        >
                                            {(page - 1) * pageSize + i + 1}
                                        </TableCell>
                                    )}
                                    {row.getVisibleCells().map((c, i) => {
                                        const {
                                            column: {
                                                columnDef: { meta, cell },
                                            },
                                            getContext,
                                        } = c
                                        return (
                                            <TableCell
                                                key={i}
                                                className={cn(
                                                    "border",
                                                    meta?.className,
                                                    meta?.tdClassName,
                                                )}
                                                fixed={meta?.fixed}
                                                fixedPosition={
                                                    meta?.fixedPosition
                                                }
                                            >
                                                {flexRender(cell, getContext())}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))
                        :   <TableRow>
                                <TableCell
                                    colSpan={columns.length + 2}
                                    className="h-24 text-center"
                                ></TableCell>
                            </TableRow>
                        }
                    </TableBody>
                    {scrollPaginationProps && (
                        <TableFooter>
                            <TableRow className="border-b-none">
                                {!disableNumeration && (
                                    <TableCell className="p-0" />
                                )}
                                <TableCell className="p-0">
                                    <ScrollPagination
                                        {...scrollPaginationProps}
                                    />
                                </TableCell>
                                {!!actionHeader && (
                                    <TableCell className="p-0" />
                                )}
                            </TableRow>
                        </TableFooter>
                    )}
                </Table>

                {/* <div className="hidden">
                    <Table {...tableProps}>
                        <TableBody className="divide-y divide-border">
                            {table.getRowModel().rows?.length ?
                                table.getRowModel().rows.map((row, i) => (
                                    <TableRow
                                        key={row.id}
                                        className="bg-background"
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        <TableCell className="w-full">
                                            {!disableNumeration && (
                                                <div className="text-xs text-muted-foreground">
                                                    №{" "}
                                                    {(page - 1) * pageSize +
                                                        i +
                                                        1}
                                                </div>
                                            )}

                                            {row
                                                .getVisibleCells()
                                                .filter(
                                                    (c) =>
                                                        !c.column.columnDef.meta
                                                            ?.hideOnMobile,
                                                )
                                                .map((c) => (
                                                    <div
                                                        key={c.id}
                                                        className="flex justify-between pr-2 py-1 border-b last:border-0"
                                                    >
                                                        <span className="font-medium text-sm truncate">
                                                            {flexRender(
                                                                c.column
                                                                    .columnDef
                                                                    .header,
                                                                // @ts-expect-error sdf
                                                                c.getContext(),
                                                            )}
                                                        </span>
                                                        <span className="text-sm truncate text-right">
                                                            {flexRender(
                                                                c.column
                                                                    .columnDef
                                                                    .cell,
                                                                c.getContext(),
                                                            )}
                                                        </span>
                                                    </div>
                                                ))}
                                        </TableCell>
                                    </TableRow>
                                ))
                            :   <TableRow>
                                    <TableCell className="text-center p-4">
                                        -
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </div> */}
            </div>

            {!!count && (
                <Pagination
                    className="mt-4"
                    count={count}
                    pageKey={pageKey}
                    pageSizeKey={pageSizeKey}
                    data={data}
                    isLoading={isLoading}
                />
            )}
        </main>
    )
}
