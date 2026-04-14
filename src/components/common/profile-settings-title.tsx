import { cn } from "@/lib/utils/shadcn"
import ClientTranslate from "./translation/client-translate"

interface Props {
    className?: string
}

export default function ProfileSettingsTitle({ className }: Props) {
    return (
        <h3
            className={cn(
                "md:hidden text-lg font-medium text-black",
                className,
            )}
        >
            <ClientTranslate translationKey="profileSettings" />
        </h3>
    )
}
