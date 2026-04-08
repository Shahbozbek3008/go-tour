import ClientTranslate from "@/components/common/translation/client-translate"
import { cn } from "@/lib/utils/shadcn"
import TweetCard from "../../../_components/tweets-section/tweet-card"
import { useBlogListQuery } from "../../../_hooks/use-blog-list-query"

interface Props {
    className?: string
    id?: string
}

export default function MoreNews({ className, id }: Props) {
    const { newsList } = useBlogListQuery()

    const moreNews = newsList.filter((item) => item.slug !== id)

    return (
        <div className={cn("flex flex-col w-full", className)}>
            <p className="text-xl font-semibold mb-6">
                <ClientTranslate translationKey="moreForYou" />
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))] gap-6">
                {moreNews.slice(0, 3).map((item, i) => {
                    return <TweetCard key={i} item={item} />
                })}
            </div>
        </div>
    )
}
