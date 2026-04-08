"use client"

import Group from "@/components/semantic/group"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useRouter } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { InvestmentItem } from "../../../_types"
import { ActiveAction } from "./active-action"
import { ArchiveAction } from "./archive-action"
import BookmarkAction from "./bookmark-action"
import ChatAction from "./chat-action"
import Main from "./main"
import PriceInfo from "./price-info"

interface Props {
    item: InvestmentItem
    className?: string
    fromActive?: boolean
    fromArchive?: boolean
}

export default function InvestmentCard({
    item,
    className = "",
    fromActive,
    fromArchive,
}: Props) {
    const router = useRouter()

    return (
        <Card
            onClick={() =>
                router.push(
                    getHref({
                        pathname: "/[locale]/investment/detail/[slug]",
                        query: { slug: item.slug },
                    }),
                )
            }
            className={cn(
                "relative flex flex-col justify-between cursor-pointer rounded-3xl border border-card-border p-2 pb-4 gap-2",
                className,
            )}
        >
            <Main item={item} />

            <Group>
                <div className="mt-1 flex flex-wrap gap-1.5 overflow-hidden max-h-13">
                    {item.tags?.map((t) => (
                        <Badge
                            key={t.id}
                            variant="secondary"
                            className="text-tiny text-text-500 bg-[#F8F7FA]"
                        >
                            # {t.tag}
                        </Badge>
                    ))}
                </div>

                <PriceInfo className="my-2" item={item} />

                {!fromActive && !fromArchive && (
                    <Group
                        className={cn("flex gap-2.5")}
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        <ChatAction item={item} />
                        <BookmarkAction item={item} />
                    </Group>
                )}

                <div onClick={(e) => e.stopPropagation()}>
                    {fromActive && <ActiveAction item={item} />}
                    {fromArchive && <ArchiveAction item={item} />}
                </div>
            </Group>
        </Card>
    )
}
