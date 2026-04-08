"use client"

import { Link } from "@/i18n/navigation"
import { ArrowUpRightIcon } from "lucide-react"

interface Item {
    id: string
    name: string
    slug: string
}

interface SectionData {
    title: string
    items: Item[]
    getPathname: (slug: string) => string
}

interface SearchSectionProps {
    sectionData: SectionData
    onItemClick: () => void
}

export const SearchSection = ({
    sectionData,
    onItemClick,
}: SearchSectionProps) => {
    const { title, items, getPathname } = sectionData
    if (items.length === 0) return null

    return (
        <div className="flex flex-col gap-y-2 py-4 px-10">
            <h2 className="py-2 text-background border-b border-secondary-main/30">
                {title}
            </h2>
            {items.map((item) => (
                <Link
                    key={item.id}
                    href={getPathname(item.slug)}
                    onClick={onItemClick}
                    className="py-2 flex justify-between items-center text-muted-foreground hover:text-secondary"
                >
                    {item.name}
                    <ArrowUpRightIcon />
                </Link>
            ))}
        </div>
    )
}
