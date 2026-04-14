"use client"

import { IconImageUpload } from "@/assets/icons/image-upload"
import { IconVideoUpload } from "@/assets/icons/video-upload"
import { cn } from "@/lib/utils/shadcn"
import { Trash2 } from "lucide-react"
import { useRef, useState } from "react"
import {
    Control,
    Controller,
    FieldValues,
    Path,
    RegisterOptions,
} from "react-hook-form"

interface UploadedVideo {
    file: File
    id: string
    url: string
    // poster olish uchun birinchi freymni ko'rsatishga urinmaymiz (brauzer o'zi qiladi)
}

interface VideoUploadControlProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    rules?: RegisterOptions<T, Path<T>>
    label?: string
    className?: string
    description?: string
    disabled?: boolean
    required?: boolean
    helperText?: string
    maxSizeMB?: number
    maxCount?: number
}

const DEFAULT_MAX_VIDEO_SIZE = 50 * 1024 * 1024
const DEFAULT_MAX_VIDEO_COUNT = 5

export function VideoUploadControl<T extends FieldValues>({
    name,
    control,
    rules,
    label = "Upload video",
    className,
    description,
    disabled = false,
    required = false,
    helperText,
    maxSizeMB = DEFAULT_MAX_VIDEO_SIZE,
    maxCount = DEFAULT_MAX_VIDEO_COUNT,
}: VideoUploadControlProps<T>) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [videos, setVideos] = useState<UploadedVideo[]>([])

    const formatBytes = (bytes: number) => {
        const mb = bytes / (1024 * 1024)
        return `${mb.toFixed(1).replace(".", ",")} MB`
    }

    const genId = (f: File) => `${f.name}-${f.size}-${f.lastModified}`

    const handleFiles = (
        fileList: FileList | null,
        onChange: (value: File[]) => void,
    ) => {
        if (!fileList) return
        const selected = Array.from(fileList).filter((f) =>
            f.type.startsWith("video"),
        )

        const existingIds = new Set(videos.map((v) => v.id))
        const remaining = Math.max(0, maxCount - videos.length)

        const valid = selected
            .slice(0, remaining)
            .filter(
                (file) =>
                    file.size <= maxSizeMB * 1024 * 1024 &&
                    !existingIds.has(genId(file)),
            )

        if (!valid.length) {
            if (inputRef.current) inputRef.current.value = ""
            return
        }

        const newItems: UploadedVideo[] = valid.map((file) => ({
            file,
            id: genId(file),
            url: URL.createObjectURL(file),
        }))

        const combined = [...videos, ...newItems].slice(0, maxCount)
        setVideos(combined)
        onChange(combined.map((v) => v.file))
        if (inputRef.current) inputRef.current.value = ""
    }

    const handleRemove = (id: string, onChange: (value: File[]) => void) => {
        const updated = videos.filter((v) => v.id !== id)
        setVideos(updated)
        onChange(updated.map((v) => v.file))
        if (inputRef.current) inputRef.current.value = ""
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => {
                const { onChange } = field
                const { error } = fieldState

                return (
                    <div className={cn("md:space-y-3", className)}>
                        {label && (
                            <div className="hidden md:flex items-center justify-between">
                                <h4 className="text-base font-medium">
                                    {label}
                                </h4>
                                <span className="text-sm text-muted-foreground">
                                    {required && "*"} Supported: MP4, WebM, MOV
                                    — {maxSizeMB}MB each, up to {maxCount} files
                                </span>
                            </div>
                        )}

                        <input
                            ref={inputRef}
                            id={`video-input-${String(name)}`}
                            type="file"
                            multiple
                            accept="video/*"
                            disabled={disabled}
                            className="hidden"
                            onChange={(e) =>
                                handleFiles(e.target.files, onChange)
                            }
                        />

                        <div className="md:hidden rounded-2xl border bg-[#EEF2FF] p-3 shadow-sm">
                            <label
                                htmlFor={`video-input-${String(name)}`}
                                className={cn(
                                    "relative grid place-items-center rounded-xl border border-dashed bg-white px-4 py-10 transition hover:bg-muted/40",
                                    disabled &&
                                        "pointer-events-none opacity-60",
                                )}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault()
                                    if (!disabled)
                                        handleFiles(
                                            e.dataTransfer.files,
                                            onChange,
                                        )
                                }}
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-full shadow-[var(--photo-upload-icon-shadow)]">
                                        <IconVideoUpload />
                                    </div>
                                    <p className="mt-3 text-[15px] font-medium">
                                        Select Video to Upload
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Supported: MP4, WebM, MOV ({maxSizeMB}mb
                                        each)
                                    </p>
                                    <span className="mt-3 inline-flex items-center justify-center rounded-full px-5 py-2 text-white bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold">
                                        Select Video
                                    </span>
                                </div>
                            </label>

                            <div className="mt-3 flex flex-wrap clamp-[gap,1,3] overflow-x-auto pb-1">
                                {videos.map(({ id, url, file }, i) => (
                                    <div
                                        key={id}
                                        className="relative shrink-0 w-19 h-19 sm:w-36 sm:h-36 rounded-xl overflow-hidden bg-muted/40 border"
                                    >
                                        <video
                                            src={url}
                                            className="w-full h-full object-cover"
                                            muted
                                            controls
                                            playsInline
                                        />
                                        <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-[10px] px-2 py-1 truncate">
                                            {(file.name || "").split(".")[0]} •{" "}
                                            {formatBytes(file.size)}
                                        </div>

                                        {/* Remove */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemove(id, onChange)
                                            }
                                            className="absolute top-1.5 right-1.5 grid place-items-center rounded-full bg-white/95 hover:bg-red-100 shadow p-1"
                                            aria-label="Remove"
                                        >
                                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                        </button>

                                        {i === 0 && (
                                            <div className="absolute bottom-0 left-0 rounded-tr-lg bg-indigo-600 text-white text-[10px] px-2 py-0.5">
                                                Main
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hidden md:grid grid-cols-4 gap-4">
                            {videos.map(({ id, url, file }, idx) => (
                                <div
                                    key={id}
                                    className="relative w-full h-[170px] bg-muted/40 rounded-xl overflow-hidden border"
                                >
                                    <video
                                        src={url}
                                        className="w-full h-full object-cover"
                                        controls
                                        muted
                                        playsInline
                                    />
                                    <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-xs px-2 py-1 truncate">
                                        {(file.name || "").split(".")[0]} •{" "}
                                        {formatBytes(file.size)}
                                    </div>
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100"
                                        onClick={() =>
                                            handleRemove(id, onChange)
                                        }
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                    {idx === 0 && (
                                        <div className="absolute bottom-0 left-0 w-[70px] text-center bg-indigo-600 text-white text-xs py-0.5 rounded-tr-lg">
                                            Main
                                        </div>
                                    )}
                                </div>
                            ))}

                            {videos.length < maxCount && (
                                <label
                                    htmlFor={`video-input-${String(name)}`}
                                    className={cn(
                                        "flex flex-col items-center justify-center w-full h-[170px] border border-dashed rounded-xl cursor-pointer hover:bg-muted/10 transition relative",
                                        disabled &&
                                            "opacity-50 cursor-not-allowed",
                                    )}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        e.preventDefault()
                                        if (!disabled)
                                            handleFiles(
                                                e.dataTransfer.files,
                                                onChange,
                                            )
                                    }}
                                >
                                    <div className="w-12 h-12 flex items-center justify-center rounded-full shadow-[var(--photo-upload-icon-shadow)]">
                                        <IconImageUpload />
                                    </div>
                                    <span className="text-sm mt-1 text-gray-500">
                                        Drop your video here
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        Max File Size: {maxSizeMB} MB
                                    </span>
                                </label>
                            )}
                        </div>

                        {description && (
                            <p className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        )}
                        {helperText && !error && (
                            <p className="text-sm text-muted-foreground">
                                {helperText}
                            </p>
                        )}
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
