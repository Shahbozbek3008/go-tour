"use client"

import { IconImageUpload } from "@/assets/icons/image-upload"
import { IconImageUpload2 } from "@/assets/icons/image-upload2"
import { cn } from "@/lib/utils/shadcn"
import { X } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"
import {
    Control,
    Controller,
    FieldValues,
    Path,
    RegisterOptions,
} from "react-hook-form"

interface UploadedImage {
    file: File
    id: string
    preview: string
    progress: number
    uploading: boolean
}

interface PhotoUploadControlProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    rules?: RegisterOptions<T, Path<T>>
    label?: string
    className?: string
    disabled?: boolean
    required?: boolean
    maxFileSizeMB?: number
    maxCount?: number
}

export function PhotoUploadControl<T extends FieldValues>({
    name,
    control,
    rules,
    label = "Upload photo",
    className,
    disabled = false,
    required = false,
    maxFileSizeMB = 10,
    maxCount = 10,
}: PhotoUploadControlProps<T>) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [images, setImages] = useState<UploadedImage[]>([])

    const isImage = (file: File) => file.type.startsWith("image/")
    const generateId = (f: File) => `${f.name}-${f.size}-${f.lastModified}`

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange }, fieldState: { error } }) => {
                const startSimulatedUpload = (batch: UploadedImage[]) => {
                    batch.forEach((image) => {
                        let progress = 0
                        const t = setInterval(() => {
                            progress += 20
                            setImages((prev) =>
                                prev.map((i) =>
                                    i.id === image.id ?
                                        {
                                            ...i,
                                            progress,
                                            uploading: progress < 100,
                                        }
                                    :   i,
                                ),
                            )
                            if (progress >= 100) {
                                clearInterval(t)
                                setImages((latest) => {
                                    onChange(latest.map((x) => x.file))
                                    return latest
                                })
                            }
                        }, 200)
                    })
                }

                const handleFiles = (files: FileList | null) => {
                    const selected = Array.from(files || [])
                    const remaining = maxCount - images.length
                    const existing = new Set(images.map((i) => i.id))
                    const valid = selected
                        .slice(0, Math.max(0, remaining))
                        .filter(
                            (f) =>
                                isImage(f) &&
                                f.size <= maxFileSizeMB * 1024 * 1024 &&
                                !existing.has(generateId(f)),
                        )

                    if (!valid.length) return
                    const newImages: UploadedImage[] = valid.map((file) => ({
                        file,
                        id: generateId(file),
                        preview: URL.createObjectURL(file),
                        progress: 0,
                        uploading: true,
                    }))
                    setImages((p) => [...p, ...newImages])
                    startSimulatedUpload(newImages)
                }

                const onInputChange = (
                    e: React.ChangeEvent<HTMLInputElement>,
                ) => {
                    handleFiles(e.target.files)
                    if (inputRef.current) inputRef.current.value = ""
                }

                const removeOne = (id: string) => {
                    setImages((prev) => {
                        const updated = prev.filter((i) => i.id !== id)
                        onChange(updated.map((i) => i.file))
                        return updated
                    })
                }

                return (
                    <div className={cn("md:space-y-3", className)}>
                        <div className="hidden md:flex items-center justify-between">
                            <h4 className="text-base font-medium">{label}</h4>
                            <span className="text-sm text-muted-foreground">
                                {required && "*"} Supported: SVG, JPG, PNG —{" "}
                                {maxFileSizeMB}MB each
                            </span>
                        </div>

                        {/* ---- Hidden input: ikkala layout ham ishlatadi ---- */}
                        <input
                            ref={inputRef}
                            id={`photo-input-${name}`}
                            type="file"
                            accept="image/*"
                            multiple
                            disabled={disabled}
                            onChange={onInputChange}
                            className="hidden"
                        />

                        {/* ===== Mobile / Tablet ( < md ) — screenshot ko‘rinishi ===== */}
                        <div className="md:hidden rounded-2xl border bg-[#EEF2FF] p-3 md:p-3 shadow-sm">
                            {/* Upload area full width */}
                            <label
                                htmlFor={`photo-input-${name}`}
                                className={cn(
                                    "relative grid place-items-center rounded-xl border border-dashed bg-white px-4 py-10 transition hover:bg-muted/40",
                                    disabled &&
                                        "pointer-events-none opacity-60",
                                )}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault()
                                    if (!disabled)
                                        handleFiles(e.dataTransfer.files)
                                }}
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-full shadow-[var(--photo-upload-icon-shadow)]">
                                        <IconImageUpload2 />
                                    </div>
                                    <p className="mt-3 text-[15px] font-medium">
                                        Select Photo to Upload
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Supported Format: SVG, JPG, PNG (10mb
                                        each)
                                    </p>
                                    <span className="mt-3 inline-flex items-center justify-center rounded-full px-5 py-2 text-white bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold">
                                        Select Photo
                                    </span>
                                </div>
                            </label>

                            {/* Thumbs: horizontal scroll on mobile */}
                            <div className="mt-3 flex flex-wrap clamp-[gap,1,3] pb-1">
                                {images.map(
                                    (
                                        {
                                            id,
                                            preview,
                                            file,
                                            progress,
                                            uploading,
                                        },
                                        i,
                                    ) => (
                                        <div
                                            key={id}
                                            className="relative shrink-0 w-19 h-19 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-muted/40 border"
                                        >
                                            <Image
                                                src={preview}
                                                alt={file.name}
                                                fill
                                                className="object-cover"
                                                sizes="96px"
                                            />
                                            {i === 0 && (
                                                <div className="absolute bottom-0 left-0 rounded-tr-lg bg-blue-600 text-white text-[10px] px-2 py-0.5">
                                                    Main
                                                </div>
                                            )}
                                            {uploading ?
                                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                                                    <div className="w-8 h-8 rounded-full border-4 border-white/70 border-t-transparent animate-spin" />
                                                    <span className="mt-1 text-xs">
                                                        {progress}%
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeOne(id)
                                                        }
                                                        className="mt-1.5 px-2 py-0.5 bg-white/20 hover:bg-white/30 rounded text-[11px]"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            :   <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeOne(id)
                                                    }
                                                    className="absolute top-1.5 right-1.5 grid place-items-center rounded-full bg-white/95 hover:bg-red-100 shadow p-1"
                                                    aria-label="Remove"
                                                >
                                                    <X className="w-3.5 h-3.5 text-red-500" />
                                                </button>
                                            }
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>

                        {/* ===== Desktop ( >= md ) — oldingi 4-cols grid ko‘rinishi ===== */}
                        <div className="hidden md:grid grid-cols-4 gap-4">
                            {images.map(
                                ({
                                    id,
                                    preview,
                                    file,
                                    progress,
                                    uploading,
                                }) => (
                                    <div
                                        key={id}
                                        className="relative w-full h-[170px] bg-muted/40 rounded-xl overflow-hidden flex justify-center items-center border"
                                    >
                                        <Image
                                            src={preview}
                                            alt={file.name}
                                            className="object-cover"
                                            fill
                                            sizes="25vw"
                                        />
                                        {uploading ?
                                            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                                                <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
                                                <span className="mt-2">
                                                    {progress}%
                                                </span>
                                                <button
                                                    type="button"
                                                    className="mt-2 px-3 py-0.5 bg-blue-500 rounded text-white text-xs hover:bg-blue-600"
                                                    onClick={() =>
                                                        removeOne(id)
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        :   <button
                                                type="button"
                                                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100"
                                                onClick={() => removeOne(id)}
                                            >
                                                <X className="w-4 h-4 text-red-500" />
                                            </button>
                                        }
                                    </div>
                                ),
                            )}

                            {/* Upload tile as before */}
                            {images.length < maxCount && (
                                <label
                                    htmlFor={`photo-input-${name}`}
                                    className={cn(
                                        "flex flex-col items-center justify-center w-full h-[170px] border border-dashed rounded-xl cursor-pointer hover:bg-muted/10 transition relative",
                                        disabled &&
                                            "opacity-50 cursor-not-allowed",
                                    )}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        e.preventDefault()
                                        if (!disabled)
                                            handleFiles(e.dataTransfer.files)
                                    }}
                                >
                                    <div className="w-12 h-12 flex items-center justify-center rounded-full shadow-[var(--photo-upload-icon-shadow)]">
                                        <IconImageUpload />
                                    </div>
                                    <span className="text-sm mt-1 text-gray-500">
                                        Drop your image here
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        Max File Size: {maxFileSizeMB} MB
                                    </span>
                                    <div className="absolute bottom-0 left-0 w-[70px] text-center bg-blue-600 text-white text-xs py-0.5 rounded-tr-lg">
                                        Main
                                    </div>
                                </label>
                            )}
                        </div>

                        {error && (
                            <p className="text-sm text-red-500">
                                {error.message}
                            </p>
                        )}
                    </div>
                )
            }}
        />
    )
}
