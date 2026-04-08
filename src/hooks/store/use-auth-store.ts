import { VerificationForm } from "@/app/[locale]/(auth)/verification-code/_components"
import { LS } from "@/lib/constants/localstorage"
import { DeviceInfo } from "@/lib/firebase/get-device-info"
import { filterDefinedValues } from "@/lib/utils/filter-defined-values"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { API } from "./../../lib/constants/api-endpoints"

export interface AuthState {
    email: string
    two_fa_password?: string
    device: DeviceInfo | null
    forgotPwdCode?: number
    getNewCodeEndpoint:
        | typeof API.AUTH.REGISTER.EMAIL_GET_NEW_CODE
        | typeof API.AUTH.LOGIN.FORGOT_PASSWORD.REQUEST
        | typeof API.PROFILE.TWO_FA.ENABLE
        | null
    onVerificationSubmit: (vals: VerificationForm) => void
}

interface AuthActions {
    setAuthState: (vals: Partial<AuthState>) => void
}

const defaultState: AuthState = {
    email: "",
    device: null,
    getNewCodeEndpoint: null,
    onVerificationSubmit: () => {},
}

export const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set) => ({
            ...defaultState,
            onVerificationSubmit: () => {},
            setAuthState: (vals) => set(filterDefinedValues(vals)),
        }),
        {
            name: LS.AUTH,
            version: 1,
            migrate: (persistedState, version) => {
                if (version < 1) {
                    return defaultState
                }
                return persistedState
            },
        },
    ),
)
