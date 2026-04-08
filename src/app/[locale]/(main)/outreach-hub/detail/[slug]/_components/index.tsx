"use client"

import Group from "@/components/semantic/group"
import { useOutreachhubItemQuery } from "../_hooks/use-outreachhub-item-query"
import ProductContent from "./content"
import DonutCard from "./donut-card"
import ImageGallery from "./gallery"
import Navigation from "./navigation"
import PreviewActions from "./preview-actions"
import SimilarProducts from "./similar-products"

const Index = () => {
    const { data, isPreview } = useOutreachhubItemQuery()

    return (
        <>
            <Navigation />
            <div className="flex flex-col gap-6 clamp-[pt,0,5]">
                <Group className="home-container w-full mb-10">
                    <h2 className="hidden md:block font-semibold text-3xl mb-6">
                        {data?.name}
                    </h2>
                    <div className="flex flex-col lg:flex-row gap-5">
                        <Group className="flex flex-col clamp-[gap,4,7] w-full lg:w-[70%]">
                            <ImageGallery className="order-1" />
                            <h2 className="md:hidden font-semibold text-2xl order-2">
                                {data?.name}
                            </h2>
                            <ProductContent className="order-4" />
                            <div className="order-3 flex lg:hidden">
                                <DonutCard />
                            </div>
                        </Group>
                        <Group className="hidden lg:flex flex-col gap-4 w-full lg:w-[30%]">
                            <DonutCard />
                        </Group>
                    </div>
                </Group>

                {!isPreview && <SimilarProducts />}
                {isPreview && <PreviewActions />}
            </div>
        </>
    )
}

export default Index
