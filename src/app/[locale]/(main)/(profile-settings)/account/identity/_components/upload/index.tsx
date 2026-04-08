"use client"

import { IconTrash } from "@/assets/icons/trash"
import { IconUpload } from "@/assets/icons/upload"
import ClientImg from "@/components/common/client-img"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { useRequest } from "@/hooks/react-query/use-request"
import { API } from "@/lib/constants/api-endpoints"
import { cn } from "@/lib/utils/shadcn"
import { Camera } from "lucide-react"
import { useTranslations } from "next-intl"
import React, { useRef, useState } from "react"
import { toast } from "sonner"

interface UploadImgProps {
    onSuccessBanner?: (banner_img: string) => void
    onSuccessProfile?: (profile_img: string) => void
}

const Upload = ({ onSuccessBanner, onSuccessProfile }: UploadImgProps) => {
    const t = useTranslations()
    const { data } = useProfileQuery()
    const [banner, setBanner] = useState<string | null>(null)
    const [avatar, setAvatar] = useState<string | null>(null)

    const bannerInputRef = useRef<HTMLInputElement | null>(null)
    const avatarInputRef = useRef<HTMLInputElement | null>(null)

    const { post } = useRequest()

    const handleBannerChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0]

        if (file) {
            const formData = new FormData()
            formData.append("file", file, file.name)
            post(API.EXTRA.MEDIA, formData, {
                onSuccess: (res) => {
                    if (res.file) {
                        onSuccessBanner?.(res.file)
                    }
                    setBanner(URL.createObjectURL(file))
                },
                onError: () => {
                    toast.error(t("someThingWrong"))
                },
            })
        }
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const formData = new FormData()
            formData.append("file", file, file.name)
            post(API.EXTRA.MEDIA, formData, {
                onSuccess: (res) => {
                    if (res.file) {
                        onSuccessProfile?.(res.file)
                    }
                    setAvatar(URL.createObjectURL(file))
                },
                onError: () => {
                    toast.error(t("someThingWrong"))
                },
            })
        }
    }

    const resetAvatar = () => {
        setAvatar(null)
        if (avatarInputRef.current) avatarInputRef.current.value = ""
    }

    const resetBanner = () => {
        setBanner(null)
        if (bannerInputRef.current) bannerInputRef.current.value = ""
    }

    return (
        <div className="w-full space-y-6">
            <div
                className={cn(
                    "relative w-full clamp-[h,110px,250px] rounded-md bg-(--stroke-gray) flex items-center justify-center overflow-hidden",
                )}
            >
                {banner || data?.banner_image ?
                    <ClientImg
                        key={banner || data?.banner_image}
                        src={banner || data?.banner_image}
                        alt="Banner"
                        priority
                        className="object-cover"
                        wrapperClassName="w-full h-full"
                    />
                :   <div className="flex flex-col items-center text-muted-foreground text-sm">
                        <IconUpload className="mb-4" />
                        <span className="hidden sm:inline text-(--text-400) text-sm font-semibold">
                            <ClientTranslate translationKey="uploadYourBanner" />
                        </span>
                        <span className="hidden sm:inline text-xs text-(--text-300) mt-1">
                            <ClientTranslate translationKey="recommendedSize" />
                        </span>
                    </div>
                }

                <input
                    ref={bannerInputRef}
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleBannerChange}
                />

                {!banner && (
                    <Button
                        variant="secondary"
                        onClick={() => bannerInputRef.current?.click()}
                        className={cn(
                            "absolute bg-white rounded-2 flex items-center gap-1.5",
                            "h-8 px-3 text-xs sm:h-11 sm:px-5 sm:text-sm",
                            "right-2 bottom-2 sm:right-4 sm:bottom-4",
                        )}
                    >
                        <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="text-(--text-800)">
                            <ClientTranslate translationKey="chooseFromMyFile" />
                        </span>
                    </Button>
                )}

                {banner && (
                    <div className="sm:hidden absolute right-2 bottom-2 z-10 flex items-center gap-2">
                        <button
                            aria-label="Remove banner"
                            onClick={resetBanner}
                            className="
                                p-1 rounded-[2px] bg-white
                                ring-1 ring-(--card-border) transition
                            "
                        >
                            <IconTrash className="w-5 h-5" />
                        </button>

                        <Button
                            variant="secondary"
                            onClick={() => bannerInputRef.current?.click()}
                            className="
                                bg-white rounded-2 flex items-center gap-1.5
                                h-8 px-3 text-tiny leading-none
                            "
                        >
                            <Camera className="w-3.5 h-3.5" />
                            <span className="text-(--text-800)">
                                <ClientTranslate translationKey="chooseFromMyFile" />
                            </span>
                        </Button>
                    </div>
                )}

                {banner && (
                    <>
                        <Button
                            variant="secondary"
                            onClick={() => bannerInputRef.current?.click()}
                            className={cn(
                                "hidden sm:flex absolute bg-white rounded-2 items-center gap-1.5",
                                "right-4",
                                "bottom-4 md:bottom-18",
                            )}
                        >
                            <Camera className="w-4 h-4" />
                            <span className="text-(--text-800) text-sm">
                                <ClientTranslate translationKey="chooseFromMyFile" />
                            </span>
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={resetBanner}
                            className="hidden sm:flex absolute bottom-4 right-4 rounded-2 bg-white items-center gap-1 w-50"
                        >
                            <IconTrash />
                            <span className="text-(--text-800) text-sm">
                                <ClientTranslate translationKey="removeBanner" />
                            </span>
                        </Button>
                    </>
                )}
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden border">
                        {avatar || data?.profile_image ?
                            <ClientImg
                                key={avatar || data?.profile_image}
                                src={avatar || data?.profile_image}
                                alt="Avatar"
                                priority
                                className="w-full h-full object-cover"
                            />
                        :   <div className="flex items-center justify-center text-2xl w-full h-full bg-gray-100 uppercase">
                                {data?.first_name?.slice(0, 1)}
                                {data?.last_name?.slice(0, 1)}
                            </div>
                        }
                    </div>
                    <input
                        ref={avatarInputRef}
                        type="file"
                        accept="image/png, image/jpeg, image/gif"
                        className="hidden"
                        onChange={handleAvatarChange}
                    />
                </div>
                <div className="space-x-3 clamp-[text,xs,sm]">
                    <Button
                        className="text-white rounded-md"
                        onClick={() => avatarInputRef.current?.click()}
                    >
                        <ClientTranslate translationKey="uploadPhoto" />
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={resetAvatar}
                        className="text-(--secondary-main) rounded-md"
                    >
                        <ClientTranslate translationKey="reset" />
                    </Button>
                    <p className="text-xs mt-4 text-(--text-secondary) opactiy-70">
                        <ClientTranslate translationKey="allowedJpg" />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Upload
