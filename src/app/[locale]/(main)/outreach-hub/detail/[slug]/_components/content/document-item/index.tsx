"use client"

import { Document } from "@/app/[locale]/(main)/outreach-hub/_types"
import { IconScreenShare } from "@/assets/icons/screen-share"
import { IconProps } from "@/assets/icons/types"
import { Button } from "@/components/ui/button"
import { getFileExtension } from "@/lib/utils/get-file-extension"
import { cn } from "@/lib/utils/shadcn"
import { FC } from "react"

interface DocumentsProps {
    document: Document & { Icon?: FC<IconProps> }
    className?: string
}

const DocumentItem = ({ document, className }: DocumentsProps) => {
    return (
        <a
            href={document.document_url}
            rel="noopener noreferrer"
            target="_blank"
            className="border rounded-xl clamp-[p,3,5] bg-[#F8F7FA] md:bg-white"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <span className="border w-14 h-14 bg-gray-100 flex items-center justify-center rounded-lg">
                        {document.Icon && <document.Icon />}
                    </span>
                    <div className="flex flex-col gap-[2px]">
                        <h4
                            className={cn(
                                "font-semibold text-lg truncate",
                                className,
                            )}
                        >
                            {document.name}loremipsumdummyjson
                        </h4>
                        <p className="text-sm typography">
                            <span className="uppercase truncate max-w-40 inline-block">
                                {getFileExtension(document.name)}
                            </span>{" "}
                            <span className="truncate max-w-20 inline-block">
                                {document.size}
                            </span>
                            {/* {getFileSizeUnit(document.size)} */}
                        </p>
                    </div>
                </div>
                <Button
                    size="sm"
                    variant="ghost"
                    icon={<IconScreenShare />}
                    onClick={(e) => {
                        e.stopPropagation()
                        navigator.share({
                            title: `${document.name}${document.size}`,
                            url: document.document_url,
                        })
                    }}
                />
            </div>
        </a>
    )
}

export default DocumentItem
