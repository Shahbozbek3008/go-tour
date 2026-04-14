// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
try {
    importScripts(
        "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js",
    )
    importScripts(
        "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js",
    )
} catch (error) {
    console.error("Error importing Firebase scripts:", error)
}

let messaging = null

// Enhanced notification body parsing functions

// 1. Basic HTML stripping (your current approach)
// function stripHtml(html) {
//     return html ? html.replace(/<[^>]+>/g, "") : ""
// }

// 2. More comprehensive HTML parsing with entity decoding
function parseNotificationBody(body) {
    if (!body) return ""

    // Remove HTML tags
    let cleanBody = body.replace(/<[^>]+>/g, "")

    // Decode HTML entities
    const entityMap = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'",
        "&nbsp;": " ",
        "&copy;": "©",
        "&reg;": "®",
        "&trade;": "™",
    }

    cleanBody = cleanBody.replace(/&[a-zA-Z0-9#]+;/g, (entity) => {
        return entityMap[entity] || entity
    })

    // Trim whitespace and normalize spaces
    cleanBody = cleanBody.replace(/\s+/g, " ").trim()

    return cleanBody
}

// 3. Advanced parsing with length limits and formatting
function formatNotificationBody(body, maxLength = 100) {
    if (!body) return ""

    let parsed = parseNotificationBody(body)

    // Truncate if too long
    if (parsed.length > maxLength) {
        parsed = parsed.substring(0, maxLength - 3) + "..."
    }

    return parsed
}

// 4. Parse JSON-like data in notification body
function parseStructuredBody(body) {
    try {
        // Check if body contains JSON data
        if (body && (body.startsWith("{") || body.startsWith("["))) {
            const data = JSON.parse(body)

            // Extract relevant fields
            if (data.message) return data.message
            if (data.text) return data.text
            if (data.content) return data.content

            return JSON.stringify(data)
        }

        return parseNotificationBody(body)
    } catch (error) {
        console.warn("Failed to parse structured body:", error)
        return parseNotificationBody(body)
    }
}

// 5. Handle different notification formats
function processNotificationData(payload) {
    const notification = payload.notification || {}
    const data = payload.data || {}

    // Try different body sources
    let body = notification.body || data.body || data.message || data.text || ""

    // Parse based on content type
    if (data.contentType === "html") {
        body = parseNotificationBody(body)
    } else if (data.contentType === "json") {
        body = parseStructuredBody(body)
    } else {
        body = formatNotificationBody(body)
    }

    return {
        title: notification.title || data.title || "New Message",
        body: body,
        icon: data.icon || "/icons/logo-circle.svg",
        badge: data.badge || "/icons/logo-circle.svg",
        tag: data.tag || "default",
        requireInteraction: data.requireInteraction === "true",
        silent: data.silent === "true",
        actions: data.actions ? JSON.parse(data.actions) : undefined,
    }
}

// Updated service worker message handler
self?.addEventListener("message", (event) => {
    if (event.data && event.data.type === "FIREBASE_CONFIG") {
        try {
            if (!firebase) {
                console.error("Firebase is not available")
                return
            }

            firebase.initializeApp(event.data.config)
            messaging = firebase.messaging()

            messaging.onBackgroundMessage((payload) => {
                try {
                    console.log(
                        "[firebase-messaging-sw.js] Received background message",
                        payload,
                    )

                    // Use enhanced parsing
                    const notificationData = processNotificationData(payload)

                    const notificationOptions = {
                        body: notificationData.body,
                        icon: notificationData.icon,
                        badge: notificationData.badge,
                        tag: notificationData.tag,
                        data: payload.data,
                        requireInteraction: notificationData.requireInteraction,
                        silent: notificationData.silent,
                        actions: notificationData.actions,
                        click_action: payload.notification?.click_action,
                    }

                    self.registration.showNotification(
                        notificationData.title,
                        notificationOptions,
                    )
                } catch (error) {
                    console.error("Error handling background message:", error)
                }
            })
        } catch (error) {
            console.error(
                "Error initializing Firebase in service worker:",
                error,
            )
        }
    }
})

// Handle notification click events
self?.addEventListener("notificationclick", (event) => {
    console.log("Notification clicked:", event.notification)

    event.notification.close()

    // Handle different click actions based on notification data
    const clickAction =
        event.notification.data?.click_action ||
        event.notification.click_action ||
        "/"

    event.waitUntil(clients.openWindow(clickAction))
})
