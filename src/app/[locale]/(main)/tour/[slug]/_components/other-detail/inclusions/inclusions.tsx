import { Separator } from "@/components/ui/separator"
import { ExclusionList } from "./exclusion-list"
import { InclusionList } from "./inclusion-list"

export const Inclusions = () => {
    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-7">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                    Included in the price
                </h2>
                <Separator />
            </div>
            <InclusionList />
            <Separator className="my-2" />
            <ExclusionList />
        </div>
    )
}
