import { routing } from "@/i18n/routing"
import messages from "./messages/en.json"

declare module "next-intl" {
    interface AppConfig {
        Locale: (typeof routing.locales)[number]
        Messages: typeof messages //uncomment for better type safety
        // // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // Messages: any
    }
}
