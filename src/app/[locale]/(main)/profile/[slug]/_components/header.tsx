"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/shadcn"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const DESTINATIONS = [
    { id: 1, code: "tr", label: "Turkiya" },
    { id: 2, code: "ae", label: "Dubai" },
    { id: 3, code: "eg", label: "Misr" },
    { id: 4, code: "th", label: "Tailand" },
    { id: 5, code: "ge", label: "Gruziya" },
    { id: 6, code: "it", label: "Italiya" },
    { id: 7, code: "my", label: "Malayziya" },
    { id: 8, code: "gr", label: "Gretsiya" },
    { id: 9, code: "es", label: "Ispaniya" },
    { id: 10, code: "fr", label: "Fransiya" },
    { id: 11, code: "id", label: "Bali" },
    { id: 12, code: "mv", label: "Maldiv" },
    { id: 13, code: "jp", label: "Yaponiya" },
    { id: 14, code: "az", label: "Ozarbayjon" },
    { id: 15, code: "kz", label: "Qozog'iston" },
    { id: 16, code: "cn", label: "Xitoy" },
    { id: 17, code: "in", label: "Hindiston" },
    { id: 18, code: "ru", label: "Rossiya" },
]

const VISIBLE_COUNT = 14

export function ProfileHeader() {
    const [active, setActive] = useState<number | null>(null)

    const visible = DESTINATIONS.slice(0, VISIBLE_COUNT)

    return (
        <div className="home-container mt-2">
            <div className="flex items-center gap-8 py-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {visible.map((dest) => (
                    <button
                        key={dest.id}
                        onClick={() =>
                            setActive(active === dest.id ? null : dest.id)
                        }
                        className={cn(
                            "relative flex items-center gap-1.5  py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 cursor-pointer",
                            "after:content-[''] after:absolute after:bottom-0",
                            "after:left-2 after:right-2 after:h-[2px]",
                            "after:bg-gray-800 after:rounded-full",
                            "after:scale-x-0 after:transition-transform after:duration-200 after:origin-left",
                            "hover:after:scale-x-100",
                            "text-gray-500 hover:text-gray-900",
                        )}
                    >
                        {/* <img
                            src={`https://flagcdn.com/w40/${dest.code}.png`}
                            alt={dest.label}
                            className="w-4 h-4 rounded-sm"
                        /> */}

                        <span>{dest.label}</span>
                    </button>
                ))}

                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 px-3 py-2 h-auto text-sm font-semibold text-gray-500 hover:text-gray-800 rounded-lg flex-shrink-0 whitespace-nowrap cursor-pointer"
                >
                    Yana
                    <ChevronDown className="w-3.5 h-3.5" />
                </Button>
            </div>
        </div>
    )
}
