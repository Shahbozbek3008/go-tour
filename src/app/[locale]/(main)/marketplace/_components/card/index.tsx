"use client"

import Group from "@/components/semantic/group"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { MarketplaceProduct } from "../../_types"
import { ActiveAction } from "./active-action"
import { ArchiveAction } from "./archive-action"
import BookmarkAction from "./bookmark-action"
import ChatAction from "./chat-action"
import Main from "./main"
import PriceLabel from "./price-label"
import Profile from "./profile"

interface Props {
    item: MarketplaceProduct
    className?: string
    fromActive?: boolean
    fromArchive?: boolean
}

const MarketplaceCard = ({
    item,
    className,
    fromActive,
    fromArchive,
}: Props) => {
    const router = useRouter()

    return (
        <Card
            onClick={() =>
                router.push(
                    getHref({
                        pathname: "/[locale]/marketplace/detail/[slug]",
                        query: { slug: item.slug },
                    }),
                )
            }
            className={cn(
                "min-h-[26.25rem] group relative cursor-pointer rounded-3xl border border-card-border bg-background p-2 pb-4 transition hover:shadow-md flex flex-col gap-2.5 justify-between",
                className,
            )}
        >
            <Main item={item} />

            <Group>
                <PriceLabel item={item} />

                <div className="mt-1 flex flex-wrap gap-1.5 overflow-hidden max-h-13">
                    {item.tags?.map((t) => (
                        <Badge
                            key={t.id}
                            variant="secondary"
                            className="text-tiny text-text-500 bg-[#F8F7FA]"
                        >
                            # {t.name}
                        </Badge>
                    ))}
                </div>

                <Separator className="my-2 bg-[#E8E8E8] h-[0.5px]" />

                <Profile item={item} />
                {!fromActive && !fromArchive && (
                    <div
                        className={cn(
                            "flex gap-3 justify-between items-center",
                        )}
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        <ChatAction item={item} />
                        <BookmarkAction item={item} />
                    </div>
                )}

                <div onClick={(e) => e.stopPropagation()}>
                    {fromActive && <ActiveAction item={item} />}
                    {fromArchive && <ArchiveAction item={item} />}
                </div>
            </Group>
        </Card>
    )
}

export default MarketplaceCard
