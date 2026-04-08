"use client"

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MoreHorizontalIcon,
} from "lucide-react"
import * as React from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils/shadcn"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
    return (
        <nav
            role="navigation"
            aria-label="pagination"
            data-slot="pagination"
            className={cn("mx-auto flex w-full justify-center", className)}
            {...props}
        />
    )
}

function PaginationContent({
    className,
    ...props
}: React.ComponentProps<"ul">) {
    return (
        <ul
            data-slot="pagination-content"
            className={cn("flex flex-row items-center gap-1", className)}
            {...props}
        />
    )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
    return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
    isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
    React.ComponentProps<"a">

function PaginationLink({
    className,
    isActive,
    size = "icon",
    ...props
}: PaginationLinkProps) {
    return (
        <a
            aria-current={isActive ? "page" : undefined}
            data-slot="pagination-link"
            data-active={isActive}
            className={cn(
                "cursor-pointer bg-muted shadow",
                buttonVariants({
                    variant: isActive ? "default" : "ghost",
                    size,
                }),
                className,
            )}
            {...props}
        />
    )
}

function PaginationPrevious({
    className,
    children,
    ...props
}: React.ComponentProps<typeof PaginationLink>) {
    const { isArabic } = useLanguage()
    return (
        <PaginationLink
            aria-label="Go to previous page"
            className={cn("bg-muted", className)}
            {...props}
        >
            <ChevronLeftIcon className={cn(isArabic && "rotate-180")} />
            {children}
        </PaginationLink>
    )
}

function PaginationNext({
    className,
    children,
    ...props
}: React.ComponentProps<typeof PaginationLink>) {
    const { isArabic } = useLanguage()
    return (
        <PaginationLink
            aria-label="Go to next page"
            className={cn("bg-muted", className)}
            {...props}
        >
            {children}
            <ChevronRightIcon className={cn(isArabic && "rotate-180")} />
        </PaginationLink>
    )
}

function PaginationEllipsis({
    className,
    ...props
}: React.ComponentProps<"span">) {
    return (
        <span
            aria-hidden
            data-slot="pagination-ellipsis"
            className={cn("flex size-9 items-center justify-center", className)}
            {...props}
        >
            <MoreHorizontalIcon className="size-4" />
            <span className="sr-only">More pages</span>
        </span>
    )
}

export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
}
