import Modal from "@/components/common/modal"
import ClientTranslate from "@/components/common/translation/client-translate"
import PhoneField from "@/components/form/phone-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useRequest } from "@/hooks/react-query/use-request"
import { useModal } from "@/hooks/use-modal"
import { Link } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { getHref } from "@/lib/utils/get-href"
import { SubmitHandler, useFormContext } from "react-hook-form"

interface FormValues {
    phoneNumber: string
}

export const Login = () => {
    const methods = useFormContext<FormValues>()
    const { closeModal } = useModal(MODAL_KEYS.SIGN_IN_MODAL)
    const { openModal } = useModal(MODAL_KEYS.VERIFY_PHONE_MODAL)
    const { post, isPending } = useRequest()

    const onSubmit: SubmitHandler<FormValues> = (credentails) => {
        post(API.AUTH.SMS_ASK, credentails, {
            onSuccess: () => {
                openModal()
                closeModal()
            },
        })
    }

    return (
        <>
            <Modal
                className="w-[clamp(300px,90vw,400px)]"
                modalKey={MODAL_KEYS.SIGN_IN_MODAL}
                title="Tizimga kirish"
            >
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className="flex flex-col items-center">
                            <div className="w-full space-y-4 mt-6">
                                <PhoneField
                                    name="phoneNumber"
                                    methods={methods}
                                    inputClassName="rounded-xl h-[52px] text-base"
                                />
                                <Button
                                    type="submit"
                                    className="w-full mt-2"
                                    isLoading={isPending}
                                >
                                    <ClientTranslate translationKey="getTheCode" />
                                </Button>
                            </div>

                            <div className="mt-8 flex flex-col items-center gap-3 pb-2">
                                <p className="text-[13px] text-[#8a8a8a] text-center leading-relaxed max-w-[280px]">
                                    <ClientTranslate translationKey="agreePrefix" />{" "}
                                    <Link
                                        href={getHref({
                                            pathname: "/[locale]/about-us",
                                        })}
                                        className="text-[#1a1a1a] underline underline-offset-2 decoration-[#1a1a1a]/40 hover:decoration-[#1a1a1a] transition-all duration-150"
                                    >
                                        <ClientTranslate translationKey="privacyPolicy" />
                                    </Link>{" "}
                                    <ClientTranslate translationKey="and" />{" "}
                                    <Link
                                        href={getHref({
                                            pathname: "/[locale]/agents",
                                        })}
                                        className="text-[#1a1a1a] underline underline-offset-2 decoration-[#1a1a1a]/40 hover:decoration-[#1a1a1a] transition-all duration-150"
                                    >
                                        <ClientTranslate translationKey="offerLink" />
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </Form>
            </Modal>
        </>
    )
}
