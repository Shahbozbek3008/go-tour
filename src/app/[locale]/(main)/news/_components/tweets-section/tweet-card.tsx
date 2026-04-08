"use client"

import { IconBookmark } from "@/assets/icons/bookmark"
import IconEye from "@/assets/icons/eye-icon"
import { IconVerifiedGradient } from "@/assets/icons/verified-gradient"
import ClientImg from "@/components/common/client-img"
import Group from "@/components/semantic/group"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useNoneAuthorized } from "@/hooks/use-none-authorized"
import { useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { formatRelativeDate } from "@/lib/utils/format-relative-date"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import parse from "html-react-parser"
import { useState } from "react"
import { NewsItem } from "../../_types"
import { LikesButtons } from "./likes"

interface Props {
    item: NewsItem
    className?: string
}
export default function TweetCard({ item, className }: Props) {
    const [isBookMarked, setIsBookmarked] = useState<boolean>(
        item.is_bookmarked,
    )
    const { redirectToSignIn } = useNoneAuthorized()

    const router = useRouter()
    const { invalidateByPatternMatch } = useRevalidate()
    const { post, isPending } = useRequest()

    const toggleBookmark = () => {
        redirectToSignIn(() => {
            post(
                API.BLOG.BOOKMARK_SLUG.replace("{slug}", item.slug),
                {},
                {
                    onSuccess: () => {
                        invalidateByPatternMatch([API.BLOG.LIST])
                        setIsBookmarked((prev) => !prev)
                    },
                },
            )
        })
    }

    return (
        <Card
            onClick={() =>
                router.push(
                    getHref({
                        pathname: "/[locale]/news/detail/[slug]",
                        query: { slug: item.slug },
                    }),
                )
            }
            className={cn(
                "group relative cursor-pointer rounded-3xl border border-card-border bg-background p-2 pb-4 transition hover:shadow-md flex flex-col gap-2.5 justify-between",
                className,
            )}
        >
            <div className="relative">
                <ClientImg
                    fill
                    priority
                    src={item.main_image_url}
                    alt={item.name || "tweet image"}
                    wrapperClassName="aspect-video mb-2.5"
                    className="rounded-2xl"
                />
            </div>
            <div className="flex flex-col flex-1">
                <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-xl font-semibold text-(--card-title) line-clamp-2">
                        {item.name}
                    </h3>
                    <div className="text-xs leading-4 text-(--card-info) line-clamp-3">
                        {parse(item.description)}
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 shrink">
                    <Group className="flex items-center justify-between">
                        <main className="flex items-center gap-4">
                            <div className="relative">
                                <ClientImg
                                    src={item?.user?.profile_image}
                                    alt={item?.name || "image news"}
                                    wrapperClassName="w-14 h-14 rounded-full"
                                    className="rounded-full"
                                />
                                <IconVerifiedGradient className="absolute top-0 -right-2" />
                            </div>
                            <div>
                                <h3 className="font-semibold">
                                    {item.user.first_name}
                                </h3>
                                <p className="text-xs text-text-500">
                                    {item.user.job_title}
                                </p>
                            </div>
                        </main>
                        <Button
                            variant={"secondary"}
                            size={"icon"}
                            className="text-text-900 w-10 h-10 rounded-lg"
                            isLoading={isPending}
                            onClick={(e) => {
                                e.stopPropagation()
                                toggleBookmark()
                            }}
                        >
                            {!isPending && (
                                <IconBookmark
                                    width={24}
                                    hanging={24}
                                    className={cn(
                                        isBookMarked &&
                                            "fill-primary text-primary",
                                    )}
                                />
                            )}
                        </Button>
                    </Group>
                    <article className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <p className="flex items-center gap-1 mr-2 text-sm">
                                <IconEye className="[&_circle]:stroke-foreground [&_path]:stroke-foreground [&_circle]:fill-foreground" />
                                {item.views_count}
                            </p>
                            <LikesButtons item={item} />
                        </div>

                        <p className="text-sm text-text700">
                            {formatRelativeDate(item.created_at)}
                        </p>
                    </article>
                </div>
            </div>
        </Card>
    )
}
