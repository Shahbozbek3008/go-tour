"use client"

import { useTourDetailQuery } from "../_hooks"
import { useTourFilesQuery } from "../_hooks/use-tour-files-query"
import { TourGallery } from "./gallery"
import { TourHeader } from "./header"
import TourDetailLayout from "./other-detail"
import { TourMeta } from "./other-detail/meta"

export default function Index() {
    const { detail } = useTourDetailQuery()
    const { images } = useTourFilesQuery()

    return (
        <div className="home-container pt-4 md:pt-16 pb-16">
            <article className="w-full bg-white rounded-3xl sm:p-6 lg:p-8 border border-border/60 flex flex-col">
                <div className="order-2 lg:order-1 px-4 sm:px-0 mt-2 lg:mt-0">
                    <TourHeader title={detail?.nameUz!} />
                    <TourMeta
                        rating={detail?.avgRating!}
                        reviewCount={detail?.agent?.reviewsCount!}
                        country={detail?.destination?.nameUz!}
                        type={detail?.categories?.[0]!}
                        discount={detail?.discountPercent!}
                    />
                </div>
                <div className="order-1 lg:order-2 w-full lg:mt-4">
                    <TourGallery images={images} />
                </div>
            </article>
            <TourDetailLayout />
        </div>
    )
}
