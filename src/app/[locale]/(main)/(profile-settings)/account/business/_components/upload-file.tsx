"use client"
import { IconFileExport } from "@/assets/icons/file-export"
import { useRequest } from "@/hooks/react-query/use-request"
import { API } from "@/lib/constants/api-endpoints"
import { Trash2 } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"

export default function UploadFile({
    onSuccess,
    label,
}: {
    onSuccess: (file: string) => void
    label?: string
}) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const { post } = useRequest()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
            const formData = new FormData()
            formData.append("file", e.target.files[0])
            post(API.EXTRA.MEDIA, formData, {
                onSuccess: (res) => {
                    if (res.file) {
                        onSuccess(res.file)
                        toast.success("File uploaded successfully")
                    }
                },
                onError: () => {
                    toast.error("Something went wrong")
                },
            })
        }
    }

    const handleClearFile = (e: React.MouseEvent) => {
        e.stopPropagation()
        setFile(null)
        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }

    return (
        <div>
            <p className="text-text-900 font-medium text-xs mb-1">{label}</p>
            <div
                onClick={() => inputRef.current?.click()}
                className="relative border-dashed border-2 border-text-200 p-4 w-[183px] h-[118px] rounded-[0.5rem] cursor-pointer flex flex-col items-center justify-center"
            >
                <div className="flex flex-col items-center gap-2">
                    <IconFileExport />
                    <span className="text-text-400 font-medium text-xs">
                        Upload File
                    </span>
                </div>

                {file && (
                    <div
                        onClick={handleClearFile}
                        className="absolute p-3 rounded-full bg-gray-300/40 top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 cursor-pointer hover:bg-gray-400/60"
                    >
                        <Trash2 className="text-red-500 w-5 h-5" />
                    </div>
                )}

                <input
                    ref={inputRef}
                    className="w-full hidden"
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    )
}
