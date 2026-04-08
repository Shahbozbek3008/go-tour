import { IconProps } from "@/assets/icons/types"
import { JSX } from "react"

export interface TabItem {
    id: string
    label: string
    badge?: number
}

export interface TabSwitcherProps {
    tabs: TabItem[]
    activeTab: string
    onChange: (tabId: string) => void
}

export interface Tab {
    id: string
    label: string
    badge?: number
    Icon: (props: IconProps) => JSX.Element
    IconActive: (props: IconProps) => JSX.Element
}
