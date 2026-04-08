"use client"

import { IconVector2 } from "@/assets/icons/vector2"
import { cn } from "@/lib/utils/shadcn"
import {
    FieldValues,
    Path,
    useController,
    UseFormReturn,
} from "react-hook-form"
import { ActionMeta, SingleValue } from "react-select"
import ClientTranslate from "../common/translation/client-translate"
import BaseSelect, { BaseSelectProps } from "../ui/base-select"
import ErrorMessage from "../ui/error-message"
import { Label } from "../ui/label"

// Define base props that will be common for all SelectField instances
interface CustomProps<IForm extends FieldValues, Option> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: string
    optional?: boolean
    optionLabelKey?: Path<Option>
    optionValueKey?: Path<Option>
    wrapperClassName?: string
    onValueChange?: (o: SingleValue<Option>) => void
    showError?: boolean
    aiGenerated?: boolean
    labelClassName?: string
}

// Create a type that combines base props with react-select Props
type SelectFieldProps<
    IForm extends FieldValues,
    Option = unknown,
> = CustomProps<IForm, Option> &
    Omit<
        BaseSelectProps<Option, false>,
        keyof CustomProps<IForm, Option> | "isMulti"
    >

export default function SelectField<
    IForm extends FieldValues,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Option extends Record<string, any>,
>({
    name,
    methods,
    label,
    optional = false,
    optionLabelKey = "name" as Path<Option>,
    optionValueKey = "id" as Path<Option>,
    classNames,
    components: customComponents,
    wrapperClassName,
    labelClassName,
    options,
    onValueChange,
    aiGenerated = false,
    showError = false,
    styles,
    ...props
}: SelectFieldProps<IForm, Option>) {
    // const t = useTranslations()
    const opts = options || []
    const { control } = methods
    const {
        field: { onChange, value, disabled, ...field },
        fieldState: { error },
    } = useController({
        name,
        control,
        rules: {
            validate: (val) => {
                if (optional) return true
                return (val !== undefined && val !== null) || "important"
            },
        },
    })

    const currentVal =
        (opts as Option[]).find(
            (o) => o[optionValueKey as keyof Option] === value,
        ) || null

    const handleOnchange = (
        val: SingleValue<Option>,
        _actionMeta: ActionMeta<Option>,
    ) => {
        onValueChange?.(val)
        if (val) {
            onChange((val as Option)[optionValueKey as keyof Option])
        } else {
            onChange(val)
        }
    }

    return (
        <fieldset
            className={cn("flex flex-col gap-2 w-full", wrapperClassName)}
        >
            {label && (
                <div className="flex items-center justify-between">
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
                    {aiGenerated && (
                        <p className="flex items-center text-gradient text-sm gap-1">
                            <IconVector2 className="w-4 h-4" />{" "}
                            <ClientTranslate translationKey="aiGenerated" />
                        </p>
                    )}
                </div>
            )}
            <BaseSelect<Option, false>
                classNames={{
                    control: ({ isFocused }) =>
                        cn(
                            "clamp-[h,10,12] px-3",
                            isFocused ? "border-gradient" : "border-gradient",
                        ),
                    singleValue: () => "text-gradient",
                    input: () => "text-gradient",
                }}
                getOptionLabel={(opt) =>
                    String(opt[optionLabelKey as keyof Option])
                }
                getOptionValue={(opt) =>
                    String(opt[optionValueKey as keyof Option])
                }
                components={{
                    ...customComponents,
                }}
                value={currentVal}
                onChange={handleOnchange}
                options={opts}
                isDisabled={disabled}
                inputId={name}
                {...field}
                {...props}
                isMulti={false}
            />
            {!!error && showError && (
                <ErrorMessage>
                    {error.message || error.root?.message}
                </ErrorMessage>
            )}
        </fieldset>
    )
}
