interface DateHeaderProps {
    date: string
}

export default function DateHeader({ date }: DateHeaderProps) {
    return (
        <hgroup className="flex items-center gap-x-4 justify-between mt-4">
            <span className="text-text-300 clamp-[text,sm,lg] font-medium text-nowrap">
                {date}
            </span>
            <div className="w-full h-[1px] bg-stroke-gray"></div>
        </hgroup>
    )
}
