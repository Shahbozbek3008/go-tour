"use client"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { useRouter } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"

const TwoStepsVerification = () => {
    const { data } = useProfileQuery()
    const router = useRouter()

    return (
        <div className="profile-card">
            <h4 className="text-lg font-medium">
                <ClientTranslate translationKey="twoStepsVerification" />
            </h4>
            <h4 className="text-lg text-(--text-secondary) opacity-70">
                <ClientTranslate translationKey="twoFactorAuth" />
            </h4>
            <p className="text-sm text-(--text-secondary) opacity-70">
                <ClientTranslate translationKey="twoFactorAuthLearn" />
            </p>
            {data?.is_2fa_enabled ?
                <Button
                    size="lg"
                    variant="outline"
                    className="max-w-70 border border-primary text-primary"
                    onClick={() =>
                        router.push(
                            getHref({
                                pathname:
                                    "/[locale]/security/two-steps-verification",
                            }),
                        )
                    }
                >
                    <ClientTranslate translationKey="disableTwoFactor" />
                </Button>
            :   <Button
                    size="lg"
                    variant="outline"
                    className="max-w-70 border border-primary text-primary"
                    onClick={() =>
                        router.push(
                            getHref({
                                pathname:
                                    "/[locale]/security/two-steps-verification",
                            }),
                        )
                    }
                >
                    <ClientTranslate translationKey="enableTwoFactor" />
                </Button>
            }
        </div>
    )
}

export default TwoStepsVerification
