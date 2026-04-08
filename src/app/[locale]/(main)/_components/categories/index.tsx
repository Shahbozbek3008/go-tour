"use client"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { useLanguage } from "@/hooks/use-language"
import useSearch from "@/hooks/use-search"
import { getArray } from "@/lib/utils/get-array"
import Autoplay from "embla-carousel-autoplay"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import { useProductCategoriesQuery } from "../../marketplace/_hooks/use-product-categories-query"
import { useServiceCategoriesQuery } from "../../marketplace/_hooks/use-service-categories-query"
import CategoryCard from "./category-card"

export default function Categories() {
    const params = useSearch()
    const { isArabic } = useLanguage()
    const [_api, setApi] = useState<CarouselApi>()
    const [productPageSize, setProductPageSize] = useState(10)
    const [servicePageSize, setServicePageSize] = useState(10)

    const { data } = useProductCategoriesQuery({
        params: {
            ...params,
            page_size: productPageSize,
        },
    })
    const listProductCategories = getArray(data?.results)

    const { data: ServiceCategories } = useServiceCategoriesQuery({
        params: {
            ...params,
            page_size: servicePageSize,
        },
    })
    const listServiceCategories = getArray(ServiceCategories?.results)

    return (
        <section
            className="clamp-[py,10,16]"
            style={{
                background:
                    "linear-gradient(115.34deg, #000 22.01%, #3C1F8B 79.49%)",
            }}
        >
            <main>
                <h2 className="max-w-7xl clamp-[px,5,10] mx-auto font-medium clamp-[text,3xl,6xl] clamp-[mb,8,11]">
                    <ClientTranslate translationKey="homeCategories" />
                </h2>

                {/* Product Categories */}
                <div className="mb-10">
                    <hgroup className="max-w-7xl clamp-[px,5,10] mx-auto flex items-center justify-between mb-5">
                        <h4 className="font-medium clamp-[text,sm,2xl] text-muted-foreground">
                            <ClientTranslate translationKey="productCategories" />
                        </h4>
                        <Button
                            variant="link"
                            className="text-background !px-0"
                            onClick={() => setProductPageSize(100)}
                        >
                            <ClientTranslate translationKey="exploreAll" />
                            {isArabic ?
                                <ChevronRight className="rotate-180" />
                            :   <ChevronRight />}
                        </Button>
                    </hgroup>

                    <article className="max-w-7xl clamp-[px,5,10] mx-auto hidden md:grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-4">
                        {listProductCategories.map((item) => {
                            return <CategoryCard key={item.id} data={item} />
                        })}
                    </article>

                    <Carousel
                        dir="ltr"
                        opts={{
                            loop: true,
                            align: "start",
                        }}
                        setApi={setApi}
                        plugins={[
                            Autoplay({
                                delay: 5000,
                            }),
                        ]}
                        className="md:hidden clamp-[ml,5,10]"
                    >
                        <CarouselContent>
                            {listProductCategories.map((item) => {
                                return (
                                    <CarouselItem
                                        key={item.id}
                                        className="min-[600px]:flex-[0_0_32%] min-[400px]:flex-[0_0_42%] flex-[0_0_46%]"
                                    >
                                        <CategoryCard data={item} />
                                    </CarouselItem>
                                )
                            })}
                        </CarouselContent>
                    </Carousel>
                </div>

                {/* Service Categories */}
                <div>
                    <hgroup className="max-w-7xl clamp-[px,5,10] mx-auto flex justify-between items-center mb-5">
                        <h4 className="font-medium clamp-[text,sm,2xl] text-muted-foreground">
                            <ClientTranslate translationKey="serviceCategories" />
                        </h4>
                        <Button
                            variant="link"
                            className="text-background !px-0"
                            onClick={() => setServicePageSize(100)}
                        >
                            <ClientTranslate translationKey="exploreAll" />
                            {isArabic ?
                                <ChevronRight className="rotate-180" />
                            :   <ChevronRight />}
                        </Button>
                    </hgroup>

                    <article className="max-w-7xl clamp-[px,5,10] mx-auto hidden md:grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-4">
                        {listServiceCategories.map((item) => {
                            return <CategoryCard key={item.id} data={item} />
                        })}
                    </article>

                    <Carousel
                        dir="ltr"
                        opts={{
                            loop: true,
                            align: "start",
                        }}
                        setApi={setApi}
                        plugins={[
                            Autoplay({
                                delay: 5000,
                            }),
                        ]}
                        className="md:hidden clamp-[ml,5,10]"
                    >
                        <CarouselContent>
                            {listServiceCategories.map((item) => {
                                return (
                                    <CarouselItem
                                        key={item.id}
                                        className="min-[600px]:flex-[0_0_32%] min-[400px]:flex-[0_0_42%] flex-[0_0_46%]"
                                    >
                                        <CategoryCard data={item} />
                                    </CarouselItem>
                                )
                            })}
                        </CarouselContent>
                    </Carousel>
                </div>
            </main>
        </section>
    )
}
