"use client"

import { useSlugWithoutThrowError } from "@/app/_providers/slug-provider"
import { IconArrowLeft2 } from "@/assets/icons/arrow-left2"
import { IconArrowRight2 } from "@/assets/icons/arrow-right2"
import ClientTranslate from "@/components/common/translation/client-translate"
import MultiImgUploadField from "@/components/form/multi-img-upload-field"
import MultiVideoUploadField from "@/components/form/multi-video-upload-field.tsx"
import UncontrolledInput from "@/components/form/uncontrolled-input"
import UncontrolledTextarea from "@/components/form/uncontrolled-textarea"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { getHref } from "@/lib/utils/get-href"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useProfileBlogPostsSlugQuery } from "../../../my-profile/[slug]/blogs/_hooks/use-profile-blog-posts-slug-query"

export default function NewsPostIndex() {
    const t = useTranslations()
    const router = useRouter()
    const slug = useSlugWithoutThrowError()
    const { data } = useProfileBlogPostsSlugQuery(slug || "", {
        options: {
            enabled: !!slug,
        },
    })
    const { post, patch, isPending } = useRequest()
    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            main_image_url: "",
            images: [],
            videos: [],
        },
        values:
            !!slug && data ?
                {
                    ...data,
                    images: data.images?.map((img) => img.image_url) ?? [],
                    videos: data.videos?.map((vid) => vid.video_url) ?? [],
                }
            :   undefined,
        disabled: isPending,
    })

    const { handleSubmit } = form
    const onSubmit = handleSubmit((vals) => {
        const added_images = vals?.images?.map((img) => ({ image_url: img }))
        const removed_images = data?.images?.map((img) => img.id)
        const main_image_url = vals?.images?.[0]
        const added_videos = vals?.videos?.map((url) => ({ video_url: url }))
        const removed_videos = data?.videos?.map((vid) => vid.id)

        if (slug) {
            patch(
                API.PROFILE.BLOG.SLUG.replace("{slug}", slug),
                {
                    ...vals,
                    added_images,
                    removed_images,
                    main_image_url,
                    added_videos,
                    removed_videos,
                },
                {
                    onSuccess: () => {
                        toast.success(t("updated"))
                        router.push(getHref({ pathname: "/[locale]/news" }))
                    },
                },
            )
        } else {
            post(
                API.PROFILE.BLOG.INDEX,
                {
                    ...vals,
                    added_images,
                    removed_images,
                    main_image_url,
                    added_videos,
                    removed_videos,
                },
                {
                    onSuccess: () => {
                        toast.success(t("created"))
                        router.push(getHref({ pathname: "/[locale]/news" }))
                    },
                },
            )
        }
    })
    return (
        <section className="clamp-[pb,17,25] flex flex-col gap-6">
            <h1 className="font-medium text-2xl text-text-900">
                <ClientTranslate translationKey="newsPost" />
            </h1>

            <form onSubmit={onSubmit} className="flex flex-col gap-14">
                <UncontrolledInput
                    methods={form}
                    name="name"
                    label={t("newsName")}
                    placeholder={t("newsName")}
                    className="max-w-[36.75rem] w-full"
                />

                <UncontrolledTextarea
                    methods={form}
                    name="description"
                    label={t("description")}
                    textareaProps={{
                        className: "max-w-[36.75rem] w-full h-[15.625rem]",
                    }}
                />

                <MultiImgUploadField
                    methods={form}
                    maxSize={15}
                    required
                    name="images"
                    labelClassName="max-w-[36.75rem] w-full flex flex-col"
                    alt="marketplace product image"
                />

                <MultiVideoUploadField
                    methods={form}
                    name="videos"
                    label={t("uploadVideo")}
                    labelClassName="max-w-[36.75rem] w-full flex flex-col text-lg font-medium text-foreground"
                />

                <div className="flex items-center gap-4">
                    <Button
                        variant={"secondary"}
                        size="lg"
                        className="w-full md:w-auto text-foreground h-12"
                    >
                        <IconArrowLeft2 />
                        <ClientTranslate translationKey="back" />
                    </Button>
                    <Button
                        type="submit"
                        size="lg"
                        onClick={onSubmit}
                        className="h-12 w-full md:w-auto"
                    >
                        {slug ? t("update") : t("create")}{" "}
                        <ClientTranslate translationKey="news" />{" "}
                        <IconArrowRight2 />
                    </Button>
                </div>
            </form>
        </section>
    )
}
