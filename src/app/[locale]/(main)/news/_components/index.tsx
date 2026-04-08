"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { useNewsGlobalQuery } from "../_hooks/use-news-global-query"
// import Categories from "./categories"
import Navigation from "./navigation"
import NewsCard from "./news-card"
import NewsCarousel from "./news-carousel"
import TweetsSection from "./tweets-section"

const Index = () => {
    const { newsGlobal } = useNewsGlobalQuery()

    return (
        <>
            <Navigation />
            {/* <Categories className="hidden md:block" /> */}
            <TweetsSection className="my-8" />
            <h3 className="text-2xl font-semibold text-center mb-8">
                <ClientTranslate translationKey="news" />
            </h3>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))] gap-3 mb-14 mt-4 md:mt-0">
                <NewsCarousel />
                {/* <Categories className="md:hidden" /> */}
                {newsGlobal.slice(3).map((item, i) => {
                    return <NewsCard key={i} item={item} />
                })}
            </div>
        </>
    )
}

export default Index
