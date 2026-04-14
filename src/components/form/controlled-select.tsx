import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils/shadcn"
import {
    Control,
    ControllerRenderProps,
    FieldValues,
    Path,
} from "react-hook-form"
import ClientTranslate from "../common/translation/client-translate"
import { TranslationKey } from "../common/translation/types"

interface Option {
    value: string
    label: string | number
    isTranslatable?: boolean
}

interface SelectProps<T extends FieldValues> {
    name: Path<T>
    label?: string | null
    placeholder?: string | null
    options: Option[] | undefined
    className?: string
    selectClass?: string
    labelClass?: string
    control: Control<T>
    description?: string
    required?: boolean
    disabled?: boolean
    notRequired?: boolean
    withoutDescription?: boolean
    asNumber?: boolean
    hasGradientBorder?: boolean
    onChange?: (value: string) => void
}

export default function SelectControl<T extends FieldValues>({
    name,
    label,
    placeholder,
    options,
    control,
    description,
    className,
    selectClass,
    labelClass,
    required,
    disabled,
    notRequired,
    withoutDescription,
    asNumber,
    hasGradientBorder = false,
    onChange,
    ...restProps
}: SelectProps<T>) {
    const selectContent = (field: ControllerRenderProps<T, Path<T>>) => (
        <Select
            onValueChange={(value) => {
                const finalValue = asNumber ? Number(value) : value
                field.onChange(finalValue)
                onChange?.(value)
            }}
            value={field.value}
            disabled={disabled}
            onOpenChange={(open) => {
                if (disabled && open) return false
            }}
            {...restProps}
        >
            <SelectTrigger
                className={cn(
                    selectClass,
                    disabled && "opacity-50 cursor-not-allowed",
                    hasGradientBorder ?
                        "border-0 bg-transparent rounded-[7px]"
                    :   "border",
                )}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options?.length ?
                        options.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.isTranslatable ?
                                    <ClientTranslate
                                        translationKey={
                                            item.label as TranslationKey
                                        }
                                    />
                                :   <span>{item.label}</span>}
                            </SelectItem>
                        ))
                    :   <span className="text-sm px-2">
                            <ClientTranslate translationKey="nothingFound" />
                        </span>
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn(className, "relative")}>
                    {label && (
                        <FormLabel className={labelClass}>
                            {label}{" "}
                            {required && (
                                <span className={cn("text-red")}>*</span>
                            )}
                        </FormLabel>
                    )}
                    <FormControl>
                        {hasGradientBorder ?
                            <div className="border-gradient rounded-md">
                                <div className="rounded-[inherit]">
                                    {selectContent(field)}
                                </div>
                            </div>
                        :   selectContent(field)}
                    </FormControl>
                    {!withoutDescription && (
                        <div className="absolute -bottom-[18px] right-0">
                            {description && (
                                <FormDescription>{description}</FormDescription>
                            )}
                            {!notRequired && <FormMessage />}
                        </div>
                    )}
                </FormItem>
            )}
        />
    )
}
