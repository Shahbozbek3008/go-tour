"use client"

import { IconFileExport } from "@/assets/icons/file-export"
import { IconReportFlag } from "@/assets/icons/report-flag"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useModal } from "@/hooks/use-modal"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { getArray } from "@/lib/utils/get-array"
import { getFileExtension } from "@/lib/utils/get-file-extension"
import { cn } from "@/lib/utils/shadcn"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { useOutreachhubItemQuery } from "../../_hooks/use-outreachhub-item-query"
import { extensionIconMap } from "../../types/documents"
import DocumentItem from "./document-item"
import Organizer from "./organizer"
import Report from "./report"
import SuccessNotify from "./report/success-notify"
import Updates from "./updates"

interface Props {
    className?: string
}

const ProductContent = ({ className }: Props) => {
    const [isHidden, setIsHidden] = useState(false)
    const { data, isPreview } = useOutreachhubItemQuery()
    const { openModal } = useModal(MODAL_KEYS.REPORT_MODAL)
    const documents = getArray(data?.documents)
    const final_reports = getArray(data?.final_reports)

    return (
        <div className={cn("flex flex-col clamp-[gap,4,14]", className)}>
            <Organizer />
            <AnimatePresence>
                {!isHidden && (
                    <motion.div
                        key="documents"
                        initial={{ opacity: 0, maxHeight: 0 }}
                        animate={{ opacity: 1, maxHeight: 2000 }}
                        exit={{ opacity: 0, maxHeight: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col clamp-[gap,4,14] overflow-hidden"
                    >
                        <div className="flex flex-col gap-4">
                            <h4 className="clamp-[text,lg,xl] font-medium">
                                <ClientTranslate translationKey="documentReports" />
                            </h4>
                            {documents.length > 0 && (
                                <div className="flex flex-col md:flex-row md:flex-wrap gap-4 sm:gap-6">
                                    {documents.map((document, i) => {
                                        const Icon =
                                            extensionIconMap[
                                                getFileExtension(document.name)
                                            ] || IconFileExport
                                        return (
                                            <DocumentItem
                                                className="max-w-48 xsm:max-w-72 sm:max-w-100 md:max-w-58"
                                                key={document.id || i}
                                                document={{
                                                    ...document,
                                                    Icon,
                                                }}
                                            />
                                        )
                                    })}
                                </div>
                            )}
                        </div>

                        {final_reports.length > 0 && (
                            <div className="flex flex-col gap-4 bg-primary p-5">
                                <h4 className="clamp-[text,lg,xl] font-medium text-background">
                                    <ClientTranslate translationKey="finalReports" />
                                </h4>
                                <div className="flex flex-col md:flex-row md:flex-wrap gap-4 sm:gap-6">
                                    {final_reports.map((document) => {
                                        const Icon =
                                            extensionIconMap[
                                                getFileExtension(document.name)
                                            ] || IconFileExport
                                        return (
                                            <DocumentItem
                                                className="max-w-40 xsm:max-w-65 sm:max-w-100 md:max-w-58"
                                                key={document.id}
                                                document={{
                                                    ...document,
                                                    Icon,
                                                }}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col gap-4">
                <Button
                    size="lg"
                    className={cn(
                        "max-w-32",
                        isHidden ?
                            "text-primary bg-(--primary-8-lighter) hover:bg-(--primary-8-lighter)  border border-(--primary"
                        :   "bg-primary text-white",
                    )}
                    onClick={() => setIsHidden((prev) => !prev)}
                >
                    {isHidden ?
                        <ClientTranslate translationKey="showMore" />
                    :   <ClientTranslate translationKey="hideAll" />}
                </Button>

                <Separator />
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-text-900 md:text-(--error-500) hover:text-(--error-500) hover:bg-transparent text-left text-lg w-fit !px-[0px]"
                    onClick={() => {
                        if (isPreview) return
                        openModal()
                    }}
                >
                    <IconReportFlag className="md:[&_path]:stroke-[var(--error-500)]" />
                    <ClientTranslate translationKey="reportFundraiser" />
                </Button>
                <Separator />
                <Updates />
            </div>
            <Report />
            <SuccessNotify />
        </div>
    )
}

export default ProductContent
