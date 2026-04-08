"use client"

import Group from "@/components/semantic/group"
import { useInvestmentItemQuery } from "../_hooks/use-investment-item-query"
import Main from "./main"
import Navigation from "./navigation"
import PreviewActions from "./preview-actions"
import ProfileCard from "./profile-card"
import SimilarProducts from "./similar-products"

export default function Index() {
    const { isPreview } = useInvestmentItemQuery()
    return (
        <div className="home-container px-4 sm:px-6 md:px-8 pt-6 sm:pt-10 pb-20 sm:pb-30">
            <Navigation />
            <Group className="flex flex-col lg:flex-row gap-5 my-6">
                <div className="md:flex flex-col gap-7 w-full lg:w-[65%]">
                    <Main />
                </div>

                <div className="flex flex-col gap-4 w-full lg:w-[35%]">
                    <ProfileCard />
                </div>
            </Group>
            {!isPreview && <SimilarProducts />}
            {isPreview && <PreviewActions />}
        </div>
    )
}
