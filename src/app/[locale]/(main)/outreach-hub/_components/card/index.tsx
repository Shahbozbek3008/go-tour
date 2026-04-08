"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import Group from "@/components/semantic/group"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useModal } from "@/hooks/use-modal"
import { useRouter } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import parse from "html-react-parser"
import { useOutreachHubStore } from "../../_hooks/use-outreach-hub-item-store"
import { OutreachhubItem } from "../../_types"
import { ActiveAction } from "./active-action"
import { ArchiveAction } from "./archive-action"
import Body from "./body"
import BookmarkAction from "./bookmark-action"
import Header from "./header"

interface Props {
    item: OutreachhubItem
    className?: string
    fromActive?: boolean
    fromArchive?: boolean
    shared?: boolean
}

const OutreachhubCard = ({
    item,
    className,
    fromActive,
    fromArchive,
    shared,
}: Props) => {
    const router = useRouter()
    const { openModal } = useModal("outreach-hub-update-modal")
    const { setItem } = useOutreachHubStore()

    return (
        <Card
            onClick={() =>
                router.push(
                    getHref({
                        pathname: "/[locale]/outreach-hub/detail/[slug]",
                        query: { slug: item.slug },
                    }),
                )
            }
            className={cn(
                "group relative cursor-pointer rounded-3xl border border-card-border bg-background p-2 pb-4 transition hover:shadow-md flex flex-col gap-2.5 justify-between",
                className,
            )}
        >
            <Header item={item} shared={shared} />

            <Group className="flex flex-col justify-between flex-1 gap-2">
                <Group className="flex flex-col gap-2.5">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-semibold text-(--card-title) line-clamp-2">
                            {item.name}
                        </h3>
                        <div className="text-xs leading-4 text-(--card-info) line-clamp-3">
                            {parse(item.description)}
                        </div>
                    </div>
                </Group>

                <Group>
                    <Body item={item} />

                    {!fromActive && !fromArchive && (
                        <Group
                            className={cn(
                                "flex gap-3 justify-between items-center",
                            )}
                        >
                            <div className="w-full">
                                <Button
                                    className="text-sm w-full rounded-2xl"
                                    size={"lg"}
                                >
                                    <ClientTranslate translationKey="viewCauses" />
                                </Button>
                            </div>
                            <BookmarkAction item={item} />
                        </Group>
                    )}

                    <div onClick={(e) => e.stopPropagation()}>
                        {fromActive && <ActiveAction item={item} />}
                        {fromArchive && <ArchiveAction item={item} />}
                        {fromActive && (
                            <Button
                                onClick={() => {
                                    setItem(item)
                                    openModal()
                                }}
                                className="w-full mt-2 rounded-lg"
                            >
                                <ClientTranslate translationKey="update" />
                            </Button>
                        )}
                    </div>
                </Group>
            </Group>
        </Card>
    )
}

export default OutreachhubCard
