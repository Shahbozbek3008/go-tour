"use client"

import { Button } from "@/components/ui/button"
import { Calendar, CalendarProps } from "@/components/ui/calendar"
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { DATE } from "@/lib/constants/date"
import { cn } from "@/lib/utils/shadcn"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import {
    Control,
    ControllerRenderProps,
    FieldValues,
    Path,
    UseFormReturn,
} from "react-hook-form"

interface ControlledDatePickerProps<T extends FieldValues> {
    methods: UseFormReturn<T>
    name: Path<T>
    label?: string
    placeholder?: string
    className?: string
    wrapperClassName?: string
    labelClass?: string
    description?: string
    required?: boolean
    disabled?: boolean
    hasGradientBorder?: boolean
    calendarProps?: CalendarProps
}

export default function ControlledDatePicker<T extends FieldValues>({
    methods,
    name,
    label,
    placeholder = "Select a date",
    className,
    wrapperClassName,
    labelClass,
    description,
    required,
    disabled,
    hasGradientBorder = false,
    calendarProps,
}: ControlledDatePickerProps<T>) {
    const [open, setOpen] = useState(false)

    const renderDatePicker = (field: ControllerRenderProps<T, Path<T>>) => {
        const selectedDate = field.value ? new Date(field.value) : undefined

        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        disabled={disabled}
                        className={cn(
                            "w-full justify-start text-left font-normal active:scale-100",
                            !selectedDate && "text-muted-foreground",
                            disabled && "opacity-50 cursor-not-allowed",
                            hasGradientBorder && "bg-transparent border-0",
                            className,
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ?
                            format(selectedDate, "PPP")
                        :   placeholder}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="start">
                    <Calendar
                        captionLayout="dropdown"
                        endMonth={new Date(new Date().getFullYear() + 50, 11)}
                        {...calendarProps}
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                            field.onChange(
                                date ?
                                    format(date, DATE.SERVER_FORMAT)
                                :   undefined,
                            )
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        )
    }

    return (
        <FormField
            control={methods.control as Control<T>}
            name={name}
            render={({ field }) => (
                <FormItem className={cn(wrapperClassName, "relative")}>
                    {label && (
                        <FormLabel className={labelClass}>
                            {label}
                            {required && (
                                <span className="text-red-500"> *</span>
                            )}
                        </FormLabel>
                    )}
                    <FormControl>
                        {hasGradientBorder ?
                            <div className="relative rounded-lg p-[1px] bg-transparent">
                                <div
                                    className="absolute inset-0 rounded-lg"
                                    style={{
                                        background:
                                            "linear-gradient(220deg, #00BCE6 13.04%, #D500F9 100%)",
                                    }}
                                />
                                <div className="relative bg-white rounded-lg">
                                    {renderDatePicker(field)}
                                </div>
                            </div>
                        :   renderDatePicker(field)}
                    </FormControl>
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
