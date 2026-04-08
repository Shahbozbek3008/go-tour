"use client"

import { useEffect } from "react"
import { Button } from "../ui/button"
import ClientTranslate from "./translation/client-translate"

interface Props {
    error: Error & { digest?: string }
    reset: () => void
}

export default function ErrorBoundary({ error, reset }: Props) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Error:", error)
    }, [error])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-semibold mb-4">
                <ClientTranslate translationKey="someThingWrong" />
            </h2>
            <p className="text-gray-600 mb-6 text-center max-w-md">
                {error.message ||
                    "An unexpected error occurred. Please try again."}
            </p>
            <Button onClick={reset} variant="default">
                <ClientTranslate translationKey="tryAgain" />
            </Button>
        </div>
    )
}
