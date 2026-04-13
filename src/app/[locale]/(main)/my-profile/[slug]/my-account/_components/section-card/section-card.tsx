import ClientTranslate from "@/components/common/translation/client-translate"
import { cn } from "@/lib/utils/shadcn"

interface SectionCardProps {
    title: string
    description?: string
    children: React.ReactNode
    className?: string
}

export function SectionCard({
    title,
    description,
    children,
    className,
}: SectionCardProps) {
    return (
        <div
            className={cn(
                "bg-white rounded-2xl  border border-slate-150 overflow-hidden",
                className,
            )}
        >
            <div className="px-6 py-5 border-b border-slate-100">
                <h2 className="text-sm font-semibold text-slate-800 tracking-tight">
                    <ClientTranslate translationKey={title} />
                </h2>
                {description && (
                    <p className="text-xs text-slate-500 mt-0.5">
                        <ClientTranslate translationKey={description} />
                    </p>
                )}
            </div>
            <div className="p-6">{children}</div>
        </div>
    )
}
