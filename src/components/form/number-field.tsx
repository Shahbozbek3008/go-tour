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
import { NumericFormat, NumericFormatProps } from "react-number-format"
import ErrorMessage from "../ui/error-message"
import { Label } from "../ui/label"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: ReactNode
    formatOptions?: Intl.NumberFormatOptions
    wrapperClassName?: string
    optional?: boolean
    showError?: boolean
    registerOptions?: RegisterOptions<IForm>
    rightIcon?: React.ReactNode
    allowZero?: boolean
    labelClassName?: string
}

export default function NumberField<IForm extends FieldValues>({
    methods,
    name,
    label,
    wrapperClassName,
    className,
    formatOptions,
    optional = false,
    showError = false,
    registerOptions,
    rightIcon,
    labelClassName,
    allowZero = false,
    ...props
}: IProps<IForm> & NumericFormatProps) {
    // const t = useTranslations()
    const {
        field: { ref, onChange, value, ...field },
        fieldState: { error, isTouched },
    } = useController({
        name,
        control: methods.control,
        rules: {
            validate: {
                required: (val) => {
                    if (allowZero && val === 0) {
                        return true
                    }
                    if (!optional && !val) {
                        // return t("validation.required", {
                        //     field: label || props.placeholder,
                        // })
                        return "required"
                    }
                    return true
                },
            },
            ...registerOptions,
        },
        defaultValue: 0 as PathValue<IForm, Path<IForm>>,
    })

    return (
        <fieldset
            className={cn("flex flex-col gap-2 w-full", wrapperClassName)}
        >
            {label && (
                <Label
                    htmlFor={name}
                    className={cn(
                        labelClassName,
                        !!error && "text-destructive",
                    )}
                    required={!optional}
                    labelClassName={labelClassName}
                >
                    {label}
                </Label>
            )}

            <div className="relative flex items-center">
                <NumericFormat
                    id={name}
                    className={cn(
                        "flex clamp-[h,10,12] w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                        rightIcon && "pr-12",
                        className,
                        isTouched && !!error && !label && "",
                    )}
                    thousandSeparator={" "}
                    getInputRef={ref}
                    placeholder={"0"}
                    defaultValue={""}
                    value={Number(value) || ""}
                    onValueChange={(val) => {
                        onChange(val.floatValue || 0)
                    }}
                    allowNegative={false}
                    autoComplete="off"
                    isAllowed={({ floatValue }) => {
                        const num = Number(floatValue) || 0
                        const maxValue = Number(props.max)
                        const max = Number.isNaN(maxValue) ? Infinity : maxValue
                        const integerString = Math.trunc(num).toString()
                        const meetsSizeConstraint = integerString.length < 17

                        return num <= max && meetsSizeConstraint
                    }}
                    {...field}
                    {...props}
                />

                {rightIcon && (
                    <span
                        className={cn(
                            "absolute right-3 text-muted-foreground",
                            props.disabled && "cursor-not-allowed opacity-50",
                        )}
                    >
                        {rightIcon}
                    </span>
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
