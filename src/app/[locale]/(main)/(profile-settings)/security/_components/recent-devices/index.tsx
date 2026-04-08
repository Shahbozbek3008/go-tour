"use client"
import { IconAndroid } from "@/assets/icons/android"
import { IconAppleIMac } from "@/assets/icons/apple-imac"
import IconMobile from "@/assets/icons/mobile"
import IconWindows from "@/assets/icons/windows"
import ClientTranslate from "@/components/common/translation/client-translate"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatDateTime } from "@/lib/utils/format-date"
import { useProfileDevicesQuery } from "../../_hooks/use-profile-devices-query"

const RecentDevices = () => {
    const { devices } = useProfileDevicesQuery()
    return (
        <div className="pt-6 rounded-md bg-white shadow-[var(--card-shadow)] flex flex-col gap-4">
            <h4 className="text-lg font-medium ml-6">
                <ClientTranslate translationKey="recentDevices" />
            </h4>
            <Table className="min-w-full px-5">
                <TableHeader className="bg-white sticky top-0 z-10 border-t-1">
                    <TableRow>
                        <TableHead className="text-(--text-secondary) opacity-90 uppercase p-4">
                            <ClientTranslate translationKey="browser" />
                        </TableHead>
                        <TableHead className="text-(--text-secondary) opacity-90 uppercase">
                            <ClientTranslate translationKey="device" />
                        </TableHead>
                        <TableHead className="text-(--text-secondary) opacity-90 uppercase">
                            <ClientTranslate translationKey="location" />
                        </TableHead>
                        <TableHead className="text-(--text-secondary) opacity-90 uppercase">
                            <ClientTranslate translationKey="recentActivity" />
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {devices.map((item) => (
                        <TableRow key={item.id} className="p-4">
                            <TableCell className="font-medium text-(--text-secondary) opacity-70 p-4">
                                <div className="flex items-center gap-2 5">
                                    {item.device_model === "Windows" ?
                                        <IconWindows />
                                    : item.device_model === "Android" ?
                                        <IconAndroid />
                                    : item.device_model === "macOS" ?
                                        <IconAppleIMac />
                                    :   <IconMobile />}
                                    <p>{item.device_model}</p>
                                </div>
                            </TableCell>
                            <TableCell className="text-(--text-secondary) opacity-70">
                                {item.device_model}
                            </TableCell>
                            <TableCell className="text-(--text-secondary) opacity-70">
                                {item.location}
                            </TableCell>
                            <TableCell className="text-(--text-secondary) opacity-70">
                                {formatDateTime(item.last_activity)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default RecentDevices
