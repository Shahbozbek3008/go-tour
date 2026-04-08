"use client"

import { IconInfoCircle } from "@/assets/icons/info-circle"
import Modal from "@/components/common/modal"
import ClientTranslate from "@/components/common/translation/client-translate"
import CheckboxField from "@/components/form/checkbox-field"
import SelectField from "@/components/form/select-field"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useModal } from "@/hooks/use-modal"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { VISIBILITY_TYPE_OPTIONS } from "@/lib/constants/visibilty-type-options"
import { useTranslations } from "next-intl"
import { useInvestmentForm } from "../../_hooks/use-investment-form"
import MyConnections from "./my-connections"

const VisibilitySettings = () => {
    const t = useTranslations()
    const { methods, visibilityPermissionUsersIds, visibilityType } =
        useInvestmentForm()

    const { openModal } = useModal(MODAL_KEYS.VISIBILITY_SETTINGS)

    return (
        <div className="grid grid-cols-2 gap-10 items-center">
            <SelectField
                labelClassName="text-lg text-text-900 font-medium"
                methods={methods}
                name="visibility_type"
                label={
                    t("visibilitySettings") +
                    `${visibilityType === "manual" ? `(${visibilityPermissionUsersIds.length}` + t("connectionsSelected") + ")" : ""}`
                }
                options={VISIBILITY_TYPE_OPTIONS}
                onValueChange={(opt) => {
                    if (opt?.id === "manual") {
                        openModal()
                    } else {
                        methods.setValue("visible_connections", [])
                    }
                }}
                getOptionLabel={(opt) => t(opt.name)}
            />
            <div className="flex items-center gap-2 mt-5">
                <CheckboxField
                    methods={methods}
                    name="is_anonymous"
                    label={t("anonymousUser")}
                    wrapperClassName="w-auto"
                />
                <Tooltip>
                    <TooltipTrigger>
                        <IconInfoCircle />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-60 bg-misc-snackbar text-background [&_svg]:bg-misc-snackbar [&_svg]:fill-transparent">
                        <ClientTranslate translationKey="otherUsersWillNotSee" />
                    </TooltipContent>
                </Tooltip>
            </div>
            <Modal
                className="sm:max-w-7xl"
                modalKey={MODAL_KEYS.VISIBILITY_SETTINGS}
                onClose={() => {
                    if (visibilityType === "manual") {
                        if (!visibilityPermissionUsersIds.length) {
                            methods.setValue("visibility_type", "public")
                        }
                    }
                }}
            >
                <MyConnections />
            </Modal>
        </div>
    )
}

export default VisibilitySettings
