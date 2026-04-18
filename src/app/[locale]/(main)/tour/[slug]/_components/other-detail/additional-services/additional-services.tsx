import { Separator } from "@/components/ui/separator"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"

export const AdditionalServices = () => {
    return (
        <section className="w-full my-15">
            <div className="flex flex-col gap-3 mb-7">
                <h2 className="text-2xl font-bold text-foreground tracking-tight">
                    Additional services
                </h2>
                <p className="text-muted-foreground text-sm font-medium">
                    Can be purchased during the booking process
                </p>
            </div>
            <ul className="flex flex-col">
                <Separator />
                <li className="py-5 text-sm font-semibold flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <InfoIcon className="w-4 h-4 text-muted-foreground cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent
                                side="bottom"
                                className="max-w-[200px] bg-gray-800 text-white"
                                arrowClassName="bg-gray-800 fill-gray-800"
                            >
                                <p>Optional</p>
                            </TooltipContent>
                        </Tooltip>
                        Single occupancy
                    </div>
                    <span>$ 20 000</span>
                </li>
                <Separator />
            </ul>
        </section>
    )
}
