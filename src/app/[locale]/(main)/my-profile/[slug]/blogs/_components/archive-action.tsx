"use client"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { API } from "@/lib/constants/api-endpoints"
import { Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { IBlog } from "../types"

interface Props {
    item: IBlog
}

export const ArchiveAction = ({ item }: Props) => {
    const t = useTranslations()
    const { invalidateByExactMatch } = useRevalidate()
    const { remove, patch } = useRequest()

    const handleDelete = () => {
        remove(
            API.PROFILE.BLOG.SLUG.replace("{slug}", item.slug),
            {},
            {
                onSuccess: () => {
                    toast.success(t("deleted"))
                    invalidateByExactMatch([
                        API.PROFILE.INFO.ME,
                        API.PROFILE.BLOG.ARCHIVE,
                        API.PROFILE.BLOG.INDEX,
                    ])
                },
            },
        )
    }
    const handleArchive = () => {
        patch(
            API.PROFILE.BLOG.ARCHIVE_SLUG.replace("{slug}", item.slug),
            {},
            {
                onSuccess: () => {
                    toast.success(t("archived"))
                    invalidateByExactMatch([
                        API.PROFILE.INFO.ME,
                        API.PROFILE.BLOG.ARCHIVE,
                        API.PROFILE.BLOG.INDEX,
                    ])
                },
            },
        )
    }

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="w-full flex gap-3 items-center pb-1 text-sm font-medium"
        >
            <Button
                onClick={handleArchive}
                className="py-1 max-w-[47.5%] w-full bg-[#28c76f]/8 hover:bg-[#28c76f]/8 text-[#28c76f]"
            >
                <ClientTranslate translationKey="active" />
            </Button>
            <Button
                onClick={handleDelete}
                className="py-1 max-w-[47.5%] w-full bg-[#ff4c51]/8 hover:bg-[#ff4c51]/8 text-[#ff4c51]"
            >
                <ClientTranslate translationKey="delete" />{" "}
                <Trash2 className="w-4.5 h-4.5 text-[#ff4c51]" />
            </Button>
        </div>
    )
}
