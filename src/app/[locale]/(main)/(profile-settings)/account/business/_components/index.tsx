"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import ControlledInput from "@/components/form/controlled-input"
import SelectControl from "@/components/form/controlled-select"
import UncontrolledTextarea from "@/components/form/uncontrolled-textarea"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useCountriesQuery } from "@/hooks/react-query/use-countries-query"
import { useRequest } from "@/hooks/react-query/use-request"
import { API } from "@/lib/constants/api-endpoints"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useProfileBusinessQuery } from "../use-profile-business-query"
import UploadFile from "./upload-file"
import UploadLogo from "./upload-logo"

const MyBusiness = () => {
    const t = useTranslations()
    const { data } = useProfileBusinessQuery()
    const { countries } = useCountriesQuery()
    const { patch, isPending } = useRequest()
    const form = useForm({
        defaultValues: {
            business_type: "",
            license_number: "",
            issuing_authority: "",
            document_type: "",
            country: "",
            business_address: "",
            tax_id_number: "",
            licence_file: "",
            tax_file: "",
            purpose_of_business_activity: "",
            company_image: "",
        },
        values: data,
        disabled: isPending,
    })

    const { handleSubmit, setValue } = form

    const onSubmit = handleSubmit((vals) => {
        patch(API.PROFILE.BUSINESS, vals, {
            onSuccess: () => {
                toast.success(t("profileUpdateSuccess"))
            },
        })
    })

    return (
        <div className="profile-card mt-6">
            <h4 className="text-lg font-medium">
                <ClientTranslate translationKey="businessLicence" />
            </h4>

            <Form {...form}>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1 flex flex-col gap-6">
                            <ControlledInput
                                methods={form}
                                name="company_name"
                                placeholder={t("companyName")}
                                label={t("companyName")}
                                className="h-10 placeholder:text-sm"
                                type="text"
                            />
                            {/* <ControlledInput
                                methods={form}
                                name="business_type"
                                placeholder={t("businessType")}
                                label={t("businessType")}
                                className="h-10 placeholder:text-sm"
                                type="text"
                            /> */}
                            <SelectControl
                                control={form.control}
                                name="business_type"
                                placeholder={t("businessType")}
                                label={t("businessType")}
                                className="h-10 placeholder:text-sm"
                                selectClass="w-full placeholder:text-sm"
                                options={[
                                    { value: "IT", label: "IT" },
                                    { value: "MEDIA", label: "MEDIA" },
                                    { value: "MARKETING", label: "MARKETING" },
                                    { value: "FINANCE", label: "FINANCE" },
                                    { value: "CLOUD", label: "CLOUD" },
                                    { value: "OTHER", label: "OTHER" },
                                ]}
                            />

                            <ControlledInput
                                methods={form}
                                name="license_number"
                                placeholder={t("licenseNumber")}
                                label={t("licenseNumber")}
                                className="h-10 placeholder:text-sm"
                                type="number"
                            />

                            <ControlledInput
                                methods={form}
                                name="issuing_authority"
                                placeholder={t("issuingAuthority")}
                                label={t("issuingAuthority")}
                                className="h-10 placeholder:text-sm"
                            />

                            <SelectControl
                                control={form.control}
                                name="country"
                                placeholder={t("selectCountry")}
                                label={t("country")}
                                options={countries?.map((country) => ({
                                    value: country.id,
                                    label: country.name,
                                }))}
                                selectClass="w-full placeholder:text-sm"
                            />

                            <ControlledInput
                                methods={form}
                                name="business_address"
                                placeholder={t("businessAddress")}
                                label={t("businessAddress")}
                                className="h-10 placeholder:text-sm"
                            />

                            <ControlledInput
                                methods={form}
                                name="tax_id_number"
                                placeholder={t("taxIdNumber")}
                                label={t("taxIdNumber")}
                                className="h-10 placeholder:text-sm"
                            />

                            <UncontrolledTextarea
                                methods={form}
                                name="purpose_of_business_activity"
                                label={t("purposeOfBusiness")}
                                textareaProps={{
                                    placeholder: "Purpose of Business",
                                    className: "h-20 placeholder:text-sm",
                                }}
                            />
                        </div>

                        <div className="col-span-1">
                            <div className="flex flex-col gap-6">
                                <UploadFile
                                    label={t("uploadLicence")}
                                    onSuccess={(file) =>
                                        setValue("licence_file", file)
                                    }
                                />
                                <UploadFile
                                    label={t("uploadTaxFile")}
                                    onSuccess={(file) =>
                                        setValue("tax_file", file)
                                    }
                                />
                                <UploadLogo
                                    onSuccess={(file) => {
                                        setValue("company_image", file)
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <Button size="lg" type="submit" onClick={onSubmit}>
                            <ClientTranslate translationKey="saveChanges" />
                        </Button>
                        <Button
                            size="lg"
                            type="button"
                            className="bg-gray-100 text-(--secondary-main) hover:bg-gray-100"
                            onClick={() => form.reset()}
                        >
                            <ClientTranslate translationKey="cancel" />
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default MyBusiness
