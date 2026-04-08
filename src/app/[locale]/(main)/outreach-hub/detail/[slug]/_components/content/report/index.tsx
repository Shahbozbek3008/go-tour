"use client"

import { IconBlock } from "@/assets/icons/block"
import { IconBlockActive } from "@/assets/icons/block-active"
import { IconBrokenHeart } from "@/assets/icons/broken-heart"
import { IconBrokenHeartActive } from "@/assets/icons/broken-heart-active"
import { IconCloseShop } from "@/assets/icons/close-shop"
import { IconCloseShopActive } from "@/assets/icons/close-shop-active"
import { IconDisLike } from "@/assets/icons/dislike"
import { IconDisLikeActive } from "@/assets/icons/dislike-active"
import { IconEye } from "@/assets/icons/eye"
import { IconEyeActive } from "@/assets/icons/eye-active"
import { IconFileWarning } from "@/assets/icons/file-warning"
import { IconFileWarningActive } from "@/assets/icons/file-warning-active"
import { IconHand } from "@/assets/icons/hand"
import { IconHandActive } from "@/assets/icons/hand-active"
import { IconProtector } from "@/assets/icons/protector"
import { IconProtectorActive } from "@/assets/icons/protector-active"
import { IconReportFlag } from "@/assets/icons/report-flag"
import Modal from "@/components/common/modal"
import ClientTranslate from "@/components/common/translation/client-translate"
import { TranslationKey } from "@/components/common/translation/types"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRequest } from "@/hooks/react-query/use-request"
import { useModal } from "@/hooks/use-modal"
import { API } from "@/lib/constants/api-endpoints"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { cn } from "@/lib/utils/shadcn"
import React, { useState } from "react"
import { useOutreachhubItemQuery } from "../../../_hooks/use-outreachhub-item-query"

type ReportKey =
    | "dont_like"
    | "bullying"
    | "suicide"
    | "violence"
    | "sale_or_promotion"
    | "nudity"
    | "false_info"
    | "fraud"

interface ReportOption {
    label: TranslationKey
    value: ReportKey
    Icon: React.ReactNode
    IconActive: React.ReactNode
}

const reportOptions: ReportOption[] = [
    {
        label: "iDontLike",
        value: "dont_like",
        Icon: <IconDisLike />,
        IconActive: <IconDisLikeActive />,
    },
    {
        label: "bullyingOrUnwanted",
        value: "bullying",
        Icon: <IconProtector />,
        IconActive: <IconProtectorActive />,
    },
    {
        label: "suicideSelfHarm",
        value: "suicide",
        Icon: <IconBrokenHeart />,
        IconActive: <IconBrokenHeartActive />,
    },
    {
        label: "violenceHateOr",
        value: "violence",
        Icon: <IconHand />,
        IconActive: <IconHandActive />,
    },
    {
        label: "saleOrPromotion",
        value: "sale_or_promotion",
        Icon: <IconCloseShop />,
        IconActive: <IconCloseShopActive />,
    },
    {
        label: "nudityOrSexual",
        value: "nudity",
        Icon: <IconEye />,
        IconActive: <IconEyeActive />,
    },
    {
        label: "falseInfo",
        value: "false_info",
        Icon: <IconFileWarning />,
        IconActive: <IconFileWarningActive />,
    },
    {
        label: "fraudScam",
        value: "fraud",
        Icon: <IconBlock />,
        IconActive: <IconBlockActive />,
    },
]

export const Report = () => {
    return (
        <Modal modalKey={MODAL_KEYS.REPORT_MODAL} className="p-0">
            <Content />
        </Modal>
    )
}

const Content = () => {
    const { data } = useOutreachhubItemQuery()
    const [selected, setSelected] = useState<ReportKey | null>(null)
    const { closeModal } = useModal(MODAL_KEYS.REPORT_MODAL)
    const { post } = useRequest()
    const { openModal: openNotifyModal } = useModal(
        MODAL_KEYS.SUCCESS_NOTIFY_MODAL,
    )

    const handleSubmit = () => {
        if (!selected) return

        post(
            API.OUT_REACH_HUB.REPORT_FUNDRAISER_SLUG.replace(
                "{slug}",
                data?.slug || "",
            ),
            { report_type: selected },
            {
                onSuccess: () => {
                    setSelected(null)
                    closeModal()
                    openNotifyModal()
                },
            },
        )
    }

    return (
        <div className="max-w-full rounded-lg">
            <h2 className="mb-4 text-lg font-semibold text-center mt-6">
                <ClientTranslate translationKey="reportFundraiser" />
            </h2>

            <RadioGroup
                value={selected ?? ""}
                onValueChange={(v) => setSelected(v as ReportKey)}
                className="gap-0"
            >
                {reportOptions.map((option) => {
                    const isActive = selected === option.value
                    return (
                        <label
                            key={option.value}
                            className={cn(
                                "flex cursor-pointer items-center gap-4 justify-between px-6 py-2.5 text-lg font-medium border-t border-gray-300",
                                isActive && "bg-(--primary-8-lighter)",
                            )}
                        >
                            {isActive ? option.IconActive : option.Icon}
                            <span
                                className={cn(
                                    "flex-1",
                                    isActive && "text-primary",
                                )}
                            >
                                <ClientTranslate
                                    translationKey={option.label}
                                />
                            </span>
                            <RadioGroupItem
                                value={option.value}
                                className="w-6 h-6"
                            />
                        </label>
                    )
                })}
            </RadioGroup>

            {selected && (
                <div className="p-6">
                    <Button
                        className="w-full bg-(--error-100) hover:bg-(--error-100) font-semibold text-(--error-500)"
                        onClick={handleSubmit}
                    >
                        <IconReportFlag stroke="var(--error-500)" />{" "}
                        <ClientTranslate translationKey="submitReport" />
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Report
