"use client"
import { cn } from "@/lib/utils/shadcn"
import { ChangeEvent, ReactNode } from "react"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"
import { ClassNameValue } from "tailwind-merge"
import ErrorMessage from "../ui/error-message"
import { Label } from "../ui/label"
import { Textarea, TextareaProps } from "../ui/textarea"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: ReactNode
    labelClassName?: string
    wrapperClassName?: ClassNameValue
    showError?: boolean
    optional?: boolean
    onValueChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
    textareaProps?: TextareaProps
}

export default function UncontrolledTextarea<IForm extends FieldValues>({
    methods,
    name,
    label,
    labelClassName,
    wrapperClassName,
    showError = false,
    optional = false,
    onValueChange,
    textareaProps,
}: IProps<IForm>) {
    // const t = useTranslations()
    const {
        register,
        formState: { errors },
    } = methods

    const { onChange, ...reg } = register(name, {
        required: {
            value: !optional,
            // message: t("importantField"),
            message: "important",
        },
    })

    return (
        <fieldset
            className={cn("flex flex-col gap-2 w-full", wrapperClassName)}
        >
            {label && (
                <Label
                    htmlFor={name}
                    className={cn(
                        !!errors?.[name] && "text-destructive",
                        labelClassName,
                    )}
                    required={!optional}
                >
                    {label}
                </Label>
            )}
            <Textarea
                // placeholder={
                //     typeof label === "string" ? t(label as TranslationKey) : ""
                // }
                placeholder={typeof label === "string" ? label : ""}
                id={name}
                onChange={(e) => {
                    onChange(e)
                    onValueChange?.(e)
                }}
                {...reg}
                {...textareaProps}
            />
            {showError && errors[name] && (
                <ErrorMessage>
                    {(errors[name]?.message as string) ||
                        errors.root?.[name]?.message}
                </ErrorMessage>
            )}
        </fieldset>
    )
}
