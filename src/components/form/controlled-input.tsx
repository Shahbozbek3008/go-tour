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
                    {label}
                </Label>
            )}
            <Input
                className={cn("", className)}
                autoComplete="off"
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
