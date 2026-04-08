"use client"

import MailIcon from "@/assets/icons/mail-icon"
import ClientTranslate from "@/components/common/translation/client-translate"
import UncontrolledInput from "@/components/form/uncontrolled-input"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import FormTitle from "../../_components/form-title"

export default function Tsv() {
    const t = useTranslations()
    const methods = useForm()

    return (
        <form className="flex flex-col clamp-[gap,4,6] w-full clamp-[text,xs,sm]">
            <FormTitle text="twoFactorVerification" />
            <p className="text-center">
                <ClientTranslate translationKey="weHaveSentSixDigit" />
            </p>
            <UncontrolledInput
                methods={methods}
                name="email"
                type="email"
                label={t("email")}
                leftNode={<MailIcon />}
            />
            <UncontrolledInput
                methods={methods}
                name="pwd"
                type="password"
                label={t("password")}
            />
            <Button type="submit" variant={"gradient2"}>
                <ClientTranslate translationKey="continue" />
            </Button>
        </form>
    )
}
