import { cn } from "@/lib/utils/shadcn"
import Group from "../semantic/group"

interface Props {
    label: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
    className?: string
    contentClassName?: string
}

export default function ReadOnlyField({
    label,
    value,
    className,
    contentClassName,
}: Props) {
    return (
        <Group className={cn("flex flex-col gap-2", className)}>
            <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-nowrap">{label}</p>
                {/* <p className="flex items-center text-gradient text-sm gap-1">
                                    <IconVector2 className="w-4 h-4" /> AI
                                    Generated
                                </p> */}
            </div>

            <div
                className={cn(
                    "relative bg-gradient rounded-lg border-gradient clamp-[h,10,12]",
                    contentClassName,
                )}
            >
                <div className="rounded-[7px] h-full px-4 bg-[#E3E1FC] flex items-center overflow-y-auto scrollbar">
                    <p className="text-gradient">{value}</p>
                </div>
            </div>
        </Group>
    )
}
