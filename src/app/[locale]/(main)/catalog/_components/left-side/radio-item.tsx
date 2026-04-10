import { Label } from "@/components/ui/label"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils/shadcn"

interface RadioItemProps {
    id: string
    value: string
    label: React.ReactNode
    isActive: boolean
}

export const RadioItem = ({ id, value, label, isActive }: RadioItemProps) => {
    return (
        <div className="flex items-center gap-2.5 py-[5px] cursor-pointer">
            <RadioGroupItem
                value={value}
                id={id}
                className={cn(
                    "h-4 w-4 shrink-0 border-zinc-300",
                    isActive && "border-zinc-900 text-zinc-900",
                )}
            />
            <Label
                htmlFor={id}
                className={cn(
                    "text-sm leading-none cursor-pointer transition-colors duration-100",
                    isActive ?
                        "text-zinc-900 font-medium"
                    :   "text-zinc-500 font-normal",
                )}
            >
                {label}
            </Label>
        </div>
    )
}
