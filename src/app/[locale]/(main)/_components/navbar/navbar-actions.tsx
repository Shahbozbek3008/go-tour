import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/shadcn"
import { Heart } from "lucide-react"
import { LanguageSwitcher } from "../language-switcher"
import { NavList } from "./nav-list"
import { Profile } from "./profile"

interface NavbarActionsProps {
    isTransparent: boolean
    isAuthenticated: boolean
    menuOpen: boolean
    onMenuToggle: (open: boolean) => void
    onHeartClick: () => void
    onSignInClick: () => void
}

function NavDivider({ isTransparent }: { isTransparent: boolean }) {
    return (
        <span
            className={cn(
                "w-px h-5 shrink-0",
                isTransparent ? "bg-white/20" : "bg-zinc-200",
            )}
        />
    )
}

export function NavbarActions({
    isTransparent,
    isAuthenticated,
    menuOpen,
    onMenuToggle,
    onHeartClick,
    onSignInClick,
}: NavbarActionsProps) {
    return (
        <div className="flex items-center gap-1">
            <LanguageSwitcher isTransparent={isTransparent} />

            <NavDivider isTransparent={isTransparent} />

            <button
                onClick={onHeartClick}
                className={cn(
                    "w-9 h-9 rounded-[10px] flex items-center justify-center",
                    "transition-colors duration-150 focus-visible:outline-none",
                    isTransparent ?
                        "text-white/80 hover:bg-white/12 hover:text-white"
                    :   "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800",
                )}
            >
                <Heart className="w-5 h-5" strokeWidth={1.8} />
            </button>

            <NavDivider isTransparent={isTransparent} />

            {isAuthenticated ?
                <Profile />
            :   <Button
                    size="sm"
                    onClick={onSignInClick}
                    className={cn(
                        "hidden md:flex h-9 px-4 rounded-[10px] text-[13px] font-medium transition-all",
                        isTransparent ?
                            "bg-white/18 hover:bg-white/28 text-white border border-white/30 backdrop-blur-md shadow-none"
                        :   "bg-blue-600 hover:bg-blue-700 text-white shadow-none",
                    )}
                >
                    <ClientTranslate translationKey="signIn" />
                </Button>
            }

            <NavList
                menuOpen={menuOpen}
                onMenuToggle={onMenuToggle}
                isTransparent={isTransparent}
            />
        </div>
    )
}
