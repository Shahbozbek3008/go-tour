"use client"

import { cn } from "@/lib/utils/shadcn"
import { ChangeEvent } from "react"
import {
    FieldValues,
    Path,
    PathValue,
    useController,
    UseFormReturn,
} from "react-hook-form"
import ErrorMessage from "../ui/error-message"
import { Label } from "../ui/label"
import { Textarea, TextareaProps } from "../ui/textarea"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: string
    wrapperClassName?: string
    optional?: boolean
    showError?: boolean
    labelClassName?: string
    onValueChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
    textareaProps?: TextareaProps
}

export default function ControlledTextarea<IForm extends FieldValues>({
    methods,
    name,
    label,
    wrapperClassName,
    optional = false,
    showError = false,
    onValueChange,
    labelClassName,
    textareaProps,
}: IProps<IForm>) {
    const {
        field: { onChange, ...field },
        fieldState: { error },
    } = useController({
        name,
        control: methods.control,
        rules: {
            required: { value: !optional, message: "Ushbu maydon majburiy" },
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
            <Textarea
                autoComplete="off"
                onChange={(e) => {
                    onChange(e)
                    onValueChange?.(e)
                }}
                {...field}
                {...textareaProps}
            />
            {!!error && showError && (
                <ErrorMessage>
                    {error.message || error.root?.message}
                </ErrorMessage>
            )}
        </fieldset>
    )
}
