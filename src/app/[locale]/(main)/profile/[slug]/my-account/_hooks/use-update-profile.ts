import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { API } from "@/lib/constants/api-endpoints"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { FormValues, schema } from "../schemas"

export const useUpdateProfile = () => {
    const { data: profile } = useProfileQuery()
    const { post, isPending } = useRequest()
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
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data)
        const { avatar, ...rest } = data
        const payload = {
            ...rest,
            notification: null,
        }

        post(API.PROFILE.UPDATE, payload, {
            onSuccess: () => {
                invalidateByExactMatch([API.PROFILE.INFO.ME])
                toast.success("Profile ma'lumotlari muvaffaqiyatli yangilandi")
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
