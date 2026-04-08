"use client"

import { IconLogout } from "@/assets/icons/logout"
import IconProfileUser from "@/assets/icons/profile-user"
import AvatarImageProfile from "@/components/common/avatar-image"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { ClientTokenService } from "@/lib/cookies/client-token-service"
import { getHref } from "@/lib/utils/get-href"
import { Settings } from "lucide-react"

interface Props {
    blur?: boolean
}

const Profile = ({ blur }: Props) => {
    const { data } = useProfileQuery()
    const { queryClient } = useRevalidate()
    const router = useRouter()
    const { post, isPending } = useRequest()

    const handleLogout = () => {
        const refreshToken = ClientTokenService.getRefreshToken()
        post(
            API.AUTH.LOGOUT,
            { refresh_token: refreshToken },
            {
                onSuccess: () => {
                    ClientTokenService.removeAccessToken()
                    ClientTokenService.removeRefreshToken()
                    queryClient.clear()
                    window.location.href = getHref({ pathname: "/[locale]" })
                },
            },
        )
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="gradient"
                    size="icon"
                    className="w-9 h-9 rounded-full relative p-0.5"
                >
                    {!blur && (
                        <div className="absolute w-8 h-8 left-0 top-0 blur-md gradient-1 z-[-1]" />
                    )}
                    <AvatarImageProfile
                        src={data?.profile_image || ""}
                        first_name={data?.first_name}
                        last_name={data?.last_name}
                        wrapperClassName="!w-8 !h-8 rounded-full"
                        className="object-cover"
                        fallbackClassName="text-foreground uppercase"
                    />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-56 p-2 rounded-md shadow-lg bg-white text-gray-800"
                align="end"
            >
                <div className="px-2 pt-1 pb-3">
                    <div className="flex items-center space-x-2">
                        <div className="!w-8 !h-8 relative">
                            <AvatarImageProfile
                                wrapperClassName="!w-8 !h-8 rounded-full"
                                src={data?.profile_image || ""}
                                first_name={data?.first_name}
                                last_name={data?.last_name}
                                className="object-cover"
                                fallbackClassName="text-foreground uppercase"
                            />
                            {data?.chat_status === "online" && (
                                <div className="absolute w-3 h-3 right-0 bottom-0 flex items-center justify-center bg-background rounded-full">
                                    <div className="w-2 h-2 rounded-full bg-success" />
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-semibold leading-tight">
                                {data?.first_name} {data?.last_name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {data?.job_title}
                            </p>
                        </div>
                    </div>
                </div>

                <DropdownMenuItem
                    className="gap-2 py-2 px-3 text-sm"
                    onClick={() =>
                        router.push(
                            getHref({
                                pathname: "/[locale]/my-profile/[slug]/profile",
                                query: { slug: "me" },
                            }),
                        )
                    }
                >
                    <IconProfileUser className="w-5 h-5" />
                    <ClientTranslate translationKey="myProfile" />
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="gap-2 py-2 px-3 text-sm"
                    onClick={() =>
                        router.push(
                            getHref({
                                pathname: "/[locale]/account/identity",
                            }),
                        )
                    }
                >
                    <Settings className="size-4" />
                    <ClientTranslate translationKey="settings" />
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                    <Button
                        onClick={handleLogout}
                        variant={"destructive"}
                        className="w-full"
                        isLoading={isPending}
                    >
                        <ClientTranslate translationKey="logout" />
                        <IconLogout />
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Profile
