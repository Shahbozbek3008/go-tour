"use client"
import { cn } from "@/lib/utils/shadcn"
import {
    FieldValues,
    Path,
    useController,
    UseFormReturn,
} from "react-hook-form"
import { ActionMeta, SingleValue } from "react-select"
import BaseCreatableSelect, {
    BaseCreatableSelectProps,
} from "../ui/base-creatable-select"
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
    labelClassName?: string
    onValueChange?: (o: SingleValue<Option>) => void
    showError?: boolean
}

// Create a type that combines base props with react-select Props
type SelectFieldProps<
    IForm extends FieldValues,
    Option = unknown,
> = CustomProps<IForm, Option> &
    Omit<
        BaseCreatableSelectProps<Option, false>,
        keyof CustomProps<IForm, Option> | "isMulti"
    >

export default function CreatableSelectField<
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
    showError = false,
    styles,
    ...props
}: SelectFieldProps<IForm, Option>) {
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

    const currentVal = value ? { [optionValueKey]: value } : null

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
            <BaseCreatableSelect<Option, false>
                getOptionLabel={(opt) =>
                    String(opt[optionLabelKey as keyof Option])
                }
                getOptionValue={(opt) =>
                    String(opt[optionValueKey as keyof Option])
                }
                classNames={{
                    control: ({ isFocused }) =>
                        cn(
                            "clamp-[h,10,12] px-3",
                            isFocused ? "border-gradient" : "border-gradient",
                        ),
                    singleValue: () => "text-gradient", // <- tanlangan option matniga gradient
                    input: () => "text-gradient",
                }}
                components={{
                    ...customComponents,
                }}
                value={currentVal as Option}
                onChange={handleOnchange}
                options={opts}
                isDisabled={disabled}
                inputId={name}
                getNewOptionData={(val) => {
                    return {
                        [optionValueKey]: val,
                    } as Option
                }}
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
