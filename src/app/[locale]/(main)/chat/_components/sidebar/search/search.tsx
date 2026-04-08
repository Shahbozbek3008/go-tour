"use client"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils/shadcn"
import { useTranslations } from "next-intl"
import { useFilterStore } from "../../../_store/use-filter-store"
import { useToggleStore } from "../../../_store/use-toggle-store"

export default function Search() {
    const t = useTranslations()
    const { setSearch } = useFilterStore()
    const { isCollapsed } = useToggleStore()

    if (isCollapsed) return

    return (
        <div className={cn("flex-1 px-6", isCollapsed && "hidden")}>
            <Input
                type="search"
                placeholder={t("search")}
                handleDebouncedInputValue={setSearch}
                className="w-full h-9.5 focus-visible:ring-0 border-[var(--gray-border)] focus-visible:ring-offset-0 focus:outline-none"
            />
        </div>
    )
}
