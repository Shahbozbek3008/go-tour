"use client"

import { useSlugWithoutThrowError } from "@/app/_providers/slug-provider"
import { IconArrowLeft } from "@/assets/icons/arrow-left"
import { useAiPersist } from "@/components/common/ai-chat/_hooks/use-ai-persist"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { useRouter } from "@/i18n/navigation"
import { getArray } from "@/lib/utils/get-array"
import { getFileExtension } from "@/lib/utils/get-file-extension"
import { getHref } from "@/lib/utils/get-href"
import { useEffect, useMemo } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useProfileMarketplaceSlugQuery } from "../../../my-profile/[slug]/marketplace/active/_hooks/use-profile-marketplace-slug-query"
import { useMarketplacePersist } from "../_hooks/use-marketplace-persist"
import { MarketplaceProductForm } from "../_types"
import Actions from "./actions"
import AdditionalFields from "./additional-fields"
import Description from "./description"
import ReadOnlyFields from "./readonly-fields"
import SpecificFields from "./specific-fields"
import { Upload } from "./upload"
import VisibilitySettings from "./visibility-settings"

export default function MarketplacePostIndex() {
    const {
        chats: {
            marketplace_add: { fields: fieldsFromAi },
        },
    } = useAiPersist()
    const slug = useSlugWithoutThrowError()
    const { data: userData } = useProfileQuery()
    const { setMarketplacePersistState, formData: persistFormData } =
        useMarketplacePersist()
    const router = useRouter()
    const { data } = useProfileMarketplaceSlugQuery(slug || "", {
        options: {
            enabled: !!slug,
        },
    })
    const detailDocuments = useMemo(
        () =>
            getArray(data?.documents).map((d) => ({
                document_url: d.url,
                name: d.name,
                size: Number(d.size),
            })),
        [data?.documents],
    )
    const detailTags = useMemo(
        () => getArray(data?.tags).map((t) => t.name),
        [data?.tags],
    )

    const defaultValues = useMemo(
        () =>
            ({
                additional_fields: [],
                cash_component: "",
                category: null,
                collaboration_structure: "",
                commercial_terms: "",
                condition: null,
                credentials: "",
                deliverables: "",
                delivery_start_date: "",
                delivery_terms: "",
                delivery_type: "",
                description: "",
                documentation_needed: "",
                documents: [],
                engagement_type: null,
                exchange_product_condition: null,
                exchange_product_specification: "",
                exchange_structure: null,
                expected_response: "",
                experience: "",
                images: [],
                in_exchange_for: "",
                incoterm: "",
                languages: "",
                name: "",
                partner_contribution: "",
                partner_type: "",
                pricing_model: null,
                procurement_type: "",
                product_or_service_locations: "",
                product_or_service_target_locations: "",
                quantity: "",
                request_type: null,
                requirements: "",
                right_options: "",
                specification: "",
                submission_type: "",
                supply_requirement: null,
                support: "",
                tags: [],
                target_client: "",
                trade_validity: "",
                videos: [],
                visibility_type: "public",
                visibility_permission_users_ids: [],
                your_contribution: "",
                is_anonymous: false,
            }) as Partial<MarketplaceProductForm>,
        [],
    )

    const form = useForm<MarketplaceProductForm>({
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

    const { handleSubmit, watch } = form
    const requestType = watch("request_type")

    const onSubmit = handleSubmit((vals) => {
        setMarketplacePersistState({
            previewData: {
                ...vals,
                documents: vals.documents.map((d, i) => ({
                    extension: getFileExtension(d.name),
                    id: String(i),
                    name: d.name,
                    size: String(d.size),
                    url: d.document_url,
                })),
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
                        }
                    ),
                tags: vals.tags.map((t, i) => ({ name: t, id: i })),
            },
            formData: vals,
        })
        router.push(
            getHref({
                pathname: "/[locale]/marketplace/detail/[slug]",
                query: { slug: "preview" },
            }),
        )
    })

    return (
        <section className="clamp-[pt,4,15] clamp-[pb,17,25] flex justify-center">
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
                        className="flex flex-col gap-0 md:gap-4"
                    >
                        <ReadOnlyFields />
                        {requestType && (
                            <>
                                <Description />
                                <SpecificFields />
                                <AdditionalFields />
                                <Upload />
                                <VisibilitySettings />
                            </>
                        )}
                        <Actions />
                    </form>
                </FormProvider>
            </div>
        </section>
    )
}
