import { SlugProvider } from "@/app/_providers/slug-provider"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleSlug } from "@/types/common"
import Index from "./_components"

export default async function TourDetail({ params }: PropsWithLocaleSlug) {
    const { slug } = await params
    setLocale(params)

    return (
        //   <PrefetchProvider
        //       endpoint={API.MARKETPLACE.LIST_SLUG.replace("{slug}", slug)}
        //       enabled={!isPreview}
        //   >
        //       <PrefetchProvider
        //           endpoint={API.MARKETPLACE.SIMILAR_SLUG.replace("{slug}", slug)}
        //           options={{
        //               params: { page_size: 4 },
        //           }}
        //           enabled={!isPreview}
        //       >
        <SlugProvider slug={slug}>
            <Index />
        </SlugProvider>
        //       </PrefetchProvider>
        //   </PrefetchProvider>
    )
}
