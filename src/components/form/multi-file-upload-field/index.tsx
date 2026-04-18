"use client"

import { IconFileExport } from "@/assets/icons/file-export"
import { IconFileExport2 } from "@/assets/icons/file-export2"
import ClientTranslate from "@/components/common/translation/client-translate"
import Group from "@/components/semantic/group"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { cn } from "@/lib/utils/shadcn"
import { DocumentPayload, MediaResponse } from "@/types/common/extra"
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
import FileItem from "./file-item"

type TProps<Form extends FieldValues> = {
    methods: UseFormReturn<Form>
    name: Path<Form>
    label?: ReactNode
    labelClassName?: string
    required?: boolean
    showError?: boolean
    wrapperClassName?: string
    maxLength?: number
    maxSize?: number //MB
    dropzoneProps?: DropzoneProps
    ndaAccess?: boolean
}

export default function MultiFileUploadField<TForm extends FieldValues>({
    methods,
    name,
    label,
    labelClassName,
    required = false,
    showError = false,
    wrapperClassName,
    maxSize = 30, //MB
    maxLength = 5,
    dropzoneProps,
    ndaAccess,
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
                        err = t("fileUploadRequired")
                        valid = false
                    }
                }

                return valid || err
            },
        },
    })
    const fileArray = getArray(value) as DocumentPayload[]
    const maxByteSize = maxSize * 1024 * 1024 + 1

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
                t("theNumberOfFiles") + ` ${maxLength}`,
            ])
        }
        const filesAfterMaxLengthValidation =
            sliceEndIndex ? files.slice(0, sliceEndIndex) : files

        filesAfterMaxLengthValidation.forEach(async (f) => {
            if (f.size < maxByteSize) {
                const formData = new FormData()
                formData.append("file", f)
                await postAsync(API.EXTRA.MEDIA, formData, {
                    onSuccess: (res: MediaResponse) => {
                        const doc: DocumentPayload = {
                            document_url: res.file,
                            name: f.name,
                            size: f.size,
                            only_invites_allow: ndaAccess ? false : undefined,
                        }

                        onChange([...fileArray, doc])
                    },
                })
            } else {
                setWarnings((prev) => [...prev, t("theFileMustNot")])
            }
        })
    }

    return (
        <fieldset
            className={cn(
                "flex flex-col gap-4 w-full bg-[#EEF2FF] sm:bg-transparent p-4 sm:p-0 rounded-2xl",
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
                        <div className="text-lg font-medium text-foreground">
                            {required && (
                                <span className="text-destructive">*</span>
                            )}
                            <ClientTranslate translationKey="fileUpload" />
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

            <Dropzone
                onDrop={(files) => {
                    handleOnChange(files)
                }}
                disabled={disabled || isPending}
                ref={ref}
                {...dropzoneProps}
                multiple
            >
                {({ getRootProps, getInputProps }) => (
                    <div
                        className="sm:hidden w-full cursor-pointer rounded-xl border-solid sm:border-dashed sm:border-2 sm:border-border bg-white sm:bg-transparent
                            flex flex-col items-center justify-center gap-2 py-6"
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <div className="sm:hidden rounded-full bg-[#eef2ff] relative w-11 h-11">
                            <IconFileExport2
                                width={24}
                                height={24}
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            />
                        </div>
                        <IconFileExport
                            width={32}
                            height={32}
                            className="[&_path]:fill-muted-foreground hidden sm:block"
                        />
                        <p className="px-4 flex flex-wrap items-center justify-center text-center gap-2 text-xs">
                            <ClientTranslate translationKey="dragDropSomeFiles" />
                        </p>
                        <Button className="rounded-[20px]">
                            <ClientTranslate translationKey="selectFile" />
                        </Button>
                    </div>
                )}
            </Dropzone>

            <Group className="grid grid-cols-4 sm:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] clamp-[gap,2,4]">
                {fileArray.map((f, i) => {
                    return (
                        <FileItem
                            key={f.document_url}
                            files={fileArray}
                            item={f}
                            setFiles={onChange}
                            ndaAccess={ndaAccess}
                            index={i}
                        />
                    )
                })}
                {isPending && (
                    <Card className="grid place-items-center">
                        <Spinner />
                    </Card>
                )}
                <Dropzone
                    onDrop={(files) => {
                        handleOnChange(files)
                    }}
                    disabled={disabled || isPending}
                    ref={ref}
                    {...dropzoneProps}
                    multiple
                >
                    {({ getRootProps, getInputProps }) => (
                        <div
                            className="hidden sm:flex aspect-square cursor-pointer rounded-xl border-dashed border-2 border-border
                                flex-col items-center justify-center gap-2"
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <p className="px-4 flex flex-wrap items-center justify-center text-center gap-2 text-xs">
                                <IconFileExport
                                    width={32}
                                    height={32}
                                    className="[&_path]:fill-muted-foreground"
                                />
                                <ClientTranslate translationKey="dragDropSomeFiles" />
                            </p>
                        </div>
                    )}
                </Dropzone>
            </Group>

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
