"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { IMyNetwork } from "../../_constants/types"
import DesktopRow from "./desktop-row"

export default function DesktopTable({
    rows,
    activeTab,
}: {
    rows: IMyNetwork[]
    activeTab: string
}) {
    return (
        <div className="hidden md:block">
            <div className="overflow-y-auto max-h-[60vh] scrollbar">
                <Table className="min-w-full">
                    <TableHeader className="bg-white sticky top-0 z-10">
                        <TableRow>
                            <TableHead className="text-(--text-secondary) opacity-90 uppercase">
                                <ClientTranslate translationKey="users" />
                            </TableHead>
                            <TableHead className="text-(--text-secondary) opacity-90 uppercase">
                                <ClientTranslate translationKey="company" />
                            </TableHead>
                            <TableHead className="text-(--text-secondary) opacity-90 uppercase">
                                <ClientTranslate translationKey="position" />
                            </TableHead>
                            <TableHead className="text-(--text-secondary) opacity-90 uppercase">
                                <ClientTranslate translationKey="status" />
                            </TableHead>
                            <TableHead className="text-(--text-secondary) opacity-90 uppercase">
                                <ClientTranslate translationKey="connections" />
                            </TableHead>
                            <TableHead className="text-(--text-secondary) opacity-90 uppercase">
                                <ClientTranslate translationKey="country" />
                            </TableHead>
                            <TableHead className="text-(--text-secondary) text-center opacity-90 uppercase">
                                <ClientTranslate translationKey="action" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {rows.map((r) => (
                            <DesktopRow
                                key={r.id}
                                row={r}
                                activeTab={activeTab}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
