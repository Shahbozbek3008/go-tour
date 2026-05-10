"use client"

import IconFileText from "@/assets/icons/file-text"
import { IconTrash } from "@/assets/icons/trash"
import IconX2 from "@/assets/icons/x-icon2"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { getFileExtension } from "@/lib/utils/get-file-extension"
import { getFileSizeUnit } from "@/lib/utils/get-file-size-unit"
import { DocumentPayload } from "@/types/common/extra"

interface Props {
    item: DocumentPayload
    files: DocumentPayload[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFiles: (...event: any[]) => void
    index: number
    ndaAccess?: boolean
}

export default function FileItem({
    item,
    files,
    setFiles,
    ndaAccess,
    index,
}: Props) {
    function handleOnCheckedChange(checked: boolean) {
        setFiles(
            files.map((f, i) => {
                return {
                    ...f,
                    only_invites_allow:
                        i === index ? checked : f.only_invites_allow,
                }
            }),
        )
    }
    return (
        <div className="aspect-square rounded-xl relative border-white sm:border-[#efefef] bg-white sm:bg-[#F8F7FA] hover:[&_.trash]:inline-flex clamp-[p,2,5] flex items-center justify-center flex-col gap-4">
            <a
                href={item.document_url}
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center max-w-full"
            >
                <IconFileText className="clamp-[w,6,8] clamp-[h,6,8]" />
                <span className="clamp-[text,xs,base] font-semibold clamp-[mt,0,2.5] truncate max-w-full">
                    {item.name}
                </span>
                <span className="clamp-[text,xs,base] text-text-600 font-normal uppercase truncate max-w-full">
                    {getFileExtension(item.name)} {getFileSizeUnit(item.size)}
                </span>
            </a>
            {ndaAccess && (
                <>
                    <Separator />
                    <div className="flex items-center gap-2">
                        <span className="text-text-600 text-sm">
                            NDA Access:
                        </span>
                        <Switch
                            checked={item.only_invites_allow}
                            onCheckedChange={handleOnCheckedChange}
                        />
                    </div>
                </>
            )}
            <Button
                onClick={(e) => {
                    e.stopPropagation()
                    setFiles(
                        files.filter(
                            (f) => f.document_url !== item.document_url,
                        ),
                    )
                }}
                variant={"ghost"}
                className="trash z-10 hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/80"
            >
                <IconTrash className="[&_path]:stroke-destructive" />
            </Button>
            <Button
                onClick={(e) => {
                    e.stopPropagation()
                    setFiles(
                        files.filter(
                            (f) => f.document_url !== item.document_url,
                        ),
                    )
                }}
                variant="ghost"
                className="
                    sm:hidden z-10 absolute right-1 top-1 rounded-full bg-[#eef2ff] w-6 h-6
                "
            >
                <IconX2 className="[&_path]:stroke-foreground" />
            </Button>
        </div>
    )
}
