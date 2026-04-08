"use client"
import ClientImg from "@/components/common/client-img"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { API } from "@/lib/constants/api-endpoints"
import { Camera } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"
import { useProfileBusinessQuery } from "../use-profile-business-query"

export default function UploadLogo({
    onSuccess,
}: {
    onSuccess: (file: string) => void
}) {
    const { data } = useProfileBusinessQuery()
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
        <div className="w-full flex flex-col lg:flex-row lg:items-center gap-6 mt-4">
            <div className="w-25 h-25 flex items-center justify-center rounded-full border border-[#e8e8e8]">
                {data?.company_image || file ?
                    <ClientImg
                        src={
                            data?.company_image ||
                            (file ? URL.createObjectURL(file) : null)
                        }
                        className="w-full h-full rounded-full"
                        alt="logo"
                    />
                :   <Camera color="#a2a2a2" />}
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        onClick={() => inputRef.current?.click()}
                        className="font-medium px-5 rounded-md"
                    >
                        <ClientTranslate translationKey="uploadNewPhoto" />
                    </Button>
                    <Button
                        onClick={handleClearFile}
                        variant="secondary"
                        className="font-medium px-5 text-(--secondary-main) rounded-md"
                    >
                        <ClientTranslate translationKey="reset" />
                    </Button>
                    <input
                        ref={inputRef}
                        className="w-full hidden"
                        accept="image/*"
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                    />
                </div>
                <p className="text-sm text-text-secondary/70">
                    Allowed JPG, GIF or PNG. Max size of 2MB
                </p>
            </div>
        </div>
    )
}
