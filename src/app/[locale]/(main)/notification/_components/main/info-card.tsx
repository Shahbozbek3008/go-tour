"use client"

import { IconBasketMarketplace } from "@/assets/icons/basket-marketplace"
import { IconDoubleCheckCircle } from "@/assets/icons/double-check-circle"
import { PostEnums } from "@/lib/constants/notifications.enum"
import { formatDistance } from "@/lib/utils/format-date"
import parse from "html-react-parser"
import { ActionTypes } from "../../_types/action"
import { Notification } from "../../_types/notification"

interface Props {
    item: Notification
}

export default function InfoCard({ item }: Props) {
    const getMessagePrefix = (actionType: ActionTypes) => {
        switch (actionType) {
            case PostEnums.your_marketplace_post_published:
                return "Marketplace"
            case PostEnums.your_investment_post_published:
                return "Investment"
            case PostEnums.your_outreach_hub_post_published:
                return "Outreach Hub"
            case PostEnums.your_blog_post_published:
                return "News"
            default:
                return null
        }
    }

    return (
        <div className="flex justify-between gap-4 border-2 border-success/15 rounded-xl bg-success/10 py-5 pl-3 clamp-[pr,3,8]">
            <hgroup className="flex items-center clamp-[gap,3,8]">
                <div className="flex items-center gap-3">
                    {!item?.is_read && (
                        <span className="hidden md:block w-2 h-2 rounded-full bg-stroke-gray" />
                    )}
                    <hgroup className="w-14 h-14 rounded-full bg-success grid place-items-center relative">
                        <IconBasketMarketplace />
                        <IconDoubleCheckCircle className="hidden md:block absolute top-0 -right-2" />
                    </hgroup>
                </div>
                <div>
                    <h4 className="clamp-[text,base,xl] font-semibold mb-1.5">
                        {item.title}
                    </h4>
                    <div className="hidden md:block text-sm text-text-400">
                        {parse(item.body)}
                    </div>
                    <span className="text-success text-xs font-medium md:font-bold bg-success-100 rounded-[6px] py-2.5 px-5 mt-2 inline-block">
                        {getMessagePrefix(item?.action_type)}
                    </span>
                </div>
            </hgroup>

            <hgroup className="flex items-end flex-col justify-between gap-4">
                <p className="text-text-300 text-sm font-medium whitespace-nowrap">
                    {formatDistance(item?.created_at)}
                </p>
            </hgroup>
        </div>
    )
}
