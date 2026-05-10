import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { SlugProvider } from "@/app/_providers/slug-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import Index from "./_components"

export default async function TourDetail({ params }: PropsWithLocaleSlug) {
    const { slug } = await params
    const slugId = slug.split("-").pop()
    setLocale(params)

    return (
        <PrefetchProvider
            endpoint={API.TOUR.TOUR_SLUG.replace("{slug}", slugId!)}
        >
            <PrefetchProvider
                endpoint={API.TOUR.TOUR_SLUG_FILES.replace("{slug}", slugId!)}
            >
                <PrefetchProvider
                    endpoint={API.TOUR.REVIEWS.replace("{slug}", slugId!)}
                >
                    <PrefetchProvider
                        endpoint={API.TOUR.ACCOMMODATION.replace(
                            "{slug}",
                            slugId!,
                        )}
                    >
                        <PrefetchProvider
                            endpoint={API.TOUR.GOOD_TO_KNOW.replace(
                                "{slug}",
                                slugId!,
                            )}
                        >
                            <PrefetchProvider
                                endpoint={API.TOUR.INCLUDED.replace(
                                    "{slug}",
                                    slugId!,
                                )}
                            >
                                <PrefetchProvider
                                    endpoint={API.TOUR.PROGRAM.replace(
                                        "{slug}",
                                        slugId!,
                                    )}
                                >
                                    <PrefetchProvider
                                        endpoint={API.TOUR.TOUR_SESSIONS.replace(
                                            "{slug}",
                                            slugId!,
                                        )}
                                    >
                                        <PrefetchProvider
                                            endpoint={API.TOUR.INSTALLMENT_SESSION.replace(
                                                "{slug}",
                                                slugId!,
                                            )}
                                        >
                                            <PrefetchProvider
                                                endpoint={API.TOUR.SIMILAR.replace(
                                                    "{slug}",
                                                    slugId!,
                                                )}
                                            >
                                                <SlugProvider slug={slugId!}>
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
            </PrefetchProvider>
        </PrefetchProvider>
    )
}
