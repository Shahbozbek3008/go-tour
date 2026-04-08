"use client"

import Group from "@/components/semantic/group"

import ChatContent from "./chat-content"
import Toolbar from "./toolbar"

const RightSection = () => {
    return (
        <Group className="relative w-full flex flex-col h-[80vh]">
            <div className="flex-1 min-h-0 overflow-hidden relative">
                <ChatContent />
            </div>
            <div className="flex-shrink-0">
                <Toolbar />
            </div>
        </Group>
    )
}

export default RightSection
