import Modal from "@/components/common/modal"
import ClientTranslate from "@/components/common/translation/client-translate"
import PhoneField from "@/components/form/phone-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { useForm } from "react-hook-form"

export const Login = () => {
    const methods = useForm()

    return (
        <Modal
            className="max-w-[500px]"
            modalKey={MODAL_KEYS.SIGN_IN_MODAL}
            title="Tizimga kirish"
        >
            <Form {...methods}>
                <form onSubmit={methods.handleSubmit(() => {})}>
                    <div className="space-y-4 mt-10">
                        <PhoneField
                            name="phone"
                            methods={methods}
                            inputClassName="rounded-lg"
                        />
                        <div className="flex items-center justify-end">
                            <Button type="submit">
                                <ClientTranslate translationKey="signIn" />
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </Modal>
    )
}
