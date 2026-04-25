import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils/shadcn"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const TRUNCATE_LENGTH = 180

interface DayDescriptionProps {
    text: string
}

function renderDescription(text: string): React.ReactNode[] {
    return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={i}>{part.slice(2, -2)}</strong>
        }
        return part
    })
}

export function DayDescription({ text }: DayDescriptionProps) {
    const { isRussian } = useLanguage()
    const [expanded, setExpanded] = useState(false)
    
    if (!text) return null
    
    const isLong = text.length > TRUNCATE_LENGTH
    const displayText =
        expanded || !isLong ? text : text.slice(0, TRUNCATE_LENGTH) + "..."

    return (
        <div className="text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-line">
            <p>{renderDescription(displayText)}</p>
            {isLong && (
                <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className={cn(
                        "mt-2 inline-flex items-center gap-1 text-sm font-medium text-lime-600 hover:text-lime-700 transition-colors",
                    )}
                >
                    {expanded ?
                        isRussian ?
                            "Скрыть"
                        :   "Yopish"
                    : isRussian ?
                        "Читать далее"
                    :   "Batafsil"}
                    <ChevronDown
                        className={cn(
                            "size-4 transition-transform duration-200",
                            expanded && "rotate-180",
                        )}
                    />
                </button>
            )}
        </div>
    )
}
