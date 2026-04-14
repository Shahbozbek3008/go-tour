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
import ErrorMessage from "../ui/error-message"
import { Label } from "../ui/label"
import { Switch, SwitchPropsWithoutRef } from "../ui/switch"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: ReactNode
    wrapperClassName?: string
    showError?: boolean
    optional?: boolean
    registerOptions?: RegisterOptions<IForm>
}

export default function SwitchField<IForm extends FieldValues>({
    methods,
    name,
    label,
    wrapperClassName,
    optional = true,
    showError = false,
    registerOptions,
    ...props
}: IProps<IForm> & SwitchPropsWithoutRef) {
    const {
        field: { onChange, value, ...field },
        fieldState: { error },
    } = useController({
        name,
        control: methods.control,
        rules: {
            required: {
                value: !optional,
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
            <div className="flex gap-2">
                <Switch
                    checked={value}
                    onCheckedChange={onChange}
                    id={name}
                    className="h-4 w-9 [&_span]:w-3 [&_span]:h-3"
                    {...field}
                    {...props}
                />

                <Label
                    htmlFor={name}
                    className={cn(!!error && "text-destructive")}
                    required={!optional}
                >
                    {label}
                </Label>
            </div>
            {!!error && showError && (
                <ErrorMessage>
                    {error.message || error.root?.message}
                </ErrorMessage>
            )}
        </fieldset>
    )
}
