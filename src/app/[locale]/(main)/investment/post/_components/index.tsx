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
import { useProfileInvestmentSlugQuery } from "../../../my-profile/[slug]/investment/_hooks/use-profile-investment-slug-query"
import { useInvestmentPersist } from "../_hooks/use-investment-persist"
import { InvestmentItemForm } from "../_types"
import Actions from "./actions"
import Main from "./main"
import { Uploads } from "./uploads"
import VisibilitySettings from "./visibility-settings"

export default function InvestmentFormIndex() {
    const {
        chats: {
            investment_add: { fields: fieldsFromAi },
        },
    } = useAiPersist()
    const slug = useSlugWithoutThrowError()
    const { data: userData } = useProfileQuery()
    const { setInvestmentPersistState, formData: persistFormData } =
        useInvestmentPersist()
    const router = useRouter()
    const { data } = useProfileInvestmentSlugQuery(slug || "", {
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
        () => getArray(data?.tags).map((t) => t.tag),
        [data?.tags],
    )

    const defaultValues = useMemo<Partial<InvestmentItemForm>>(
        () => ({
            business_nature: null,
            business_stage: null,
            currency: null,
            deal_type: null,
            description: "",
            documents: [],
            end_price: "",
            existing_investors: "",
            geographic_focus: "",
            governance: null,
            ideal_partner: "",
            images: [],
            investment_structure: null,
            investor_type: null,
            is_anonymous: false,
            name: "",
            non_financial_preferences: "",
            offering: "",
            permits: "",
            reason_for_sale: "",
            request_type: null,
            sale_structure: null,
            seller_profile: "",
            start_price: "",
            strategic_objectives: null,
            tags: [],
            target_industry: null,
            target_sector: "",
            transaction_structure: "",
            use_of_found_funds: null,
            videos: [],
            visibility_type: "public",
            visible_connections: [],
        }),
        [],
    )

    const form = useForm<InvestmentItemForm>({
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
        setInvestmentPersistState({
            previewData: {
                ...vals,
                documents: vals.documents.map((d, i) => ({
                    document_url: d.document_url,
                    name: d.name,
                    id: String(i),
                    only_invites_allow: d.only_invites_allow || false,
                    size: String(d.size),
                })),
                tags: vals.tags.map((t, i) => ({ tag: t, id: String(i) })),
                profile:
                    vals.is_anonymous ? null : (
                        {
                            first_name: userData?.first_name || "",
                            id: userData?.id || "",
                            job_title: userData?.job_title || "",
                            last_name: userData?.job_title || "",
                            profile_image: userData?.profile_image || "",
                            user_id: userData?.user_id || "",
                            created_at: "",
                            email: userData?.email || "",
                            phone_number: userData?.phone_number || "",
                        }
                    ),
            },
            formData: vals,
        })
        router.push(
            getHref({
                pathname: "/[locale]/investment/detail/[slug]",
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
                        className="flex flex-col gap-10 w-full"
                    >
                        <Main />
                        <Uploads />
                        <VisibilitySettings />
                        <Actions />
                    </form>
                </FormProvider>
            </div>
        </section>
    )
}
