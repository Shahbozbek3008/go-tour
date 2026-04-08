"use client"

import { cn } from "@/lib/utils/shadcn"
import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"
import { ComponentProps } from "react"
import {
    FieldValues,
    Path,
    PathValue,
    useController,
    UseFormReturn,
} from "react-hook-form"
import ErrorMessage from "../ui/error-message"
import { Label } from "../ui/label"

const ReactQuillEditor = dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => (
        <div className="min-h-40 bg-muted/20 rounded-sm animate-pulse" />
    ),
})

import { useLanguage } from "@/hooks/use-language"
import "react-quill-new/dist/quill.snow.css"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: string
    wrapperClassName?: string
    optional?: boolean
    showError?: boolean
    labelClassName?: string
    onValueChange?: (val: string) => void
}

export default function TextEditorField<IForm extends FieldValues>({
    methods,
    name,
    label,
    wrapperClassName,
    className,
    labelClassName,
    optional = false,
    showError = false,
    onValueChange,
    ...props
}: IProps<IForm> & ComponentProps<typeof ReactQuillEditor>) {
    const { isArabic } = useLanguage()
    const t = useTranslations()
    const {
        field: { onChange, disabled, ...field },
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
            className={cn(
                "flex flex-col gap-2 w-full",
                disabled && "pointer-events-none",
                wrapperClassName,
            )}
        >
            {label && (
                <Label
                    htmlFor={name}
                    className={cn(
                        !!error && "text-destructive",
                        labelClassName,
                    )}
                    required={!optional}
                    labelClassName={labelClassName}
                >
                    {label}
                </Label>
            )}
            {/* Wrapper div ga gradient border beriladi */}
            <ReactQuillEditor
                theme="snow"
                onChange={(value) => {
                    onChange(value)
                    onValueChange?.(value)
                }}
                className={cn(
                    "[&_*]:!border-none [&_.ql-toolbar]:border [&_.ql-container]:min-h-40",
                    isArabic ? "ql-rtl [&_.ql-toolbar]:gap-[2rem]" : "",
                    className,
                )}
                modules={{
                    toolbar: [
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                            { list: "ordered" },
                            { list: "bullet" },
                            { indent: "-1" },
                            { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        ["clean"],
                    ],
                    clipboard: { matchVisual: false },
                }}
                formats={[
                    "header",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "indent",
                    "link",
                    "image",
                    "video",
                ]}
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
