import { TranslationKey } from "@/components/common/translation/types"
import { getHref } from "@/lib/utils/get-href"
import { RouteLiteral } from "nextjs-routes"
import { AdditionalPageType } from "../../additional-pages/[slug]/_types"

export const links: {
    links: {
        href?: RouteLiteral
        name: TranslationKey
        additionalPageType?: AdditionalPageType
    }[]
    title: TranslationKey
}[] = [
    {
        title: "aboutInexlynk",
        links: [
            {
                name: "aboutUs",
                additionalPageType: "about_us",
            },
            {
                name: "ourMissionVision",
                additionalPageType: "our_mission_vision",
            },
            { name: "howItWorks", additionalPageType: "how_it_works" },
            {
                name: "outreachSocial",
                additionalPageType: "outreach_social_impact",
            },
        ],
    },
    {
        title: "exploreThePlatform",
        links: [
            {
                href: getHref({ pathname: "/[locale]/marketplace" }),
                name: "marketplace",
            },
            {
                href: getHref({ pathname: "/[locale]/investment" }),
                name: "investment",
            },
            {
                href: getHref({ pathname: "/[locale]" }),
                name: "postaRequest",
            },
            {
                href: getHref({ pathname: "/[locale]" }),
                name: "findaPartner",
            },
            {
                href: getHref({ pathname: "/[locale]" }),
                name: "aiPowered",
            },
            {
                href: getHref({ pathname: "/[locale]" }),
                name: "trustedDealroom",
            },
        ],
    },
    {
        title: "discoverThePlatform",
        links: [
            {
                name: "exploreMarketplace",
                additionalPageType: "explore_marketplace",
            },
            {
                name: "investmentOpportunities",
                additionalPageType: "investment_opportunities",
            },
            {
                name: "postYourRequest",
                additionalPageType: "post_your_request",
            },
            {
                name: "matchWithPartners",
                additionalPageType: "match_with_partners",
            },
            // {
            //     name: "User Verification",
            //     additionalPageType: "ver",
            // },
            {
                name: "smartSearchEngine",
                additionalPageType: "smart_search_engine",
            },
            {
                name: "companies",
                href: getHref({ pathname: "/[locale]/companies" }),
            },
        ],
    },
    {
        title: "legalAndTrust",
        links: [
            {
                name: "privacyPolicy",
                additionalPageType: "privacy_policy",
            },
            {
                name: "termsOfUse",
                additionalPageType: "terms_of_use",
            },
            { name: "cookiePolicy", additionalPageType: "cookie_policy" },
            { name: "ndaPolicy", additionalPageType: "nda_confidentiality" },
            // {
            //     name: "User Verification",
            //     additionalPageType: "ver",
            // },
            {
                name: "reportAConcern",
                additionalPageType: "report_misuse_fraud",
            },
        ],
    },
    {
        title: "connectWithUs",
        links: [
            { href: getHref({ pathname: "/[locale]" }), name: "contactUs" },
            {
                href: getHref({ pathname: "/[locale]" }),
                name: "partnerWithUs",
            },
            {
                href: getHref({ pathname: "/[locale]" }),
                name: "mediaAndPress",
            },
        ],
    },
]
