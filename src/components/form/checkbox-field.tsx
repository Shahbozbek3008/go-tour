"use client"
import { cn } from "@/lib/utils/shadcn"
import { ReactNode } from "react"
import {
    FieldValues,
    Path,
    PathValue,
    RegisterOptions,
    useController,
    UseFormReturn,
} from "react-hook-form"
import { Checkbox, CheckboxProps } from "../ui/checkbox"
import ErrorMessage from "../ui/error-message"
import { Label } from "../ui/label"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: ReactNode
    wrapperClassName?: string
    showError?: boolean
    registerOptions?: RegisterOptions<IForm>
}

export default function CheckboxField<IForm extends FieldValues>({
    methods,
    name,
    label,
    wrapperClassName,
    required = false,
    showError = false,
    registerOptions,
    ...props
}: IProps<IForm> & CheckboxProps) {
    // const t = useTranslations()
    const {
        field: { onChange, value, ...field },
        fieldState: { error },
    } = useController({
        name,
        control: methods.control,
        rules: {
            required: {
                value: !!required,
                // message: t("importantMark"),
                message: "required",
            },
            ...registerOptions,
        },
        defaultValue: false as PathValue<IForm, Path<IForm>>,
    })

    return (
        <fieldset
            className={cn("flex flex-col gap-2 w-full", wrapperClassName)}
        >
            <div className="flex items-center gap-2">
                <Checkbox
                    checked={value}
                    onCheckedChange={onChange}
                    id={name}
                    {...field}
                    {...props}
                />

                {label && (
                    <Label
                        htmlFor={name}
                        className={cn(
                            !!error && "text-destructive",
                            "clamp-[text,xs,sm]",
                        )}
                        required={required}
                    >
                        {label}
                    </Label>
                )}
            </div>
            {!!error && showError && (
                <ErrorMessage>
                    {error.message || error.root?.message}
                </ErrorMessage>
            )}
        </fieldset>
    )
}
