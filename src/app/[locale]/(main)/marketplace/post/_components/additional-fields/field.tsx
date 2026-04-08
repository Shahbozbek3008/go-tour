"use client"

import { IconClose } from "@/assets/icons/close"
import { IconTrash } from "@/assets/icons/trash"
import ControlledInput from "@/components/form/controlled-input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/shadcn"
import { useTranslations } from "next-intl"
import { Path } from "react-hook-form"
import { useMarketplaceForm } from "../../_hooks/use-marketplace-form"
import { MarketplaceProductForm } from "../../_types"

type RowProps = {
    index: number
    className?: string
    remove: (i: number) => void
    onClick: () => void
}

export default function Field({ index, remove, className, onClick }: RowProps) {
    const t = useTranslations()
    const { methods } = useMarketplaceForm()
    const namePath: Path<MarketplaceProductForm> = `additional_fields.${index}.field_name`
    const valuePath: Path<MarketplaceProductForm> = `additional_fields.${index}.field_value`

    return (
        <div className={cn("w-full", className)}>
            <div className="hidden md:flex items-center gap-4">
                <div className="w-1/2">
                    <ControlledInput
                        methods={methods}
                        placeholder={t("name")}
                        name={namePath}
                        className="border-gradient"
                        showError
                    />
                </div>
                <div className="w-1/2">
                    <ControlledInput
                        methods={methods}
                        placeholder={t("value")}
                        className="border-gradient"
                        name={valuePath}
                        showError
                    />
                </div>
                <Button
                    type="button"
                    onClick={() => remove(index)}
                    aria-label="Remove field"
                    className="h-[50px] w-[50px] bg-red-100 hover:bg-red-200"
                >
                    <IconClose className="[&_path]:stroke-destructive" />
                </Button>
            </div>

            {/* MOBILE (<md) */}
            <div onClick={onClick} className="flex md:hidden items-start gap-0">
                <div className="flex w-full rounded-lg bg-[#F7F7F7]">
                    <div className="flex-1 px-3 py-1 text-sm leading-snug">
                        <ControlledInput
                            methods={methods}
                            placeholder={t("name")}
                            name={namePath}
                            wrapperClassName="space-y-0 m-0"
                            className="
                                bg-transparent border-0 outline-none
                                ring-0 focus:ring-0 focus-visible:ring-0
                                ring-offset-0 focus-visible:ring-offset-0
                                shadow-none px-0 py-0 text-text-900
                            "
                            showError
                            readOnly
                        />
                        <ControlledInput
                            methods={methods}
                            placeholder={t("value")}
                            name={valuePath}
                            wrapperClassName="space-y-0 m-0"
                            className="
                                bg-transparent border-0 outline-none
                                ring-0 focus:ring-0 focus-visible:ring-0
                                ring-offset-0 focus-visible:ring-offset-0
                                shadow-none px-0 py-0 text-text-600
                            "
                            showError
                            readOnly
                        />
                    </div>

                    <Button
                        variant="ghost"
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation()
                            remove(index)
                        }}
                        aria-label="Remove field"
                        className="self-center p-0 text-destructive"
                    >
                        <IconTrash />
                    </Button>
                </div>
            </div>
        </div>
    )
}
