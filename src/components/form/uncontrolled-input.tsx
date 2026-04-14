"use client"
import { cn } from "@/lib/utils/shadcn"
import { ChangeEvent, ReactNode } from "react"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"
import { ClassNameValue } from "tailwind-merge"
import ErrorMessage from "../ui/error-message"
import { Input, InputProps } from "../ui/input"
import { Label } from "../ui/label"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: ReactNode
    wrapperClassName?: ClassNameValue
    showError?: boolean
    optional?: boolean
    labelClassName?: string
    onValueChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function UncontrolledInput<IForm extends FieldValues>({
    methods,
    name,
    label,
    wrapperClassName,
    showError = false,
    optional = false,
    onValueChange,
    labelClassName,
    ...props
}: IProps<IForm> & InputProps) {
    // const t = useTranslations()
    const {
        register,
        formState: { errors },
    } = methods

    const { onChange, ...reg } = register(name, {
        required: {
            value: !optional,
            // message: t("importantField"),
            message: "required",
        },
        ...(props.type === "email" && {
            pattern: {
                value: /\S+@\S+\.\S+/,
                // message: t("noEqualEmailFormat"),
                message: "not email",
            },
        }),
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
                    labelClassName={labelClassName}
                >
                    {label}
                </Label>
            )}
            <Input
                type={"text"}
                className={cn(
                    "focus-visible:border-gradient focus-visible:gradient",
                    props.className,
                )}
                // placeholder={
                //     typeof label === "string" ? t(label as TranslationKey) : ""
                // }
                id={name}
                onChange={(e) => {
                    onChange(e)
                    onValueChange?.(e)
                }}
                {...reg}
                {...props}
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
