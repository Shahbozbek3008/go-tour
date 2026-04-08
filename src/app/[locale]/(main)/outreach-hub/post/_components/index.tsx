"use client"

import { useSlugWithoutThrowError } from "@/app/_providers/slug-provider"
import { IconArrowLeft } from "@/assets/icons/arrow-left"
import { useAiPersist } from "@/components/common/ai-chat/_hooks/use-ai-persist"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { useRouter } from "@/i18n/navigation"
import { getArray } from "@/lib/utils/get-array"
import { getHref } from "@/lib/utils/get-href"
import { useEffect, useMemo } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useProfileOutreachHubSlugQuery } from "../../../my-profile/[slug]/outreach-hub/_hooks/use-profile-outreach-hub-slug-query"
import { useOutreachHubPersist } from "../_hooks/use-outreach-hub-persist"
import { OutreachHubItemForm } from "../_types"
import Actions from "./actions"
import Main from "./main"
import Uploads from "./uploads"
import VisibilitySettings from "./visibility-settings"

export default function OutreachHubPostIndex() {
    const {
        chats: {
            outreach_hub_add: { fields: fieldsFromAi },
        },
    } = useAiPersist()
    const slug = useSlugWithoutThrowError()
    const { data: userData } = useProfileQuery()
    const { setOutreachHubPersistState, formData: persistFormData } =
        useOutreachHubPersist()
    const router = useRouter()
    const { data } = useProfileOutreachHubSlugQuery(slug || "", {
        options: {
            enabled: !!slug,
        },
    })

    const detailDocuments = useMemo(
        () =>
            getArray(data?.documents).map((d) => ({
                document_url: d.document_url,
                name: d.name,
                size: Number(d.size),
            })),
        [data?.documents],
    )
    const detailTags = useMemo(
        () => getArray(data?.tags).map((t) => t.name),
        [data?.tags],
    )

    const defaultValues = useMemo<Partial<OutreachHubItemForm>>(() => {
        return {
            cause: "",
            currency: null,
            deadline_date: "",
            description: "",
            documents: [],
            images: [],
            is_anonymous: false,
            location: "",
            name: "",
            plan_price_amount: "",
            request_type: null,
            type_of_support: "",
            videos: [],
            visibility_permission_users_ids: [],
            visibility_type: "public",
            tags: [],
        }
    }, [])

    const form = useForm<OutreachHubItemForm>({
        defaultValues,
    })

    useEffect(() => {
        if (slug && data) {
            form.reset({
                ...defaultValues,
                ...data,
                documents: detailDocuments,
                tags: detailTags,
                offered_tags: [],
                ...persistFormData,
            })
        } else {
            form.reset({
                ...defaultValues,
                ...fieldsFromAi,
                ...persistFormData,
            })
        }
    }, [
        slug,
        data,
        detailDocuments,
        detailTags,
        form,
        defaultValues,
        persistFormData,
        fieldsFromAi,
    ])

    const { handleSubmit } = form

    const onSubmit = handleSubmit((vals) => {
        setOutreachHubPersistState({
            previewData: {
                ...vals,
                user:
                    vals.is_anonymous ? null : (
                        {
                            first_name: userData?.first_name || "",
                            id: userData?.id || "",
                            job_title: userData?.job_title || "",
                            last_name: userData?.job_title || "",
                            profile_image: userData?.profile_image || "",
                            user_id: userData?.user_id || "",
                            email: userData?.email || "",
                            phone_number: userData?.phone_number || "",
                            connections_count: userData?.connections_count || 0,
                        }
                    ),
                tags: vals.tags.map((t) => ({ name: t, id: t })),
                documents: vals.documents.map((d, i) => ({
                    document_url: d.document_url,
                    name: d.name,
                    id: String(i),
                    size: String(d.size),
                })),
            },
            formData: vals,
        })
        router.push(
            getHref({
                pathname: "/[locale]/outreach-hub/detail/[slug]",
                query: { slug: "preview" },
            }),
        )
    })

    return (
        <section className="clamp-[pt,4,15] clamp-[pb,17,25] flex justify-center w-full">
            <div className="px-4 flex flex-col max-w-[62.5rem] w-full">
                <h5 className="relative flex items-center justify-center md:block text-lg sm:text-xl font-semibold text-center text-gradient mb-5">
                    <Button
                        variant={"ghost"}
                        icon={<IconArrowLeft />}
                        onClick={() => router.back()}
                        className="md:hidden absolute left-0"
                    />
                    <ClientTranslate translationKey="checkInfo" />
                </h5>
                <FormProvider {...form}>
                    <form
                        onSubmit={onSubmit}
                        className="flex flex-col gap-0 md:gap-10"
                    >
                        <Main data={data} />
                        <Uploads />
                        <VisibilitySettings />
                        <Actions />
                    </form>
                </FormProvider>
            </div>
        </section>
    )
}
