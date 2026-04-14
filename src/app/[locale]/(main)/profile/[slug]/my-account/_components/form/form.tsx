"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { AvatarUpload } from "@/components/form/avatar-upload-field"
import ControlledDatePicker from "@/components/form/controlled-datepicker"
import ControlledInput from "@/components/form/controlled-input"
import SelectControl from "@/components/form/controlled-select"
import PhoneField from "@/components/form/phone-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useModal } from "@/hooks/use-modal"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { MapPin } from "lucide-react"
import { SubmitHandler } from "react-hook-form"
import { GENDER_OPTIONS } from "../../_constants"
import { useUpdateProfile } from "../../_hooks"
import { FormValues } from "../../schemas"
import { SectionCard } from "../section-card"
import { TelegramConnect } from "../telegram-connect"
import { FieldRow } from "./field-row"

export function MyAccountForm() {
    const { methods } = useUpdateProfile()
    const {
        handleSubmit,
        reset,
        formState: { isDirty },
    } = methods
    const { isOpen, openModal } = useModal(MODAL_KEYS.TELEGRAM_CONNECT)

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data)
    }

    return (
        <div className="">
            <div className="mb-8">
                <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
                    <ClientTranslate translationKey="personalInformation2" />
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    <ClientTranslate translationKey="personalInformation2Desc" />
                </p>
            </div>

            <Form {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <SectionCard title="basicInformation">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                            <FieldRow label="name" required>
                                <ControlledInput
                                    methods={methods}
                                    name="name"
                                    placeholder="To'liq ismingiz"
                                    className="h-10 text-sm rounded-lg"
                                />
                            </FieldRow>

                            <FieldRow label="email">
                                <ControlledInput
                                    methods={methods}
                                    name="email"
                                    type="email"
                                    optional
                                    placeholder="Elektron pochta"
                                    className="h-10 text-sm rounded-lg placeholder:text-sm"
                                />
                            </FieldRow>

                            <FieldRow label="birthDate">
                                <ControlledDatePicker
                                    methods={methods}
                                    name="birthDate"
                                    placeholder="Tug'ilgan sana"
                                    className="h-10 text-sm rounded-lg w-full"
                                    calendarProps={{
                                        fromYear: 1940,
                                        toYear: new Date().getFullYear(),
                                    }}
                                />
                            </FieldRow>

                            <FieldRow label="gender">
                                <SelectControl
                                    control={methods.control}
                                    name="gender"
                                    placeholder="Tanlash"
                                    options={GENDER_OPTIONS}
                                    selectClass="h-10 text-sm rounded-lg w-full"
                                    notRequired
                                    withoutDescription
                                />
                            </FieldRow>

                            <FieldRow label="phoneNumber">
                                <PhoneField
                                    methods={methods}
                                    name="phone"
                                    optional
                                    className="h-10 rounded-lg text-sm"
                                    inputClassName="text-sm"
                                />
                            </FieldRow>

                            <FieldRow label="address">
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                                    <ControlledInput
                                        methods={methods}
                                        name="address"
                                        optional
                                        placeholder="address"
                                        className="h-10 rounded-lg"
                                    />
                                </div>
                            </FieldRow>
                        </div>
                    </SectionCard>

                    <SectionCard title="yourPhoto" description="yourPhotoDesc">
                        <AvatarUpload methods={methods} name="avatar" />
                    </SectionCard>

                    <SectionCard title="additional">
                        <FieldRow label="messengerConnect">
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={openModal}
                                className="text-sm rounded-lg"
                            >
                                <ClientTranslate translationKey="messengerConnect" />
                            </Button>
                        </FieldRow>
                    </SectionCard>

                    <div className="flex items-center justify-end gap-3 pt-2">
                        {isDirty && (
                            <Button
                                size="lg"
                                type="button"
                                variant="outline"
                                className="rounded-lg"
                                onClick={() => reset()}
                            >
                                <ClientTranslate translationKey="cancel" />
                            </Button>
                        )}
                        <Button
                            size="lg"
                            type="submit"
                            variant="default"
                            className="rounded-lg"
                        >
                            <ClientTranslate translationKey="save" />
                        </Button>
                    </div>
                </form>
                {isOpen && <TelegramConnect />}
            </Form>
        </div>
    )
}
