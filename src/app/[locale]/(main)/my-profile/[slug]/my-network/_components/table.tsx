"use client"

import { IMyNetwork } from "../_constants/types"
import DesktopTable from "./desktop"
import MobileList from "./mobile"

export default function CustomTable({
    activeTab,
    data,
}: {
    activeTab: string
    data: IMyNetwork[]
}) {
    return (
        <div className="overflow-hidden">
            <MobileList rows={data} activeTab={activeTab} />
            <DesktopTable rows={data} activeTab={activeTab} />
        </div>
    )
}
