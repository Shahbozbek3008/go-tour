"use client"

import { IconArrowRight2 } from "@/assets/icons/arrow-right2"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { useModal } from "@/hooks/use-modal"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { cn } from "@/lib/utils/shadcn"
import { useOutreachHubItemForm } from "../_hooks/use-outreach-hub-item-form"
import { Cancel } from "./cancel"

export default function Actions() {
    const { isArabic } = useLanguage()
    const { openModal } = useModal(MODAL_KEYS.OUTREACH_HUB_CANCEL_MODAL)
    const {
        methods: { formState },
    } = useOutreachHubItemForm()

    return (
        <div className="flex flex-col md:flex-row items-center justify-center clamp-[gap,2.5,6]">
            <Button
                size="lg"
                className="w-full md:w-auto bg-(--primary-16-light) hover:bg-(--primary-16-light) text-primary h-12"
                onClick={openModal}
            >
                <ClientTranslate translationKey="cancel" />
            </Button>
            <Button
                type="submit"
                size="lg"
                className="h-12 w-full md:w-auto"
                variant={"gradient2"}
                disabled={!formState.isValid}
            >
                <ClientTranslate translationKey="seePreview" />{" "}
                <IconArrowRight2 className={cn(isArabic && "rotate-180")} />
            </Button>
            <Cancel />
        </div>
    )
}
