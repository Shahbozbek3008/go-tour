"use client"

import notFound from "@/assets/images/search-not-found.png"
import Image from "next/image"

export default function SearchNotFound() {
    return (
        <div className="flex flex-col items-center justify-center gap-y-5 py-10 px-4">
            <Image
                src={notFound}
                width={181}
                height={150}
                className="max-w-[11.313rem] w-full h-auto"
                alt="not-found"
            />
            <p className="text-background font-bold text-[1.75rem]">
                Result Not Found
            </p>
            <p className="text-[#9e9e9e] font-medium clamp-[text,base,lg] text-center">
                Please try again with another keywords or maybe use generic term
            </p>
        </div>
    )
}
