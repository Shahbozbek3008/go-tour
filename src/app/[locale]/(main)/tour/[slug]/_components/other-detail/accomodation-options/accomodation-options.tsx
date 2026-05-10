import ClientTranslate from "@/components/common/translation/client-translate"
import { Separator } from "@/components/ui/separator"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"
import { Fragment } from "react"
import { ACCOMODATION_OPTIONS_LIST } from "../../../_constants/mockdata"
import { TranslationKey } from "@/components/common/translation/types"

export function AccomodationOptions() {
    return (
        <section className="w-full">
            <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-foreground tracking-tight">
                    <ClientTranslate translationKey="accommodationOptions" />
                </h2>
                <Separator />
            </div>
            <ul className="flex flex-col">
                {ACCOMODATION_OPTIONS_LIST.map((option) => (
                    <Fragment key={option.id}>
                        <li className="py-5 text-sm font-semibold flex items-center gap-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <InfoIcon className="w-4 h-4 text-muted-foreground cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent
                                    side="bottom"
                                    className="max-w-[200px] bg-gray-800 text-white"
                                    arrowClassName="bg-gray-800 fill-gray-800"
                                >
                                    <p>
                                        <ClientTranslate
                                            translationKey={
                                                `bedRoom_${option.id + 1}_tooltip` as TranslationKey
                                            }
                                        />
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                            <ClientTranslate
                                translationKey={
                                    `bedRoom_${option.id + 1}` as TranslationKey
                                }
                            />
                        </li>
                        <Separator />
                    </Fragment>
                ))}
            </ul>
        </section>
    )
}
