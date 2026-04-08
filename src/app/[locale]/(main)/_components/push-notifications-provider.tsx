"use client"

import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { useRequest } from "@/hooks/react-query/use-request"
import { API } from "@/lib/constants/api-endpoints"
import { getFirebaseToken } from "@/lib/firebase"
import { Messaging } from "firebase/messaging"
import React, { createContext, PropsWithChildren, useEffect } from "react"

export const PushNotificationsContext = createContext<Messaging | undefined>(
    undefined,
)

const PushNotificationsProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const profileQuery = useProfileQuery()
    const { patch } = useRequest({
        options: {
            onError: undefined,
        },
    })

    useEffect(() => {
        const checkNotificationPermission = async () => {
            if (Notification.permission === "default") {
                // Prevent running multiple times
                if (!profileQuery.isSuccess) return

                const firebaseToken = await getFirebaseToken()
                if (firebaseToken) {
                    patch(API.PROFILE.UPDATE_FIREBASE_TOKEN, {
                        firebase_token: firebaseToken,
                    })
                }
            }
        }

        checkNotificationPermission()
        // Only depend on res.isSuccess, ignore mutateAsync to prevent infinite loops
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileQuery.isSuccess])

    return (
        <PushNotificationsContext.Provider value={undefined}>
            {children}
        </PushNotificationsContext.Provider>
    )
}

export default PushNotificationsProvider
