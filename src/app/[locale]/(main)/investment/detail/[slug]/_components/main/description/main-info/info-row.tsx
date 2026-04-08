import { ReactNode } from "react"

interface InfoRowProps {
    label: string
    value: ReactNode
}

export default function InfoRow({ label, value }: InfoRowProps) {
    return (
        <div className="flex justify-between items-start py-2 border-b border-gray-100 last:border-b-0">
            <span className="w-1/2 text-sm font-bold flex-shrink-0 pr-4">
                {label}:
            </span>
            <span className="text-text-700 text-sm flex-grow capitalize">
                {value}
            </span>
        </div>
    )
}
