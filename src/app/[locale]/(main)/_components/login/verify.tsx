import Modal from "@/components/common/modal"
import ClientTranslate from "@/components/common/translation/client-translate"
import OtpField from "@/components/form/otp-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useRequest } from "@/hooks/react-query/use-request"
import { useModal } from "@/hooks/use-modal"
import { useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { ClientTokenService } from "@/lib/cookies/client-token-service"
import { cn } from "@/lib/utils/shadcn"
import { Phone, RotateCcw } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { SubmitHandler, useFormContext } from "react-hook-form"

interface FormValues {
    smsCode: string
    phoneNumber: string
}

interface SmsCheckPayload {
    deviceId: string
    deviceType: "WEB"
    phoneNumber: string
    smsCode: number
}

const RESEND_SECONDS = 120

const getDeviceId = (): string => {
    const stored = localStorage.getItem("deviceId")
    if (stored) return stored
    const generated = `web-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
    localStorage.setItem("deviceId", generated)
    return generated
}

const formatTime = (s: number): string => {
    const m = String(Math.floor(s / 60)).padStart(2, "0")
    const sec = String(s % 60).padStart(2, "0")
    return `${m}:${sec}`
}

export const Verify = () => {
    const router = useRouter()
    const methods = useFormContext<FormValues>()
    const { openModal } = useModal(MODAL_KEYS.SIGN_IN_MODAL)
    const { closeModal } = useModal(MODAL_KEYS.VERIFY_PHONE_MODAL)
    const { post, isPending } = useRequest()

    const [countdown, setCountdown] = useState(RESEND_SECONDS)
    const [isResending, setIsResending] = useState(false)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const phoneNumber = methods.getValues("phoneNumber")

    const startTimer = useCallback(() => {
        setCountdown(RESEND_SECONDS)
        if (timerRef.current) clearInterval(timerRef.current)
        timerRef.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!)
                    return 0
                }
                return prev - 1
            })
        }, 1000)
    }, [])

    useEffect(() => {
        startTimer()
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [startTimer])

    const handleResend = () => {
        setIsResending(true)
        post(
            API.AUTH.SMS_ASK,
            { phoneNumber },
            {
                onSuccess: () => {
                    methods.setValue("smsCode", "")
                    startTimer()
                },
                onSettled: () => setIsResending(false),
            },
        )
    }

    const onVerify: SubmitHandler<FormValues> = (credentials) => {
        const payload: SmsCheckPayload = {
            deviceId: getDeviceId(),
            deviceType: "WEB",
            phoneNumber,
            smsCode: Number(credentials.smsCode),
        }

        post(API.AUTH.SMS_CHECK, payload, {
            onSuccess: (res) => {
                if (res?.data?.token) {
                    ClientTokenService.setAccessToken(
                        res.data?.token?.accessToken,
                    )
                    ClientTokenService.setRefreshToken(
                        res.data?.token?.refreshToken,
                    )
                }
                router.refresh()
                closeModal()
                methods.reset()
            },
        })
    }

    return (
        <Modal
            title="Tasdiqlash"
            className="w-[clamp(300px,90vw,420px)]"
            modalKey={MODAL_KEYS.VERIFY_PHONE_MODAL}
        >
            <Form {...methods}>
                <form onSubmit={methods.handleSubmit(onVerify)}>
                    <div className="flex flex-col items-center gap-4 mt-5 pb-2">
                        <div className="w-full flex items-center gap-3 bg-muted/50 rounded-xl px-3.5 py-3">
                            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                <Phone className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <p className="text-[11px] text-zinc-400 leading-none">
                                    <ClientTranslate translationKey="smsCodeSent" />
                                </p>
                                <p className="text-[14px] font-medium text-zinc-900 tracking-wide leading-none">
                                    {phoneNumber}
                                </p>
                            </div>
                        </div>

                        <OtpField
                            maxLength={6}
                            name="smsCode"
                            methods={methods}
                            groupClassName="gap-[clamp(4px,1.5vw,10px)]"
                            slotClassName="w-[calc((min(90vw,420px)-48px-40px)/6)] max-w-[48px] min-w-[30px] h-12 text-base"
                        />

                        <div className="w-full flex items-center justify-center h-7">
                            {countdown > 0 ?
                                <p className="text-[13px] text-zinc-400">
                                    <ClientTranslate translationKey="resend" />{" "}
                                    —{" "}
                                    <span className="font-medium tabular-nums text-zinc-600">
                                        {formatTime(countdown)}
                                    </span>
                                </p>
                            :   <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={isResending}
                                    className={cn(
                                        "flex items-center gap-1.5 text-[13px] font-medium text-blue-600",
                                        "hover:text-blue-700 transition-colors duration-150",
                                        "disabled:opacity-50 disabled:cursor-not-allowed",
                                        "focus-visible:outline-none",
                                    )}
                                >
                                    <RotateCcw
                                        className={cn(
                                            "w-3.5 h-3.5",
                                            isResending && "animate-spin",
                                        )}
                                    />
                                    <ClientTranslate translationKey="resend" />
                                </button>
                            }
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            isLoading={isPending}
                        >
                            <ClientTranslate translationKey="confirm" />
                        </Button>

                        <Button
                            type="button"
                            variant="link"
                            className="text-sm text-primary"
                            onClick={() => {
                                openModal()
                                closeModal()
                            }}
                        >
                            <ClientTranslate translationKey="changePhoneNumber" />
                        </Button>
                    </div>
                </form>
            </Form>
        </Modal>
    )
}
