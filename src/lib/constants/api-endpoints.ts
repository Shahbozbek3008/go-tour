export const API = {
    BANNER: "banner",
    TOUR: {
        REVIEWS: "tours/{slug}/reviews",
        SHORT_DATA: "tour/tour-short-data",
        TOUR_SLUG: "tour/{slug}",
        SEARCH: "tour/search",
        TOP_SELLING: "tour/top-selling",
        RECOMMENDED: "tour/recommended",
        PROMOTIONAL: "tour/promotional",
        FAVOURITES: "favorites/{slug}",
        FAVOURITES_LIST: "favorites",
        TOUR_SLUG_FILES: "tour/{slug}/files",
        ACCOMMODATION: "tours/{slug}/accommodation",
        GOOD_TO_KNOW: "tours/{slug}/good-to-know",
        INCLUDED: "tours/{slug}/included",
        PROGRAM: "tours/{slug}/program",
        TOUR_SESSIONS: "tour-sessions/{slug}",
    },
    CATEGORIES: {
        ALL: "additionally/all-categories",
    },
    AGENTS: {
        ALL: "additionally/all-agents",
    },
    DESTINATION: {
        HOME: "destination/home",
    },
    AUTH: {
        TOKEN_REFRESH: "auth/token-refresh",
        SMS_ASK: "secure/sms-ask",
        SMS_CHECK: "secure/sms/check",
        REGISTER: {
            EMAIL: "auth/register/email",
            EMAIL_VERIFY: "auth/register/email-verify",
            EMAIL_GET_NEW_CODE: "auth/register/email-get-new-code",
            GOOGLE_AUTH: "auth/register/google-auth",
            FACEBOOK_AUTH: "auth/register/facebook-auth",
            LINKEDIN_AUTH: "auth/register/linkedin-auth",
        },
        LOGIN: {
            EMAIL: "auth/login/email",
            FORGOT_PASSWORD: {
                REQUEST: "auth/login/forgot-password/request",
                RESET: "auth/login/forgot-password/reset",
                VERIFY: "auth/login/forgot-password/verify",
            },
        },
    },
    PROFILE: {
        INDEX: "profile",
        INFO: {
            ME: "profile/get-me",
        },
    },
} as const
