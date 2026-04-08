"use client"
import IconArrowUpRightSquare from "@/assets/icons/arrow-up-right-square-icon"
import ClientImg from "@/components/common/client-img"
import { CardTitle } from "@/components/ui/card"
import { MarketplaceCategory } from "../../marketplace/_types"

export default function CategoryCard({ data }: { data: MarketplaceCategory }) {
    return (
        <div className="relative grid place-items-center transition-all hover:[&_.front-side]:opacity-0 hover:[&_.back-side]:block hover:[&_.blurred-shape]:opacity-0">
            <main className="w-full relative z-10 h-60 md:h-80 transition-all bg-background/10 hover:bg-background/20 rounded-xl">
                <div className="front-side flex flex-col items-center justify-center clamp-[gap,3,9] h-full p-4 transition-all">
                    <ClientImg
                        src={data?.icon_url}
                        alt={data?.name}
                        fallbackUrl="https://api-inextlynk.upgrow.uz/media/files_and_images/plane.svg"
                        width={104}
                        height={104}
                        wrapperClassName="max-w-26 max-h-26"
                        className="mx-auto bg-transparent object-contain"
                    />
                    <CardTitle className="flex items-center justify-center text-center clamp-[text,sm,xl] min-h-16">
                        <span className="line-clamp-3">{data?.name}</span>
                    </CardTitle>
                </div>

                <div className="back-side h-full w-full hidden motion-translate-x-in-[0%] motion-translate-y-in-[5%] motion-duration-1000 absolute top-0 left-0 transition-all p-5 pt-3">
                    <CardTitle className="clamp-[text,sm,xl] mb-5">
                        {data?.name}
                    </CardTitle>
                    <article className="flex flex-col gap-3 overflow-y-auto scrollbar-2 max-h-52 pr-2">
                        {data?.information_data.map((item, i) => {
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-4 h-4">
                                        <IconArrowUpRightSquare
                                            id={`arrow-gradient-${i}`}
                                        />
                                    </div>

                                    <p className="text-xs">
                                        {item.information}
                                    </p>
                                </div>
                            )
                        })}
                    </article>
                </div>
            </main>

            <article className="blurred-shape absolute max-md:top-[20%] w-24 h-24 md:w-36 md:h-36 blur-[2rem] gradient-2 rounded-full transition-all" />
        </div>
    )
}
