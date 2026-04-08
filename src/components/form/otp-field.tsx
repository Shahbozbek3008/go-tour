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
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    OtpProps,
} from "../ui/input-otp"
import { Label } from "../ui/label"
// import { Label } from "../ui/label"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: ReactNode
    wrapperClassName?: string
    showError?: boolean
    optional?: boolean
    registerOptions?: RegisterOptions<IForm>
}

export default function OtpField<IForm extends FieldValues>({
    methods,
    name,
    maxLength,
    label,
    wrapperClassName,
    optional = false,
    showError = false,
    registerOptions,
    ...props
}: IProps<IForm> & Omit<OtpProps, "children" | "render">) {
    // const t = useTranslations()
    const {
        field: { onChange, value, ...field },
        fieldState: { error },
    } = useController({
        name,
        control: methods.control,
        rules: {
            required: {
                value: !optional,
                // message: t("importantField"),
                message: "required",
            },
            minLength: maxLength,
            ...registerOptions,
        },
        defaultValue: false as PathValue<IForm, Path<IForm>>,
    })

    return (
        <fieldset
            className={cn(
                "flex flex-col items-center gap-2 w-full",
                wrapperClassName,
            )}
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

            <InputOTP
                value={value}
                onChange={onChange}
                id={name}
                containerClassName="self-center"
                autoFocus
                {...field}
                {...props}
                maxLength={maxLength}
            >
                <InputOTPGroup className="gap-4">
                    {Array.from({ length: maxLength }).map((_, index) => (
                        <InputOTPSlot
                            key={index}
                            index={index}
                            aria-invalid={!!error}
                        />
                    ))}
                </InputOTPGroup>
            </InputOTP>

            {!!error && showError && (
                <ErrorMessage>
                    {error.message || error.root?.message}
                </ErrorMessage>
            )}
        </fieldset>
    )
}
