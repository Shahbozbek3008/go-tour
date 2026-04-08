"use client"

import { cn } from "@/lib/utils/shadcn"
import { type TabSwitcherProps } from "@/types/common/tabs"
import React from "react"

export const TabSwitcher: React.FC<TabSwitcherProps> = ({
    tabs,
    activeTab,
    onChange,
}) => {
    return (
        <div
            className={cn(
                // Mobil: gorizontal scroll
                "w-auto overflow-x-auto md:overflow-visible",
                // Scrollbarni yashirish
                "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                // Yondan biroz “padding” berib, kesilmasin
                "px- md:px-0",
            )}
            role="tablist"
            aria-orientation="horizontal"
        >
            <div
                className={cn(
                    "inline-flex items-center gap-1 rounded-lg bg-[#F5F6FA] p-1",
                    // Ichki kontent eni kontentga qarab kengaysin (scroll paydo bo‘lishi uchun)
                    "min-w-max",
                    // Skroll paytida tugmalar chiroyli “snap” bilan joylashsin
                    "snap-x snap-mandatory",
                )}
            >
                {tabs.map((tab, index) => {
                    const isActive = activeTab === tab.id
                    return (
                        <button
                            key={tab.id}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`${tab.id}-panel`}
                            onClick={() => onChange(tab.id)}
                            className={cn(
                                "relative flex items-center px-4 py-1.5 text-sm font-medium transition-colors duration-200 rounded-lg",
                                "text-gray-500",
                                // Scroll uchun
                                "shrink-0 whitespace-nowrap snap-start",
                                isActive && "bg-primary text-white",
                            )}
                        >
                            {tab.label}
                            {tab.badge !== undefined && (
                                <span
                                    className={cn(
                                        "ml-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium",
                                        isActive ?
                                            "bg-white text-primary"
                                        :   "bg-primary text-white",
                                    )}
                                >
                                    {tab.badge}
                                </span>
                            )}

                            {/* Ajratuvchi chiziq faqat md+ da ko‘rinadi, mobil scrollda keraksiz */}
                            {index !== tabs.length - 1 && !isActive && (
                                <span className="absolute right-[-1px] top-1/2 -translate-y-1/2 h-4 w-px bg-gray-300 hidden md:block" />
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
