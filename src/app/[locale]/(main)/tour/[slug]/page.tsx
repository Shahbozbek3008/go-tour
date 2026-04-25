import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { SlugProvider } from "@/app/_providers/slug-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import Index from "./_components"

export default async function TourDetail({ params }: PropsWithLocaleSlug) {
    const { slug } = await params
    setLocale(params)

    return (
        <PrefetchProvider endpoint={API.TOUR.TOUR_SLUG.replace("{slug}", slug)}>
            <PrefetchProvider
                endpoint={API.TOUR.TOUR_SLUG_FILES.replace("{slug}", slug)}
            >
                <PrefetchProvider
                    endpoint={API.TOUR.REVIEWS.replace("{slug}", slug)}
                >
                    <PrefetchProvider
                        endpoint={API.TOUR.ACCOMMODATION.replace(
                            "{slug}",
                            slug,
                        )}
                    >
                        <PrefetchProvider
                            endpoint={API.TOUR.GOOD_TO_KNOW.replace(
                                "{slug}",
                                slug,
                            )}
                        >
                            <PrefetchProvider
                                endpoint={API.TOUR.INCLUDED.replace(
                                    "{slug}",
                                    slug,
                                )}
                            >
                                <PrefetchProvider
                                    endpoint={API.TOUR.PROGRAM.replace(
                                        "{slug}",
                                        slug,
                                    )}
                                >
                                    <PrefetchProvider
                                        endpoint={API.TOUR.TOUR_SESSIONS.replace(
                                            "{slug}",
                                            slug,
                                        )}
                                    >
                                        <SlugProvider slug={slug}>
                                            <Index />
                                        </SlugProvider>
                                    </PrefetchProvider>
                                </PrefetchProvider>
                            </PrefetchProvider>
                        </PrefetchProvider>
                    </PrefetchProvider>
                </PrefetchProvider>
            </PrefetchProvider>
        </PrefetchProvider>
    )
}
