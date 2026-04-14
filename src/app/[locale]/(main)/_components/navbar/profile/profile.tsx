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
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useRouter } from "@/i18n/navigation"
import { ClientTokenService } from "@/lib/cookies/client-token-service"
import { getHref } from "@/lib/utils/get-href"

export const Profile = () => {
    const { data } = useProfileQuery()
    const { queryClient } = useRevalidate()
    const router = useRouter()

    const handleLogout = () => {
        ClientTokenService.removeAccessToken()
        ClientTokenService.removeRefreshToken()
        queryClient.clear()
        router.replace(getHref({ pathname: "/[locale]" }))
        router.refresh()
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-full relative p-0.5 border border-transparent bg-[#f4f4f4]"
                >
                    <AvatarImageProfile
                        src={data?.data?.userProfile?.imageUrl || ""}
                        first_name={data?.data?.userProfile?.fullName}
                        last_name={data?.data?.userProfile?.fullName}
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
                        <span className="text-sm font-semibold leading-tight"></span>
                        <div className="!w-8 !h-8 relative">
                            <AvatarImageProfile
                                wrapperClassName="!w-8 !h-8 rounded-full"
                                src={data?.data?.userProfile?.imageUrl || ""}
                                first_name={data?.data?.userProfile?.fullName}
                                last_name={data?.data?.userProfile?.fullName}
                                className="object-cover"
                                fallbackClassName="text-foreground uppercase"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-semibold leading-tight">
                                {data?.data?.userProfile?.fullName}
                            </p>
                        </div>
                    </div>
                </div>

                <DropdownMenuItem
                    className="gap-2 py-2 px-3 text-sm"
                    onClick={() =>
                        router.push(
                            getHref({
                                pathname: "/[locale]/profile/[slug]/my-account",
                                query: { slug: "me" },
                            }),
                        )
                    }
                >
                    <IconProfileUser className="w-5 h-5" />
                    <ClientTranslate translationKey="myProfile" />
                </DropdownMenuItem>

                <DropdownMenuItem className="p-0 mt-2">
                    <Button
                        onClick={handleLogout}
                        variant={"destructive"}
                        className="w-full"
                        size="lg"
                    >
                        <ClientTranslate translationKey="logout" />
                        <IconLogout />
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
