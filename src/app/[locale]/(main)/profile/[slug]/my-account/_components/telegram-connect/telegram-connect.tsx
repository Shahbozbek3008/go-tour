import Modal from "@/components/common/modal"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useModal } from "@/hooks/use-modal"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { useState } from "react"

interface Step {
    text: string
    highlight?: { match: string; replace: string }
}

const STEPS: Step[] = [
    {
        text: "Botimizga start xabarni yuboring",
        highlight: { match: "start xabarni", replace: "/start" },
    },
    {
        text: "Bot sizga maxfiy kod yuborishini kuting. 15 daqiqa ichida kod kelmasa, birinchi qadamni takrorlang;",
    },
    { text: "Qabul qilgan kodingizni quyidagi maydonga kiriting;" },
    { text: "Hisoblarning bog'lanishi tasdiqlanishini kuting." },
]

function StepText({ step }: { step: Step }) {
    if (!step.highlight) {
        return <span>{step.text}</span>
    }

    const parts = step.text.split(step.highlight.match)

    return (
        <span>
            {parts[0]}
            <code className="px-1 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px] font-mono">
                {step.highlight.replace}
            </code>
            {parts[1]}
        </span>
    )
}

export const TelegramConnect = () => {
    const [code, setCode] = useState("")
    const { closeModal } = useModal(MODAL_KEYS.TELEGRAM_CONNECT)

    return (
        <Modal
            className="w-[clamp(300px,90vw,460px)]"
            onClose={closeModal}
            modalKey={MODAL_KEYS.TELEGRAM_CONNECT}
        >
            <div className="flex flex-col">
                <div className="flex flex-col items-center gap-3 px-5 sm:px-6 pt-6 pb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#0088cc]/10 flex items-center justify-center shrink-0">
                        <svg
                            viewBox="0 0 24 24"
                            className="w-5 h-5 fill-[#0088cc]"
                        >
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.41 13.93l-2.94-.919c-.64-.203-.653-.64.136-.954l11.498-4.43c.533-.194 1.003.13.79.593z" />
                        </svg>
                    </div>
                    <div className="text-center">
                        <h2 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                            Qulay bildirishnoma usulini tanlang!
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Telegram orqali hisobingizni bog'lang
                        </p>
                    </div>
                </div>

                <div className="h-px bg-slate-100" />

                <div className="px-5 sm:px-6 py-4 sm:py-5 space-y-3">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                        Ko'rsatma
                    </p>
                    <ol className="space-y-2.5">
                        {STEPS.map((step, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                                <span className="shrink-0 w-6 h-6 sm:w-6 sm:h-6 rounded-full bg-slate-100 text-slate-400 text-[9px] sm:text-[10px] flex items-center justify-center mt-0.5">
                                    {i + 1}
                                </span>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    <StepText step={step} />
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="h-px bg-slate-100" />

                <div className="px-5 sm:px-6 py-4 sm:py-5 space-y-2.5">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                        Kodni kiriting
                    </p>
                    <Input
                        value={code}
                        onChange={(e) =>
                            setCode(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="000000"
                        maxLength={6}
                        inputMode="numeric"
                        className="h-10 text-sm rounded-lg border-slate-200 text-center tracking-[0.4em] font-mono placeholder:tracking-normal placeholder:font-sans focus-visible:ring-1 focus-visible:ring-[#0088cc]/40 focus-visible:border-[#0088cc]/60"
                    />
                    <Button
                        disabled={code.length < 4}
                        className="w-full h-10 rounded-lg bg-[#0088cc] hover:bg-[#0077b5] text-white text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <ClientTranslate translationKey="messengerConnect" />
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
