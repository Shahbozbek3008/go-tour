"use client"

import ChangePassword from "./change-password"
import RecentDevices from "./recent-devices"
import TwoStepsVerification from "./two-steps-verification"

const SecurityPage = () => {
    return (
        <div className="flex flex-col gap-6">
            <ChangePassword />
            <TwoStepsVerification />
            <RecentDevices />
        </div>
    )
}

export default SecurityPage
