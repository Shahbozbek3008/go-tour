"use client"
import Header from "./header"
import ChatMessages from "./messages"
import Toolbar from "./toolbar"

const ChatWindow = () => {
    return (
        <div className="w-full h-full flex flex-col chat-gradient">
            <Header />
            <div className="flex-1 overflow-y-auto relative">
                <ChatMessages />
            </div>
            <Toolbar />
        </div>
    )
}

export default ChatWindow
