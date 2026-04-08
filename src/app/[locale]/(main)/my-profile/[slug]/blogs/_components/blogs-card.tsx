"use client"
import { IconEyeOpen } from "@/assets/icons/eye-open"
import ClientImg from "@/components/common/client-img"
import ClientTranslate from "@/components/common/translation/client-translate"
import Group from "@/components/semantic/group"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "@/i18n/navigation"
import { formatRelativeDate } from "@/lib/utils/format-relative-date"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { IBlog } from "../types"
import { ActiveAction } from "./active-action"
import { ArchiveAction } from "./archive-action"
import BookmarkAction from "./bookmark-action"
import LikeActions from "./like-actions"

interface Props {
    item: IBlog
    className?: string
    fromActive?: boolean
    fromArchive?: boolean
}

export const BlogsCard = ({
    item,
    className,
    fromActive,
    fromArchive,
}: Props) => {
    const router = useRouter()

    return (
        <Card
            onClick={() => {
                router.push(
                    getHref({
                        pathname: "/[locale]/news/detail/[slug]",
                        query: { slug: item.slug },
                    }),
                )
            }}
            className={cn(
                "relative flex flex-col gap-4 justify-between cursor-pointer rounded-[1rem] py-0 shadow-none border border-card-border p-3",
                className,
            )}
        >
            <hgroup>
                <ClientImg
                    src={item.main_image_url}
                    alt={item.name}
                    wrapperClassName="aspect-video h-auto mb-2"
                    className="rounded-[1rem]"
                />

                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-xl text-text-900 line-clamp-2">
                        {item.name}
                    </h3>
                    <p className="line-clamp-3 text-xs font-medium text-[#767474]">
                        {item.description}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2.5">
                        <span className="flex items-center gap-1 font-bold text-xs text-text-900">
                            <IconEyeOpen />
                            {item.views_count}
                        </span>
                        <LikeActions item={item} />
                    </div>
                    <p className="font-bold text-xs text-text-700">
                        {formatRelativeDate(item.created_at)}
                    </p>
                </div>
            </hgroup>
            <Group
                className={cn(
                    "flex items-center justify-between gap-2.5 pr-2.5",
                    (fromActive || fromArchive) && "hidden",
                )}
            >
                <Button className="w-5/6 text-sm rounded-2xl" size={"lg"}>
                    <ClientTranslate translationKey="viewCauses" />
                </Button>
                <BookmarkAction item={item} />
            </Group>
            {fromActive && <ActiveAction item={item} />}
            {fromArchive && <ArchiveAction item={item} />}
        </Card>
    )
}
