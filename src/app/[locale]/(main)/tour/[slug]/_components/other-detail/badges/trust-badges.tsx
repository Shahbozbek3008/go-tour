import { Separator } from "@/components/ui/separator"
import { BadgeCheck, CreditCard, ShieldCheck } from "lucide-react"
import { Fragment } from "react"

const BADGES = [
    {
        icon: BadgeCheck,
        title: "Lowest Price Guarantee",
        description: "Not more expensive than on other platforms",
    },
    {
        icon: CreditCard,
        title: "Any Card Accepted",
        description: "We accept local and international cards",
    },
    {
        icon: ShieldCheck,
        title: "Verified Travel Experts",
        description: "All organizers pass a thorough screening",
    },
]

export function TrustBadges() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-stretch p-5 bg-muted/40 rounded-2xl border border-border/50">
            {BADGES.map(({ icon: Icon, title, description }, index) => (
                <Fragment key={title}>
                    <div className="flex items-start gap-3 flex-1">
                        <Icon className="size-5 text-primary mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-semibold text-foreground">
                                {title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                {description}
                            </p>
                        </div>
                    </div>
                    {index !== BADGES.length - 1 && (
                        <>
                            <Separator orientation="horizontal" className="my-4 sm:hidden" />
                            <div className="hidden sm:block w-[1px] bg-border/80 mx-2 lg:mx-4 self-stretch" />
                        </>
                    )}
                </Fragment>
            ))}
        </div>
    )
}
