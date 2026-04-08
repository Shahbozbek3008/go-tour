import ClientTranslate from "@/components/common/translation/client-translate"
import TweetCard from "../../../_components/tweets-section/tweet-card"
import { useBlogListQuery } from "../../../_hooks/use-blog-list-query"

export default function LatestNews() {
    const { newsList } = useBlogListQuery()

    return (
        <div>
            <h4 className="text-xl font-semibold mb-6">
                <ClientTranslate translationKey="latestNews" />
            </h4>
            <main className="grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))] gap-3 mb-14">
                {newsList.slice(0, 4).map((item, i) => {
                    return <TweetCard key={i} item={item} />
                })}
            </main>
        </div>
    )
}
