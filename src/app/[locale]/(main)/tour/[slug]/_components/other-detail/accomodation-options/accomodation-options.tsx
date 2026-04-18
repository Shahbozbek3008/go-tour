import { Separator } from "@/components/ui/separator"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"
import { Fragment } from "react"
import { ACCOMODATION_OPTIONS_LIST } from "../../../_constants/mockdata"

export function AccomodationOptions() {
    return (
        <section className="w-full">
            <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-foreground tracking-tight">
                    Accommodation options
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
                                    <p>{option.tooltip}</p>
                                </TooltipContent>
                            </Tooltip>
                            {option.label}
                        </li>
                        <Separator />
                    </Fragment>
                ))}
            </ul>
        </section>
    )
}
