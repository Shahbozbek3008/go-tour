"use client"

import { IMyNetwork } from "../../_constants/types"
import MobileListItem from "./mobile-list-item"

export default function MobileList({
    rows,
    activeTab,
}: {
    rows: IMyNetwork[]
    activeTab: string
}) {
    return (
        <div className="md:hidden">
            <ul className="divide-y">
                {rows.map((r) => (
                    <MobileListItem key={r.id} row={r} activeTab={activeTab} />
                ))}
            </ul>
        </div>
    )
}
