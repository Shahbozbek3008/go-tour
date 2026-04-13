"use client"

import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils/shadcn"
import { ImagePlus, Trash2, UploadCloud } from "lucide-react"
import { useRef, useState } from "react"
import {
    FieldValues,
    Path,
    useController,
    UseFormReturn,
} from "react-hook-form"

interface AvatarUploadProps<T extends FieldValues> {
    methods: UseFormReturn<T>
    name: Path<T>
}

function isFile(value: unknown): value is File {
    return typeof window !== "undefined" && value instanceof File
}

export function AvatarUpload<T extends FieldValues>({
    methods,
    name,
}: AvatarUploadProps<T>) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = useState(false)

    const { field } = useController({ name, control: methods.control })

    const preview =
        isFile(field.value) ? URL.createObjectURL(field.value)
        : typeof field.value === "string" && field.value ? field.value
        : undefined

    const nameValue: string = (methods.watch("name" as Path<T>) as string) ?? ""
    const initials = nameValue
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()

    const handleFile = (file: File) => field.onChange(file)

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files[0]
        if (file?.type.startsWith("image/")) handleFile(file)
    }

    return (
        <FormField
            control={methods.control}
            name={name}
            render={() => (
                <FormItem>
                    <FormControl>
                        <div className="flex flex-col sm:flex-row items-start gap-6">
                            {/* Avatar preview */}
                            <div className="shrink-0 flex flex-col items-center gap-3">
                                <div className="relative group w-20 h-20">
                                    <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center ring-1 ring-slate-200 shadow-sm">
                                        {preview ?
                                            <img
                                                src={preview}
                                                alt="avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        :   <span className="text-slate-400 font-semibold text-xl select-none">
                                                {initials || (
                                                    <ImagePlus className="w-6 h-6 text-slate-300" />
                                                )}
                                            </span>
                                        }
                                    </div>

                                    {preview && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                field.onChange(undefined)
                                            }
                                            className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                        >
                                            <Trash2 className="w-4 h-4 text-white" />
                                        </button>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => inputRef.current?.click()}
                                    className="text-[11px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    {preview ? "O'zgartirish" : "Rasm yuklash"}
                                </button>
                            </div>

                            {/* Drop zone */}
                            <div
                                onDragOver={(e) => {
                                    e.preventDefault()
                                    setIsDragging(true)
                                }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                                onClick={() => inputRef.current?.click()}
                                className={cn(
                                    "flex-1 w-full min-h-[100px] rounded-xl border-2 border-dashed cursor-pointer",
                                    "flex flex-col items-center justify-center gap-2 px-6 py-5",
                                    "transition-all duration-200",
                                    isDragging ?
                                        "border-blue-400 bg-blue-50/60"
                                    :   "border-slate-200 hover:border-slate-300 hover:bg-slate-50/80",
                                )}
                            >
                                <div
                                    className={cn(
                                        "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                                        isDragging ? "bg-blue-100" : (
                                            "bg-slate-100"
                                        ),
                                    )}
                                >
                                    <UploadCloud
                                        className={cn(
                                            "w-4.5 h-4.5 transition-colors",
                                            isDragging ? "text-blue-500" : (
                                                "text-slate-400"
                                            ),
                                        )}
                                    />
                                </div>

                                <div className="text-center">
                                    <p className="text-xs text-slate-600">
                                        <span className="font-medium text-blue-600">
                                            Yuklash uchun bosing
                                        </span>{" "}
                                        yoki sudrab tashlang
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-0.5">
                                        SVG, PNG, JPG, GIF — max. 800×400px
                                    </p>
                                </div>
                            </div>

                            <input
                                ref={inputRef}
                                type="file"
                                accept="image/svg+xml,image/png,image/jpeg,image/gif"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) handleFile(file)
                                }}
                            />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
