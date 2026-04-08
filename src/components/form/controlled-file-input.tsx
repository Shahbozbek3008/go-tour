"use client"

import { IconUploadLink } from "@/assets/icons/upload-link"
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils/shadcn"
import { useState } from "react"
import { Control, FieldValues, Path, UseFormReturn } from "react-hook-form"

interface ControlledFileInputProps<T extends FieldValues> {
    methods: UseFormReturn<T>
    name: Path<T>
    label?: string
    description?: string
    required?: boolean
    disabled?: boolean
    wrapperClassName?: string
    className?: string
    labelClass?: string
    fileType?: "video" | "pdf" | "word" | "image" | string
}

export default function ControlledFileInput<T extends FieldValues>({
    methods,
    name,
    label,
    description,
    required,
    disabled,
    wrapperClassName,
    className,
    labelClass,
    fileType = "image",
}: ControlledFileInputProps<T>) {
    const [fileName, setFileName] = useState<string>("")

    const getAccept = () => {
        switch (fileType) {
            case "video":
                return "video/*"
            case "pdf":
                return "application/pdf"
            case "word":
                return "application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            case "image":
                return "image/*"
            default:
                return fileType
        }
    }

    return (
        <FormField
            control={methods.control as Control<T>}
            name={name}
            render={({ field }) => (
                <FormItem className={cn(wrapperClassName)}>
                    {label && (
                        <FormLabel className={labelClass}>
                            {label}
                            {required && (
                                <span className="text-red-500"> *</span>
                            )}
                        </FormLabel>
                    )}
                    <FormControl>
                        <label
                            className={cn(
                                "flex items-center justify-start h-12 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                                disabled && "opacity-50 cursor-not-allowed",
                                className,
                            )}
                        >
                            <IconUploadLink />
                            <span className="ml-2 text-base text-muted-foreground truncate">
                                {fileName || "No file selected"}
                            </span>
                            <input
                                type="file"
                                className="hidden"
                                disabled={disabled}
                                accept={getAccept()}
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    field.onChange(file || null)
                                    setFileName(file ? file.name : "")
                                }}
                            />
                        </label>
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
