"use client"

import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/hooks/use-language"
import { MOCK_TOUR } from "../../_constants/mockdata"
import {
    useTourDetailQuery,
    useTourGoodToKnowQuery,
    useTourIncludedQuery,
    useTourProgramQuery,
    useTourReviewsQuery,
    useTourSessionsQuery,
} from "../../_hooks"
import { Accommodation } from "./accomodation"
import { AccomodationOptions } from "./accomodation-options"
import { AdditionalServices } from "./additional-services"
import { TrustBadges } from "./badges"
import { BookingCard, OrganizerCard } from "./booking"
import { TourDetailsGrid } from "./details"
import { Faq } from "./faq"
import { Inclusions } from "./inclusions"
import { Program } from "./program"
import { ReadMore } from "./read-more"
import { Reviews } from "./reviews"
import { SECTION_IDS, TourNavTabs } from "./tabs"
import { TourTags } from "./tags"

function Anchor({ id }: { id: string }) {
    return <div id={id} className="scroll-mt-24" />
}

export default function TourDetailLayout() {
    const { isRussian } = useLanguage()
    const tour = MOCK_TOUR
    const { detail } = useTourDetailQuery()
    const { reviews } = useTourReviewsQuery()
    const { program } = useTourProgramQuery()
    const { gtk } = useTourGoodToKnowQuery()
    const { included } = useTourIncludedQuery()
    const { sessions } = useTourSessionsQuery()

    return (
        <div className="py-6 lg:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-6 items-start">
                <div className="space-y-6 min-w-0 rounded-2xl border border-border/60 bg-card p-5">
                    <TourNavTabs />
                    <Anchor id={SECTION_IDS.overview} />
                    <TrustBadges />
                    <TourDetailsGrid details={tour.details} />
                    <TourTags tags={detail?.categories!} />
                    <Separator className="my-10" />
                    <ReadMore lines={2}>
                        {isRussian ?
                            detail?.descriptionRu!
                        :   detail?.descriptionUz!}
                    </ReadMore>
                    <Separator className="my-10" />

                    {program?.length! > 0 && (
                        <>
                            <Anchor id={SECTION_IDS.itinerary} />
                            <Program
                                days={program || []}
                                onEmailRequest={() =>
                                    console.log("Send to email")
                                }
                            />
                            <Separator className="my-10" />
                        </>
                    )}

                    {included?.included?.length! > 0 && (
                        <>
                            <Anchor id={SECTION_IDS.includes} />
                            <Inclusions />
                            <Separator className="my-10" />
                        </>
                    )}

                    <Anchor id={SECTION_IDS.accommodation} />
                    <Accommodation />
                    <AccomodationOptions />
                    <AdditionalServices />

                    {gtk?.length! > 0 && (
                        <>
                            <Anchor id={SECTION_IDS.important} />
                            <Faq />
                        </>
                    )}

                    {reviews?.content?.length! > 0 && (
                        <>
                            <Anchor id={SECTION_IDS.reviews} />
                            <Reviews
                                rating={detail?.avgRating || 0}
                                totalCount={reviews?.totalElements || 0}
                                reviews={reviews?.content || []}
                            />
                        </>
                    )}
                </div>

                <div className="space-y-4 lg:sticky lg:top-24">
                    <BookingCard
                        pricing={tour.pricing}
                        sessions={sessions || []}
                        instantBooking={tour.instantBooking}
                    />
                    {detail?.enableChat && (
                        <OrganizerCard organizer={tour.organizer} />
                    )}
                </div>
            </div>
        </div>
    )
}
