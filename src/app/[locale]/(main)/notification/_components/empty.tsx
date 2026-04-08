import { IconEmptyNotification } from "@/assets/icons/empty-notification"
import ClientTranslate from "@/components/common/translation/client-translate"

export default function Empty() {
    return (
        <div className="flex flex-col items-center justify-center my-[10%]">
            <IconEmptyNotification />
            <p className="text-primary clamp-[text,xl,2xl] font-semibold mt-4">
                <ClientTranslate translationKey="noNotificationsMoment" />
            </p>
            <p className="text-text-400 mt-2 text-center md:text-start">
                <ClientTranslate translationKey="thereIsNothingNew" />
            </p>
        </div>
    )
}
