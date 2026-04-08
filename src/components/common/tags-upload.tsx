"use client"

import IconX2 from "@/assets/icons/x-icon2"
import { Button } from "@/components/ui/button"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { getArray } from "@/lib/utils/get-array"
import { cn } from "@/lib/utils/shadcn"
import * as React from "react"
import { Control, FieldValues, Path } from "react-hook-form"

type Props<T extends FieldValues> = {
    name: Path<T>
    control: Control<T>
    label?: string
    placeholder?: string
    suggestions?: string[]
    maxTags?: number
    className?: string
    labelClass?: string
    disabled?: boolean
}

export function UploadTagsControl<T extends FieldValues>({
    name,
    control,
    label = "Tags",
    placeholder = "#Add a tag",
    suggestions = [],
    maxTags = 10,
    className,
    labelClass,
    disabled,
}: Props<T>) {
    const [inputValue, setInputValue] = React.useState("")
    const suggestionsArray = getArray(suggestions).filter(
        (s) => typeof s === "string",
    )

    const normalize = (s: string) => {
        const t = s.trim().replace(/\s+/g, "")
        if (!t) return ""
        return t.startsWith("#") ? t : `#${t}`
    }

    const addTags = (raw: string, current: string[]) => {
        const pieces = raw
            .split(/[,\n]+/g)
            .map(normalize)
            .filter(Boolean)

        const next: string[] = []
        for (const p of pieces) {
            if (current.includes(p)) continue
            if (current.length + next.length >= maxTags) break
            next.push(p)
        }
        return [...current, ...next]
    }

    const commitIfAny = (
        value: string,
        tags: string[],
        onChange: (v: string[]) => void,
    ) => {
        const next = addTags(value, tags)
        if (next.length !== tags.length) {
            onChange(next)
            setInputValue("")
        }
    }

    const onKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        tags: string[],
        onChange: (v: string[]) => void,
    ) => {
        if (disabled) return
        if (e.key === "Enter" || e.key === "Tab" || e.key === ",") {
            e.preventDefault()
            commitIfAny(inputValue, tags, onChange)
        } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
            onChange(tags.slice(0, -1))
        }
    }

    const onPaste = (
        e: React.ClipboardEvent<HTMLInputElement>,
        tags: string[],
        onChange: (v: string[]) => void,
    ) => {
        const text = e.clipboardData.getData("text")
        if (/[,\n]/.test(text)) {
            e.preventDefault()
            const next = addTags(text, tags)
            onChange(next)
        }
    }

    const removeAt = (
        i: number,
        tags: string[],
        onChange: (v: string[]) => void,
    ) => {
        const next = tags.slice()
        next.splice(i, 1)
        onChange(next)
    }

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const tags: string[] =
                    Array.isArray(field.value) ? field.value : []

                return (
                    <FormItem className={cn(className)}>
                        {label && (
                            <FormLabel
                                className={cn(
                                    "text-base font-medium",
                                    labelClass,
                                )}
                            >
                                {label}
                            </FormLabel>
                        )}

                        <FormControl>
                            <div className="w-full">
                                {/* === Gradient border — ControlledInput uslubi bilan === */}
                                <div className="relative bg-transparent rounded-lg w-full sm:w-1/2">
                                    <div
                                        className={cn(
                                            "border-gradient rounded-lg",
                                            (disabled ||
                                                tags.length >= maxTags) &&
                                                "opacity-60 cursor-not-allowed",
                                        )}
                                    >
                                        <div className="rounded-[inherit]">
                                            <input
                                                value={inputValue}
                                                onChange={(e) =>
                                                    setInputValue(
                                                        e.target.value,
                                                    )
                                                }
                                                onKeyDown={(e) =>
                                                    onKeyDown(
                                                        e,
                                                        tags,
                                                        field.onChange,
                                                    )
                                                }
                                                onPaste={(e) =>
                                                    onPaste(
                                                        e,
                                                        tags,
                                                        field.onChange,
                                                    )
                                                }
                                                placeholder={placeholder}
                                                disabled={
                                                    disabled ||
                                                    tags.length >= maxTags
                                                }
                                                className={cn(
                                                    // Inputning o‘zi — transparent, border-0, radius inherit
                                                    "w-full h-11 rounded-[inherit] bg-transparent border-0",
                                                    "px-4 outline-none ring-0 focus:ring-0",
                                                    // placeholder style (ixtiyoriy)
                                                    "placeholder:text-text-400",
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Suggestions */}
                                {suggestionsArray.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
                                        {suggestionsArray.map((s) => (
                                            <button
                                                key={s}
                                                type="button"
                                                onClick={() => {
                                                    if (disabled) return
                                                    const next = addTags(
                                                        s,
                                                        tags,
                                                    )
                                                    field.onChange(next)
                                                }}
                                                className="text-base hover:underline"
                                            >
                                                {s.startsWith("#") ?
                                                    s
                                                :   `#${s}`}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Selected chips */}
                                <div className="mt-3 flex flex-wrap gap-3">
                                    {tags.map((t, i) => (
                                        <span
                                            key={`${t}-${i}`}
                                            className="inline-flex items-center gap-2 rounded-full bg-[#EEF2FF] px-3 py-1.5"
                                        >
                                            <span className="text-primary">
                                                {t.startsWith("#") ?
                                                    t
                                                :   `#${t}`}
                                            </span>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                icon={<IconX2 />}
                                                className="h-6 w-6 p-0 rounded-full bg-error-500 text-white hover:bg-error-500/90"
                                                onClick={() =>
                                                    removeAt(
                                                        i,
                                                        tags,
                                                        field.onChange,
                                                    )
                                                }
                                                aria-label={`Remove ${t}`}
                                            />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}
