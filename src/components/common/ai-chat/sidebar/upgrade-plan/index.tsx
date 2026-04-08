import { IconArrowRight } from "@/assets/icons/arrow-right"
import { IconClose } from "@/assets/icons/close"
import { Button } from "@/components/ui/button"
import { type Dispatch, type SetStateAction } from "react"

interface UpgradePlanProps {
    setShowPlan: Dispatch<SetStateAction<boolean>>
}

const UpgradePlan = ({ setShowPlan }: UpgradePlanProps) => {
    return (
        <div className="rounded-xl bg-(--gray-200) py-2 px-3 mr-3">
            <div className="flex items-center justify-between">
                <p className="text-xs font-semibold">Upgrade to Pro</p>
                <IconClose
                    className="cursor-pointer"
                    onClick={() => setShowPlan(false)}
                />
            </div>
            <p className="mt-2 text-sm text-(--gray-800)">
                Enjoy faster time reply, image generations and more advanced
                search experience.
            </p>
            <Button
                variant="outline"
                className="mt-5 mb-2 w-full bg-transparent text-xs border-primary text-primary"
                size="sm"
            >
                Upgrade plan
                <IconArrowRight />
            </Button>
        </div>
    )
}

export default UpgradePlan
