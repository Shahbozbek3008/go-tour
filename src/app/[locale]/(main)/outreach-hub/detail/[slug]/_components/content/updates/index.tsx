"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { getArray } from "@/lib/utils/get-array"
import { format } from "date-fns"
import parse from "html-react-parser"
import { useOutreachhubItemQuery } from "../../../_hooks/use-outreachhub-item-query"

export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return format(date, "MMMM do, yyyy")
}

const Updates = () => {
    const { data } = useOutreachhubItemQuery()
    const lastUpdates = getArray(data?.last_updates)

    return (
        <div className="flex flex-col gap-6">
            <h4 className="text-xl">
                <ClientTranslate translationKey="updates" /> (
                {lastUpdates.length})
            </h4>
            {lastUpdates.map((fundraiser) => (
                <div key={fundraiser.id} className="flex flex-col gap-2">
                    <h5 className="text-lg font-medium">
                        {formatDate(fundraiser.created_at)}
                    </h5>
                    <div className="flex flex-col gap-4 text-lg text-(--text-700)">
                        {parse(fundraiser.text)}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Updates
