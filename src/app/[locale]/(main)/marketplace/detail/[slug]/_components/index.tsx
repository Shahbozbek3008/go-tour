import Gallery from "./gallery"
import Navigation from "./navigation"
import OfferCard from "./offer-card"
import PreviewActions from "./preview-actions"
import ProfileCard from "./profile-card"
import SimilarProducts from "./similar-products"
import TabsInfo from "./tabs-info"

export default function Index() {
    return (
        <div className="base-container lg:home-container pt-6 sm:pt-10 pb-20 sm:pb-30">
            <Navigation />

            <main className="grid mt-6 mb-14 lg:grid-cols-[minmax(0,65%)_minmax(0,35%)] lg:gap-x-5 gap-y-6 lg:items-start">
                <div className="contents lg:grid lg:gap-7 lg:col-start-1">
                    <div className="px-5 lg:px-0 min-w-0 order-1 lg:order-none">
                        <Gallery />
                    </div>
                    <div className="min-w-0 order-4 lg:order-none px-4 lg:px-0">
                        <TabsInfo />
                    </div>
                </div>

                <div className="contents lg:grid lg:gap-4 lg:col-start-2">
                    <div className="min-w-0 order-2 lg:order-none lg:transform-gpu">
                        <OfferCard />
                    </div>
                    <div className="max-w-[31.25rem] order-3 lg:order-none px-4 lg:px-0">
                        <ProfileCard />
                    </div>
                </div>
            </main>

            <PreviewActions />

            <SimilarProducts />
        </div>
    )
}
