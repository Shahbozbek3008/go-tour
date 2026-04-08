"use client"

import Breadcrumb from "@/components/common/breadcrumb"
import DOMPurify from "dompurify"
import parse from "html-react-parser"
import { useAdditionalPageQuery } from "../_hooks/use-additional-page"

export default function Index() {
    const { data } = useAdditionalPageQuery()

    const clean = DOMPurify.sanitize(data?.data || "", {
        USE_PROFILES: { html: true },
    })

    return (
        <div className="home-container clamp-[mt,4,10] clamp-[mb,10,15]">
            <Breadcrumb
                className="hidden md:flex"
                crumbs={[{ label: data?.page_type_display }]}
            />

            <h4 className="text-center text-2xl font-medium mt-8 text-gradient">
                {data?.page_type_display}
            </h4>
            <div
                className="
                    mt-8
                    prose max-w-none
                    prose-headings:bg-clip-text
                    prose-headings:text-transparent
                    prose-headings:bg-gradient-to-bl
                    prose-headings:from-gradient
                    prose-headings:to-gradient-2
                    prose-headings:clamp-[text,base,xl]
                    prose-headings:font-medium
                "
            >
                {parse(clean)}
            </div>
            {data?.page_type === "about_us" && (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={"w-full h-full object-contain clamp-[mt,4,8]"}
                >
                    <source src="/videos/about-us.mp4" type="video/mp4" />
                </video>
            )}
        </div>
    )
}
