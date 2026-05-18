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
import { ClientTokenService } from "@/lib/cookies/client-token-service"
import { getHref } from "@/lib/utils/get-href"
import { useQueryClient } from "@tanstack/react-query"
import { LogOut } from "lucide-react"
import { GENDER_OPTIONS } from "../../_constants"
import { useUpdateProfile } from "../../_hooks"
import { SectionCard } from "../section-card"
import { TelegramConnect } from "../telegram-connect"
import { FieldRow } from "./field-row"

export function MyAccountForm() {
    const queryClient = useQueryClient()
    const { methods, onSubmit, isPending } = useUpdateProfile()
    const { isOpen, openModal } = useModal(MODAL_KEYS.TELEGRAM_CONNECT)

    const handleLogout = () => {
        ClientTokenService.removeAccessToken()
        ClientTokenService.removeRefreshToken()
        queryClient.clear()
        window.location.href = getHref({ pathname: "/[locale]" })
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
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <SectionCard title="basicInformation">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                            <FieldRow label="name" required>
                                <ControlledInput
                                    methods={methods}
                                    name="fullName"
                                    placeholder="fullNamePlaceholder"
                                    className="h-10 text-sm rounded-lg"
                                />
                            </FieldRow>

                            <FieldRow label="email">
                                <ControlledInput
                                    methods={methods}
                                    name="email"
                                    type="email"
                                    showError
                                    placeholder="emailPlaceholder"
                                    className="h-10 text-sm rounded-lg placeholder:text-sm"
                                />
                            </FieldRow>

                            <FieldRow label="birthDate">
                                <ControlledDatePicker
                                    methods={methods}
                                    name="birthDate"
                                    placeholder="birthDate"
                                    className="h-10 text-sm rounded-lg w-full"
                                    calendarProps={{
                                        fromYear: 1940,
                                        toYear: new Date().getFullYear(),
                                        // @ts-ignore
                                        locale: undefined,
                                    }}
                                />
                            </FieldRow>

                            <FieldRow label="gender">
                                <SelectControl
                                    control={methods.control}
                                    name="gender"
                                    placeholder="selectPlaceholder"
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

                    <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-3 pt-2">
                        <Button
                            size="lg"
                            type="button"
                            variant="outline"
                            className="rounded-lg w-full sm:w-auto text-sm"
                            onClick={() => methods.reset()}
                        >
                            <ClientTranslate translationKey="cancel" />
                        </Button>
                        <Button
                            size="lg"
                            type="submit"
                            variant="default"
                            isLoading={isPending}
                            className="rounded-lg w-full text-sm sm:w-auto"
                        >
                            <ClientTranslate translationKey="save" />
                        </Button>
                    </div>
                    <div className="sm:hidden pt-1 flex justify-end">
                        <Button
                            size="lg"
                            type="button"
                            variant="ghost"
                            onClick={handleLogout}
                            className="rounded-lg w-full sm:w-auto text-sm text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            <ClientTranslate translationKey="logoutAccount" />
                        </Button>
                    </div>
                </form>
                {isOpen && <TelegramConnect />}
            </Form>
        </div>
    )
}
