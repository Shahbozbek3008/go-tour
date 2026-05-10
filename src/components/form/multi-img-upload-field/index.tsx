"use client"

import { IconImageUpload } from "@/assets/icons/image-upload"
import { IconImageUpload2 } from "@/assets/icons/image-upload2"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import * as Sortable from "@/components/ui/sortable"
import { useRequest } from "@/hooks/react-query/use-request"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { cn } from "@/lib/utils/shadcn"
import { MediaResponse } from "@/types/common/extra"
import { useTranslations } from "next-intl"
import { ReactNode, useState } from "react"
import Dropzone, { type DropzoneProps } from "react-dropzone"
import {
    FieldValues,
    Path,
    useController,
    UseFormReturn,
} from "react-hook-form"
import { Card } from "../../ui/card"
import ErrorMessage from "../../ui/error-message"
import { Label } from "../../ui/label"
import Spinner from "../../ui/spinner"
import { SortableImgItem } from "./sortable-img-item"

type TProps<Form extends FieldValues> = {
    methods: UseFormReturn<Form>
    name: Path<Form>
    alt: string
    label?: ReactNode
    labelClassName?: string
    required?: boolean
    showError?: boolean
    wrapperClassName?: string
    maxLength?: number
    maxSize?: number //MB
    dropzoneProps?: DropzoneProps
}

export default function MultiImgUploadField<TForm extends FieldValues>({
    methods,
    name,
    label,
    labelClassName,
    alt,
    required = false,
    showError = false,
    wrapperClassName,
    maxSize = 5, //MB
    maxLength = 10,
    dropzoneProps = {
        accept: {
            "image/*": [],
        },
    },
}: TProps<TForm>) {
    const t = useTranslations()
    const { control } = methods
    const [warnings, setWarnings] = useState<string[]>([])
    const {
        field: { onChange, disabled, ref, value },
        fieldState: { error },
    } = useController({
        control,
        name,
        rules: {
            validate: (val) => {
                let err = ""
                let valid = true

                if (required) {
                    if (!val || val.length === 0) {
                        err = t("imageUploadRequired")
                        valid = false
                    }
                }

                return valid || err
            },
        },
    })
    const fileArray = getArray(value) as string[]
    const max_size = maxSize * 1024 * 1024 + 1

    const { postAsync, isPending } = useRequest({
        options: {
            mutationKey: [API.EXTRA.MEDIA],
        },
    })

    function handleOnChange(files: File[]) {
        const expectedFilesLength = fileArray.length + files.length
        const sliceEndIndex =
            expectedFilesLength > maxLength ?
                maxLength - expectedFilesLength
            :   0
        if (sliceEndIndex) {
            setWarnings((prev) => [
                ...prev,
                t("theNumberOfImages") + ` ${maxLength}`,
            ])
        }
        const filesAfterMaxLengthValidation =
            sliceEndIndex ? files.slice(0, sliceEndIndex) : files

        filesAfterMaxLengthValidation.forEach(async (f) => {
            if (f.size < max_size) {
                const formData = new FormData()
                formData.append("file", f)
                await postAsync(API.EXTRA.MEDIA, formData, {
                    onSuccess: (res: MediaResponse) => {
                        onChange([...fileArray, res.file])
                    },
                })
            } else {
                setWarnings((prev) => [...prev, t("theImageMustNot")])
            }
        })
    }

    return (
        <fieldset
            className={cn(
                "flex flex-col gap-4 w-full bg-[#eef2ff] sm:bg-transparent p-4 sm:p-0 rounded-2xl",
                wrapperClassName,
            )}
        >
            <Label
                htmlFor={name}
                className={cn(
                    "justify-between hidden sm:flex",
                    !!error && "text-destructive",
                    labelClassName,
                )}
            >
                {label || (
                    <>
                        <div className="flex items-center gap-1 text-lg font-medium text-foreground">
                            {required && (
                                <>
                                    <span className="text-destructive">*</span>
                                </>
                            )}
                            <ClientTranslate translationKey="photoUpload" />
                        </div>
                        <p className="text-sm text-text-500">
                            <ClientTranslate translationKey="uploadUpTo" />{" "}
                            {maxLength}{" "}
                            <ClientTranslate translationKey="filesEachOne" />{" "}
                            {maxSize}{" "}
                            <ClientTranslate translationKey="mbOrLess" />
                        </p>
                    </>
                )}
            </Label>
            <Sortable.Root
                value={fileArray}
                onValueChange={(items) => onChange(items)}
                getItemValue={(item) => item}
                orientation="mixed"
            >
                <Dropzone
                    onDrop={handleOnChange}
                    disabled={disabled || isPending}
                    ref={ref}
                    {...dropzoneProps}
                    multiple
                >
                    {({ getRootProps, getInputProps }) => (
                        <div
                            className="sm:hidden cursor-pointer rounded-xl border-solid sm:border-dashed sm:border-2 sm:border-border bg-white sm:bg-transparent
                           flex flex-col items-center justify-center gap-2
                           w-full py-6"
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <div className="sm:hidden rounded-full bg-[#eef2ff] relative w-11 h-11">
                                <IconImageUpload2
                                    width={24}
                                    height={24}
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                />
                            </div>
                            <IconImageUpload
                                width={32}
                                height={32}
                                className="hidden sm:block"
                            />
                            <p className="px-4 flex flex-col flex-wrap items-center justify-center text-center gap-2 text-xs">
                                <ClientTranslate translationKey="selectPhotoToUpload" />
                                <span>
                                    <ClientTranslate translationKey="uploadUpTo" />{" "}
                                    {maxLength}{" "}
                                    <ClientTranslate translationKey="filesEachOne" />{" "}
                                    {maxSize}{" "}
                                    <ClientTranslate translationKey="mbOrLess" />
                                </span>
                            </p>
                            <Button className="rounded-[20px]">
                                <ClientTranslate translationKey="selectPhoto" />
                            </Button>
                        </div>
                    )}
                </Dropzone>

                <Sortable.Content className="grid clamp-[gap,2,4] grid-cols-4 sm:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))]">
                    {fileArray.map((f, i) => (
                        <SortableImgItem
                            key={i}
                            item={{ value: f, index: i }}
                            files={fileArray}
                            alt={alt}
                            setFiles={onChange}
                        />
                    ))}

                    {isPending && (
                        <Card className="grid place-items-center">
                            <Spinner />
                        </Card>
                    )}

                    <Dropzone
                        onDrop={handleOnChange}
                        disabled={disabled || isPending}
                        ref={ref}
                        {...dropzoneProps}
                        multiple
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div
                                className="hidden sm:flex cursor-pointer rounded-xl border-dashed border-2 border-border
                               flex-col items-center justify-center gap-2 aspect-square"
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <p className="px-4 flex flex-wrap items-center justify-center text-center gap-2 text-xs">
                                    <IconImageUpload />
                                    <ClientTranslate translationKey="dragDropSomeFiles" />
                                </p>
                            </div>
                        )}
                    </Dropzone>
                </Sortable.Content>

                <Sortable.Overlay>
                    {(activeItem) => {
                        const f = fileArray.find(
                            (item) => item === activeItem.value,
                        )
                        if (!f) return null
                        return (
                            <SortableImgItem
                                item={{ value: f }}
                                files={fileArray}
                                alt={alt}
                                setFiles={onChange}
                            />
                        )
                    }}
                </Sortable.Overlay>
            </Sortable.Root>

            {warnings.length > 0 && (
                <ErrorMessage className="text-warning">
                    {warnings.map((w) => w + "; ")}
                </ErrorMessage>
            )}
            {!!error && showError && (
                <ErrorMessage>
                    {error.message || error.root?.message}
                </ErrorMessage>
            )}
        </fieldset>
    )
}
