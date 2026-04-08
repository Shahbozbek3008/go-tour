import { IconLogo } from "@/assets/icons/logo"
import ChatList from "./chat-list"

const Sidebar = () => {
    return (
        <div className="flex flex-col gap-10 pr-4">
            <IconLogo />
            <ChatList />
            {/* {showPlan ?
                <UpgradePlan setShowPlan={setShowPlan} />
            :   <div className="min-h-[160px]" />} */}
        </div>
    )
}

export default Sidebar
