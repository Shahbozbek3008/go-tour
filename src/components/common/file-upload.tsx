"use client"

import { IconFileExport } from "@/assets/icons/file-export"
import { IconFileExport2 } from "@/assets/icons/file-export2"
import { cn } from "@/lib/utils/shadcn"
import { FileText, FileVideo, Trash2, X } from "lucide-react"
import { useRef, useState } from "react"
import {
    Control,
    Controller,
    FieldValues,
    Path,
    RegisterOptions,
} from "react-hook-form"

interface UploadedFile {
    file: File
    id: string
}

interface FileUploadControlProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    rules?: RegisterOptions<T, Path<T>>
    label?: string
    className?: string
    description?: string
    disabled?: boolean
    required?: boolean
    helperText?: string
    isRequiredText?: boolean
    /** Har bir fayl kartasi uchun qo‘shimcha klasslar */
    fileListClassName?: string
    /** Upload tile/label uchun klass */
    labelClass?: string
    /** Maksimal fayl hajmi (MB) */
    maxSizeMB?: number
    /** Maksimal ruxsat etilgan fayl soni */
    maxCount?: number
    /** Desktop grid ustunlari klassi (masalan: "md:grid-cols-3 xl:grid-cols-4") */
    desktopGrid?: string
    /** Mobil (<md) uchun ustunlar soni (yoqilsa grid holatiga o‘tadi, aks holda default flex-chip) */
    mobileGridCols?: 1 | 2 | 3 | 4
    /** Mobil (<md) ko‘rinadigan maksimal qatorlar soni (faqat mobileGridCols berilganda ishlaydi) */
    mobileMaxRows?: number
    /** Mobil kartaning stili: "chip" (default) yoki "desktop" (desktopga o‘xshash katta karta) */
    mobileTileStyle?: "chip" | "desktop"
    /** 👉 Mobile’da ham label/header ko‘rsatish */
    mobileShowLabel?: boolean
}

const DEFAULT_MAX_FILE_SIZE_MB = 30

export function FileUploadControl<T extends FieldValues>({
    name,
    control,
    rules,
    label = "Upload files",
    className,
    description,
    disabled = false,
    required = false,
    helperText,
    isRequiredText = true,
    fileListClassName,
    labelClass,
    maxSizeMB = DEFAULT_MAX_FILE_SIZE_MB,
    maxCount,
    desktopGrid,
    mobileGridCols,
    mobileMaxRows,
    mobileTileStyle = "chip",
    mobileShowLabel = false,
}: FileUploadControlProps<T>) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [fileList, setFileList] = useState<UploadedFile[]>([])

    const formatBytes = (bytes: number) =>
        `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`

    const genId = (f: File) => `${f.name}-${f.size}-${f.lastModified}`

    const getIcon = (file: File) =>
        file.type?.startsWith("video/") ?
            <FileVideo className="w-6 h-6" />
        :   <FileText className="w-6 h-6" />

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => {
                const { onChange } = field
                const { error } = fieldState

                const commit = (next: UploadedFile[]) => {
                    setFileList(next)
                    onChange(next.map((f) => f.file))
                }

                const takeRemaining = (files: File[]) => {
                    if (!maxCount) return files
                    const remain = Math.max(0, maxCount - fileList.length)
                    return files.slice(0, remain)
                }

                const handleFiles = (list: FileList | null) => {
                    if (!list) return
                    const selected = Array.from(list)
                    const existing = new Set(fileList.map((f) => f.id))

                    const filtered = takeRemaining(selected)
                        .filter((f) => f.size <= maxSizeMB * 1024 * 1024)
                        .map((file) => ({ file, id: genId(file) }))
                        .filter((f) => !existing.has(f.id))

                    if (!filtered.length) {
                        if (inputRef.current) inputRef.current.value = ""
                        return
                    }
                    commit([...fileList, ...filtered])
                    if (inputRef.current) inputRef.current.value = ""
                }

                const onInputChange = (
                    e: React.ChangeEvent<HTMLInputElement>,
                ) => {
                    handleFiles(e.target.files)
                }

                const handleRemove = (id: string) => {
                    const updated = fileList.filter((f) => f.id !== id)
                    commit(updated)
                    if (inputRef.current) inputRef.current.value = ""
                }

                // ===== Mobile grid konfiguratsiyasi (faqat mobileGridCols berilganda) =====
                const mCols = mobileGridCols ?? 0
                const mLimit =
                    mCols && mobileMaxRows ? mCols * mobileMaxRows : undefined
                const mobileFiles =
                    mLimit ? fileList.slice(0, mLimit) : fileList

                // Dynamic Tailwind variantlari
                const mobileGridClass =
                    mCols === 1 ? "grid grid-cols-1 gap-4"
                    : mCols === 2 ? "grid grid-cols-2 gap-4"
                    : mCols === 3 ? "grid grid-cols-3 gap-4"
                    : mCols === 4 ? "grid grid-cols-4 gap-4"
                    : "flex flex-wrap clamp-[gap,1,3]" // default: chip-layout

                const useDesktopLikeTiles =
                    mCols > 0 && mobileTileStyle === "desktop"

                // Karta klasslari (mobil):
                const mobileTileClass =
                    useDesktopLikeTiles ?
                        "relative w-full h-[170px] bg-muted/40 rounded-xl overflow-hidden border flex flex-col items-center justify-center text-center px-4"
                    :   "relative rounded-xl border bg-white p-2 overflow-hidden w-19 h-19"

                // Remove tugmasi (mobil)
                const mobileRemoveBtnClass =
                    useDesktopLikeTiles ?
                        "w-12 h-12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-(--transparent-bg) rounded-full p-1 shadow hover:bg-red-100 transition flex items-center justify-center"
                    :   "absolute top-1 right-1 grid place-items-center rounded-full bg-[#000000]/10 shadow p-1"

                // Mobil grid’da upload tile’ni qo‘shimcha qator ochmasdan ko‘rsatish
                const mobileHasRoomForUpload =
                    useDesktopLikeTiles &&
                    (!mLimit || mobileFiles.length < mLimit) &&
                    (!maxCount || fileList.length < maxCount)

                return (
                    <div className={cn("md:space-y-3", className)}>
                        {/* Header: Desktop */}
                        {label && (
                            <div className="hidden md:flex items-center justify-between">
                                <h4 className="text-base font-medium">
                                    {label}
                                </h4>
                                {isRequiredText && (
                                    <span className="text-sm text-muted-foreground">
                                        {required && "*"} Keep each file ≤{" "}
                                        {maxSizeMB} MB
                                        {typeof maxCount === "number" ?
                                            `, up to ${maxCount} files`
                                        :   ""}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* 👉 Header: Mobile (prop orqali yoqiladi) */}
                        {label && mobileShowLabel && (
                            <div className="flex md:hidden items-center justify-between mb-2">
                                <h4 className="text-sm font-medium">{label}</h4>
                                {isRequiredText && (
                                    <span className="text-xs text-muted-foreground">
                                        {required && "*"} ≤ {maxSizeMB} MB
                                        {typeof maxCount === "number" ?
                                            `, ≤ ${maxCount} files`
                                        :   ""}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Hidden input */}
                        <input
                            ref={inputRef}
                            id={`file-input-${String(name)}`}
                            type="file"
                            multiple
                            disabled={disabled}
                            className="hidden"
                            onChange={onInputChange}
                        />

                        {/* ===== Mobile / Tablet (< md) ===== */}
                        <div className="md:hidden px-1">
                            {/* Agar desktop-like istalmasa, eski Select panelini ko‘rsatamiz */}
                            {!useDesktopLikeTiles && (
                                <label
                                    htmlFor={`file-input-${String(name)}`}
                                    className={cn(
                                        "relative grid place-items-center rounded-xl border bg-white px-4 py-6 transition hover:bg-muted/40",
                                        disabled &&
                                            "pointer-events-none opacity-60",
                                        labelClass,
                                    )}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        e.preventDefault()
                                        if (!disabled)
                                            handleFiles(e.dataTransfer.files)
                                    }}
                                >
                                    <div className="flex flex-col items-center text-center gap-4">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full shadow-[var(--photo-upload-icon-shadow)]">
                                            <IconFileExport2 />
                                        </div>
                                        <p className="text-sm font-semibold text-text-900">
                                            Select Files to Upload
                                        </p>
                                        <span className="inline-flex items-center justify-center rounded-full px-5 py-2 text-white bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold">
                                            Select Files
                                        </span>
                                    </div>
                                </label>
                            )}

                            {/* Fayllar grid’i (va kerak bo‘lsa upload tile) */}
                            <div className={cn("mt-3", mobileGridClass)}>
                                {mobileFiles.map(({ file, id }) => (
                                    <div
                                        key={id}
                                        className={cn(
                                            mobileTileClass,
                                            fileListClassName,
                                        )}
                                        title={file.name}
                                    >
                                        <div
                                            className={cn(
                                                "flex flex-col items-center",
                                                useDesktopLikeTiles ? "gap-0"
                                                :   "gap-1",
                                            )}
                                        >
                                            <div className="shrink-0">
                                                {getIcon(file)}
                                            </div>
                                            <div
                                                className={cn(
                                                    "w-full min-w-0 text-center space-y-0.5",
                                                    useDesktopLikeTiles &&
                                                        "mt-2",
                                                )}
                                            >
                                                <p
                                                    className={cn(
                                                        "font-semibold",
                                                        useDesktopLikeTiles ?
                                                            "text-sm"
                                                        :   "text-tiny leading-tight",
                                                        // mobil ellipsis + kenglik
                                                        "whitespace-nowrap overflow-hidden text-ellipsis",
                                                        "max-w-[130px] md:max-w-none mx-auto",
                                                    )}
                                                >
                                                    {file.name}
                                                </p>
                                                <p
                                                    className={cn(
                                                        "text-muted-foreground",
                                                        useDesktopLikeTiles ?
                                                            "text-sm"
                                                        :   "text-tiny",
                                                        "whitespace-nowrap overflow-hidden text-ellipsis",
                                                        "max-w-[130px] md:max-w-none mx-auto",
                                                    )}
                                                >
                                                    {file.type}{" "}
                                                    <span>
                                                        {" "}
                                                        {formatBytes(file.size)}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Remove */}
                                        <button
                                            type="button"
                                            onClick={() => handleRemove(id)}
                                            className={mobileRemoveBtnClass}
                                            aria-label="Remove"
                                        >
                                            {useDesktopLikeTiles ?
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            :   <X className="w-3.5 h-3.5 text-text-900" />
                                            }
                                        </button>
                                    </div>
                                ))}

                                {/* Mobil: desktop-like bo‘lsa, upload tile ham xuddi desktopniki kabi */}
                                {mobileHasRoomForUpload && (
                                    <label
                                        htmlFor={`file-input-${String(name)}`}
                                        className={cn(
                                            "flex flex-col items-center justify-center w-full h-[170px] border border-dashed rounded-xl cursor-pointer hover:bg-muted/10 transition relative",
                                            disabled &&
                                                "opacity-50 cursor-not-allowed",
                                            labelClass,
                                        )}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => {
                                            e.preventDefault()
                                            if (!disabled)
                                                handleFiles(
                                                    e.dataTransfer.files,
                                                )
                                        }}
                                    >
                                        <div className="w-12 h-12 flex items-center justify-center rounded-full shadow-[var(--photo-upload-icon-shadow)]">
                                            <IconFileExport />
                                        </div>
                                        <span className="text-sm mt-1 text-gray-500 px-2">
                                            Drop your files here
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            Max File Size: {maxSizeMB} MB
                                        </span>
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* ===== Desktop (≥ md) — grid ===== */}
                        <div
                            className={cn(
                                "hidden md:grid gap-4",
                                desktopGrid ?? "grid-cols-3",
                            )}
                        >
                            {fileList.map(({ file, id }) => (
                                <div
                                    key={id}
                                    className={cn(
                                        "relative w-full h-[170px] bg-muted/40 rounded-xl overflow-hidden border flex flex-col items-center justify-center text-center px-4",
                                        fileListClassName,
                                    )}
                                >
                                    {getIcon(file)}
                                    <p className="font-semibold mt-2 max-w-full truncate">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground truncate">
                                        {file.type}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatBytes(file.size)}
                                    </p>

                                    <button
                                        type="button"
                                        className="w-12 h-12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-(--transparent-bg) rounded-full p-1 shadow hover:bg-red-100 transition flex items-center justify-center"
                                        onClick={() => handleRemove(id)}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>
                            ))}

                            {/* Upload tile (desktop) */}
                            {(!maxCount || fileList.length < maxCount) && (
                                <label
                                    htmlFor={`file-input-${String(name)}`}
                                    className={cn(
                                        "flex flex-col items-center justify-center w-full h-[170px] border border-dashed rounded-xl cursor-pointer hover:bg-muted/10 transition relative",
                                        disabled &&
                                            "opacity-50 cursor-not-allowed",
                                        labelClass,
                                    )}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        e.preventDefault()
                                        if (!disabled)
                                            handleFiles(e.dataTransfer.files)
                                    }}
                                >
                                    <div className="w-12 h-12 flex items-center justify-center rounded-full shadow-[var(--photo-upload-icon-shadow)]">
                                        <IconFileExport />
                                    </div>
                                    <span className="text-sm mt-1 text-gray-500 px-2">
                                        Drop your files here
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
