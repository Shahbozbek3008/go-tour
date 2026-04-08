"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import OtpField from "@/components/form/otp-field"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/hooks/store/use-auth-store"
import { MUTATION_KEYS } from "@/lib/constants/mutation-keys"
import { useIsMutating } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import FormTitle from "../../_components/form-title"
import GetNewCode from "./get-new-code"

export interface VerificationForm {
    code: string
}

export default function VerificationCode() {
    const { email, onVerificationSubmit } = useAuthStore()
    const isMutating = useIsMutating({
        mutationKey: [MUTATION_KEYS.VERIFICATION],
    })
    const methods = useForm<VerificationForm>({
        defaultValues: {
            code: "",
        },
        disabled: !!isMutating,
    })

    const onSubmit = methods.handleSubmit((vals) => {
        onVerificationSubmit(vals)
    })

    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col items-center clamp-[gap,4,6] w-full clamp-[text,xs,sm]"
        >
            <FormTitle text="enterVerification" />
            <p className="text-center">
                <ClientTranslate translationKey="aVerificationCodeHasBeenSent" />{" "}
                <b>{email}</b>.
            </p>
            <OtpField
                methods={methods}
                name="code"
                maxLength={6}
                wrapperClassName="my-5"
            />
            <Button type="submit" variant={"gradient2"} className="w-full">
                <ClientTranslate translationKey="continue" />
            </Button>
            <GetNewCode />
        </form>
    )
}
