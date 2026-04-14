import { FirebaseApp, initializeApp } from "firebase/app"
import { Messaging, getMessaging, getToken } from "firebase/messaging"
import { isIOSGoogleApp } from "../utils/is-ios-google-app"
import { firebaseConfig } from "./config"

// Firebase instance variables
let firebaseApp: FirebaseApp | undefined
let messaging: Messaging | null = null

/**
 * Initializes Firebase and sets up service worker for messaging
 * Only runs on client side and in supported environments (non-iOS Google app)
 */
if (typeof window !== "undefined" && !isIOSGoogleApp()) {
    try {
        firebaseApp = initializeApp(firebaseConfig)
        if ("serviceWorker" in navigator) {
            messaging = getMessaging(firebaseApp)
        }
    } catch (error) {
        console.log("Failed to initialize Firebase:", error)
    }

    // Register service worker and pass config
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("/firebase-messaging-sw.js")
            .then(async (registration) => {
                try {
                    // Wait for the service worker to be ready
                    await navigator.serviceWorker.ready

                    // Pass Firebase config to service worker
                    if (registration.active) {
                        registration.active.postMessage({
                            type: "FIREBASE_CONFIG",
                            config: firebaseConfig,
                        })
                    }

                    // Also send config to any waiting or installing service worker
                    if (registration.waiting) {
                        registration.waiting.postMessage({
                            type: "FIREBASE_CONFIG",
                            config: firebaseConfig,
                        })
                    }
                    if (registration.installing) {
                        registration.installing.postMessage({
                            type: "FIREBASE_CONFIG",
                            config: firebaseConfig,
                        })
                    }
                } catch (error) {
                    console.log("Error while setting up service worker:", error)
                }
            })
            .catch((err) => {
                console.log("Service worker registration failed:", err)
            })
    } else {
        console.log(
            "Service workers are not supported in this browser or environment",
        )
    }
}

// VAPID key for push notifications
export const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY

export const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission()
        return permission
    } catch (error) {
        console.error("Error requesting notification permission:", error)
        return "denied"
    }
}

/**
 * Retrieves Firebase Cloud Messaging token for push notifications
 * @returns Promise<string|null> FCM token if successful, null otherwise
 */
export const getFirebaseToken = async () => {
    try {
        if (!messaging) {
            // console.error("Firebase messaging is not initialized")
            return null
        }

        if (Notification.permission === "denied") {
            return null
        }

        // If in iOS Google app, skip service worker registration
        if (isIOSGoogleApp()) {
            console.log(
                "Push notifications are not supported in iOS Google app",
            )
            return null
        }

        // Check if service workers are supported
        if (!("serviceWorker" in navigator)) {
            console.log("Service Workers are not supported")
            return null
        }

        try {
            // Wait for service worker registration
            const registration = await navigator.serviceWorker.ready

            const currentToken = await getToken(messaging, {
                vapidKey: VAPID_KEY,
                serviceWorkerRegistration: registration,
            })

            if (currentToken) {
                return currentToken
            }

            console.warn("No registration token available")
            return null
        } catch (swError) {
            console.error("Service Worker error:", swError)
            return null
        }
    } catch (err) {
        console.error("Failed to retrieve Firebase token:", err)
        return null
    }
}
