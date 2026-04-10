"use client"

import { cn } from "@/lib/utils/shadcn"
import { PhoneNumberUtil } from "google-libphonenumber"
import { useTranslations } from "next-intl"
import {
    FieldValues,
    Path,
    useController,
    UseFormReturn,
} from "react-hook-form"
import {
    PhoneInput,
    PhoneInputProps,
    PhoneInputRefType,
} from "react-international-phone"
import "react-international-phone/style.css"
import { TranslationKey } from "../common/translation/types"
import ErrorMessage from "../ui/error-message"
import { Label } from "../ui/label"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: string
    optional?: boolean
    showError?: boolean
    wrapperClassName?: string
    hideError?: boolean
    onValueChange?: (val: string) => void
}

const phoneUtil = PhoneNumberUtil.getInstance()

export default function PhoneField<IForm extends FieldValues>({
    methods,
    name,
    label,
    optional = false,
    showError = true,
    wrapperClassName,
    className,
    inputClassName,
    countrySelectorStyleProps,
    onValueChange,
    ...props
}: IProps<IForm> & PhoneInputProps & React.RefAttributes<PhoneInputRefType>) {
    const t = useTranslations()
    const { control } = methods
    const isPhoneValid = (phone: string) => {
        try {
            return phoneUtil.isValidNumber(
                phoneUtil.parseAndKeepRawInput(phone),
            )
        } catch (err) {
            console.error(err)
            return false
        }
    }
    const {
        field: { value, onChange, ...field },
        fieldState: { error },
    } = useController({
        name,
        control,
        rules: {
            validate: (val: string) => {
                const v =
                    val ?
                        val.startsWith("+") ?
                            val
                        :   `+${val}`
                    :   ""
                let err = ""
                let isValid = true
                if (!optional) {
                    isValid = isPhoneValid(v)
                    if (!isValid) {
                        err = t("trueAndComplete")
                    }
                }

                return isValid || err
            },
        },
        // @ts-expect-error sdf
        defaultValue: "",
    })

    const val =
        (value as string) ?
            value.startsWith("+") ?
                value
            :   `+${value}`
        :   ""

    return (
        <fieldset
            className={cn("flex flex-col gap-2 w-full", wrapperClassName)}
        >
            {label && (
                <Label
                    htmlFor={name}
                    className={cn(!!error && "text-destructive")}
                    required={!optional}
                >
                    {label}
                </Label>
            )}
            <PhoneInput
                // hideDropdown
                // forceDialCode
                className={cn(
                    "w-full  placeholder:clamp-[text,sm,base] clamp-[h,10,12] rounded-lg !outline-none",
                    className,
                )}
                inputClassName={cn(
                    "w-full !h-full !text-foreground !rounded-r-lg !px-3 !bg-background !border-input !clamp-[text,sm,base] !outline-none",
                    inputClassName,
                )}
                countrySelectorStyleProps={{
                    // className="hidden",
                    buttonClassName:
                        "!h-full !px-3 !rounded-l-lg !bg-background !border-input",
                    ...countrySelectorStyleProps,
                }}
                value={val}
                defaultCountry="uz"
                placeholder={
                    typeof label === "string" ?
                        t(label as TranslationKey)
                    :   undefined
                }
                onChange={(e) => {
                    onChange(e)
                    onValueChange?.(e)
                }}
                {...field}
                {...props}
            />
            {!!error && showError && (
                <ErrorMessage>
                    {error.message || error.root?.message}
                </ErrorMessage>
            )}
        </fieldset>
    )
}
