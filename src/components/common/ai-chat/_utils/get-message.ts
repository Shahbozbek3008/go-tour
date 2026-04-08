import { AiPersistStateMessage } from "../_hooks/use-ai-persist"

export function getMessage({
    aiMessage,
    userMessage,
}: {
    aiMessage?: string
    userMessage?: string
}) {
    const message: AiPersistStateMessage = {
        aiMessage,
        userMessage,
        created_at: new Date().toISOString(),
        id: crypto.randomUUID(),
    }

    return message
}
