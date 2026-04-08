"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useAuthStore } from "@/hooks/store/use-auth-store"
import { useTimerStore } from "@/hooks/store/use-timer-store"
import { useEffect } from "react"
import { toast } from "sonner"

export default function GetNewCode() {
    const { email, device, getNewCodeEndpoint, two_fa_password } =
        useAuthStore()
    const { timeLeft, isTimerActive, setTimerState } = useTimerStore()
    const { post: getNewCode, isPending: isGetNewCodePending } = useRequest()
    const handleGetNewCode = async () => {
        if (getNewCodeEndpoint) {
            getNewCode(
                getNewCodeEndpoint,
                {
                    email: email || undefined,
                    device,
                    two_fa_password: two_fa_password || undefined,
                },
                {
                    onSuccess: () => {
                        setTimerState({ timeLeft: 120, isTimerActive: true })
                        toast.success("Code resent")
                    },
                },
            )
        }
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (isTimerActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimerState({ timeLeft: timeLeft - 1 })
            }, 1000)
        } else if (timeLeft === 0) {
            setTimerState({ isTimerActive: false })
        }
        return () => {
            if (timer) clearInterval(timer)
        }
    }, [isTimerActive, setTimerState, timeLeft])

    return (
        <p className="text-sm text-primary text-center flex flex-auto items-center justify-center gap-1">
            <Button
                onClick={handleGetNewCode}
                isLoading={isGetNewCodePending}
                variant={"ghost"}
                className="text-primary text-sm"
                disabled={isTimerActive || !getNewCodeEndpoint}
            >
                <ClientTranslate translationKey="resendCode" />
            </Button>
            {isTimerActive && formatTime(timeLeft)}
        </p>
    )
}
