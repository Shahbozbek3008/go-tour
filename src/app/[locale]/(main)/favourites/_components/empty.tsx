import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useRouter } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { motion } from "framer-motion"
import { SearchX } from "lucide-react"

export const EmptyFavourites = () => {
    const router = useRouter()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center justify-center py-16 md:py-24 px-6 text-center bg-white"
        >
            <div className="relative mb-6">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-50/50 rounded-full flex items-center justify-center animate-pulse">
                    <SearchX className="w-10 h-10 md:w-12 md:h-12 text-blue-500/40" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-zinc-50">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-[12px] font-bold">
                            !
                        </span>
                    </div>
                </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-2 tracking-tight">
                <ClientTranslate translationKey="empty_favourites_title" />
            </h3>

            <p className="text-zinc-500 text-sm md:text-base max-w-[320px] md:max-w-[400px] leading-relaxed mb-8">
                <ClientTranslate translationKey="empty_favourites_description" />
            </p>

            <Button
                size="lg"
                onClick={() =>
                    router.push(
                        getHref({
                            pathname: "/[locale]",
                        }),
                    )
                }
                className="rounded-2xl px-8 py-4"
            >
                <ClientTranslate translationKey="go_home" />
            </Button>
        </motion.div>
    )
}
