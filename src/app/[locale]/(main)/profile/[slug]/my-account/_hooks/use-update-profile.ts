import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { API } from "@/lib/constants/api-endpoints"
import { FILE_UPLOAD_URL } from "@/lib/constants/base-url"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { FormValues, schema } from "../schemas"

export const useUpdateProfile = () => {
    const t = useTranslations()
    const { data: profile } = useProfileQuery()
    const { post, postAsync, isPending } = useRequest()
    const { invalidateByExactMatch } = useRevalidate()
    const methods = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            fullName: profile?.data?.userProfile?.fullName || "",
            email: profile?.data?.userProfile?.email || "",
            birthDate: profile?.data?.userProfile?.birthDate || "",
            gender: profile?.data?.userProfile?.gender || "",
            phone: profile?.data?.userProfile?.phoneNumber || "",
            avatar: "",
        },
        disabled: isPending,
    })

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const { avatar, gender, ...rest } = data
        let imageUrl = profile?.data?.userProfile?.imageUrl || ""

        if (avatar instanceof File) {
            const formData = new FormData()
            formData.append("image", avatar)

            try {
                const uploadRes = await postAsync(
                    `${FILE_UPLOAD_URL}${API.FILE.SAVE_IMAGE}`,
                    formData,
                )

                imageUrl = uploadRes?.data?.imageId?.[0] || ""
            } catch (error) {
                return
            }
        } else if (typeof avatar === "string") {
            imageUrl = avatar
        }

        const payload = {
            ...rest,
            imageUrl: imageUrl?.startsWith("https") ? null : imageUrl,
            notification: null,
            gender: gender ?? null,
        }

        post(API.PROFILE.UPDATE, payload, {
            onSuccess: (res) => {
                if (res?.status === 0) {
                    invalidateByExactMatch([API.PROFILE.INFO.ME])
                    toast.success(t("profileUpdatedSuccessfully"))
                } else {
                    toast.error(res?.message)
                }
            },
        })
    }

    useEffect(() => {
        if (profile?.data) {
            methods.reset({
                fullName: profile.data?.userProfile?.fullName || "",
                email: profile.data?.userProfile?.email || "",
                phone: profile.data?.userProfile?.phoneNumber || "",
                gender: profile.data?.userProfile?.gender || "",
                birthDate: profile.data?.userProfile?.birthDate || "",
                avatar: profile.data?.userProfile?.imageUrl || "",
            })
        }
    }, [profile?.data?.userProfile?.id])

    return {
        methods,
        onSubmit,
        isPending,
    }
}
