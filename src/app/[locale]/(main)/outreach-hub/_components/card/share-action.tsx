"use client"

import { IconShare } from "@/assets/icons/share"
import { Button } from "@/components/ui/button"
import { useOutreachhubItemQuery } from "../../detail/[slug]/_hooks/use-outreachhub-item-query"

export default function ShareAction() {
    const { data, isPreview } = useOutreachhubItemQuery()
    return (
        <Button
            variant={"ghost"}
            className="rounded-full w-10 h-10"
            icon={
                <IconShare width={16} height={16} className="text-[#2f2b3d]" />
            }
            onClick={() => {
                if (isPreview) return
                navigator.share({
                    url: location.href,
                    title: "INexLynk",
                    text: data?.slug,
                })
            }}
        />
    )
}
