"use client"

import { cn } from "@/lib/utils/shadcn"
import parse from "html-react-parser"
import { useNewDetailQuery } from "../../_hooks/use-new-detail-query"
import ImageGallery from "../gallery"
import MainFooter from "./main-footer"

interface Props {
    className?: string
}

export default function Main({ className }: Props) {
    const { data } = useNewDetailQuery()

    return (
        <main className={cn("flex flex-col w-full", className)}>
            <ImageGallery />

            <article className="max-w-[95%] my-12">
                {parse(data?.description || "")}
            </article>

            <MainFooter />
        </main>
    )
}
