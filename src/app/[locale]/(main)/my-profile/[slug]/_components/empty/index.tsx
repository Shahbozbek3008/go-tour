import { type ReactNode } from "react"

interface EmptyProps {
    title: string
    description: string
    emptyIcon: ReactNode
}

const Empty = ({ emptyIcon, title, description }: EmptyProps) => {
    return (
        <div className="flex flex-col items-center justify-center w-full my-10">
            {emptyIcon}
            <h3 className="text-primary text-[24px] font-semibold mt-2">
                {title}
            </h3>
            <p className="text-sm text-(--text-400)">{description}</p>
        </div>
    )
}

export default Empty
