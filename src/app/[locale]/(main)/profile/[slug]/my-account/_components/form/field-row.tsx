import ClientTranslate from "@/components/common/translation/client-translate"
import { cn } from "@/lib/utils/shadcn"

interface FieldRowProps {
    label: string
    required?: boolean
    children: React.ReactNode
    className?: string
}

export function FieldRow({
    label,
    required,
    children,
    className,
}: FieldRowProps) {
    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <label className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <ClientTranslate translationKey={label} />
                {required && <span className="text-red-400">*</span>}
            </label>
            <div>{children}</div>
        </div>
    )
}
