"use client"

import { cn } from "@/lib/utils/shadcn"
import { useTranslations } from "next-intl"
import { ChangeEvent } from "react"
import {
    FieldValues,
    Path,
    PathValue,
    useController,
    UseFormReturn,
} from "react-hook-form"
import ClientTranslate from "../common/translation/client-translate"
import ErrorMessage from "../ui/error-message"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: string
    wrapperClassName?: string
    optional?: boolean
    showError?: boolean
    labelClassName?: string
    onValueChange?: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    sanitize?: boolean
}

export default function ControlledInput<IForm extends FieldValues>({
    methods,
    name,
    label,
    wrapperClassName,
    className,
    optional = false,
    showError = false,
    onValueChange,
    labelClassName,
    placeholder,
    sanitize = false,
    ...props
}: IProps<IForm> & React.InputHTMLAttributes<HTMLInputElement>) {
    const t = useTranslations()
    const {
        field: { onChange, ...field },
        fieldState: { error },
    } = useController({
        name,
        control: methods.control,
        rules: {
            required: { value: !optional, message: t("thisFieldRequired") },
        },
        defaultValue: "" as PathValue<IForm, Path<IForm>>,
    })

    const sanitizeValue = (value: string) => {
        if (!sanitize) return value
        return value.replace(/['";\-\-<>{}()`\\\/\*=]/g, "")
    }

    return (
        <fieldset
            className={cn("flex flex-col gap-2 w-full", wrapperClassName)}
        >
            {label && (
                <Label
                    htmlFor={name}
                    className={cn(
                        !!error && "text-destructive",
                        labelClassName,
                    )}
                    required={!optional}
                >
                    <ClientTranslate translationKey={label} />
                </Label>
            )}
            <Input
                className={cn("", className)}
                autoComplete="off"
                placeholder={placeholder ? t(placeholder) : undefined}
                onChange={(e) => {
                    e.target.value = sanitizeValue(e.target.value)
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
