"use client"

import emptyList from "@/assets/images/empty-list.png"
import Image from "next/image"

export default function EmptyList() {
    return (
        <div className="w-full h-auto mt-20 flex flex-col items-center justify-center gap-5">
            <Image
                src={emptyList}
                alt="empty list"
                width={300}
                height={224}
                className="max-w-[18.75rem] w-full h-auto"
            />
            <div className="space-y-2 text-center">
                <p className="text-primary font-semibold text-2xl">
                    Information not founded
                </p>
                <p className="text-[#a2a2a2]">
                    Sorry, we couldn’t find the information you’re looking for
                </p>
            </div>
        </div>
    )
}
