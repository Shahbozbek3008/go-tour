"use client"

import { Separator } from "@/components/ui/separator"
import { MOCK_TOUR, MOCK_TOUR_DAYS, REVIEWS } from "../../_constants/mockdata"
import { Accommodation } from "./accomodation"
import { AccomodationOptions } from "./accomodation-options"
import { AdditionalServices } from "./additional-services"
import { TrustBadges } from "./badges"
import { BookingCard, OrganizerCard } from "./booking"
import { TourDetailsGrid } from "./details"
import { Faq } from "./faq"
import { Inclusions } from "./inclusions"
import { FlightSearchForm } from "./payment"
import { Program } from "./program"
import { ReadMore } from "./read-more"
import { Reviews } from "./reviews"
import { TourNavTabs } from "./tabs"
import { TourTags } from "./tags"

export default function TourDetailLayout() {
    const tour = MOCK_TOUR

    return (
        <div className="py-6 lg:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-6 items-start">
                <div className="space-y-6 min-w-0 rounded-2xl border border-border/60 bg-card p-5">
                    <TourNavTabs />
                    <TrustBadges />
                    <TourDetailsGrid details={tour.details} />
                    <TourTags tags={tour.tags} />
                    <Separator className="my-10" />
                    <ReadMore lines={2}>{tour.description}</ReadMore>
                    <Separator className="my-10" />
                    <Program
                        days={MOCK_TOUR_DAYS}
                        onEmailRequest={() => console.log("Send to email")}
                    />
                    <Separator className="my-10" />
                    <Inclusions />
                    <Accommodation />
                    <AccomodationOptions />
                    <AdditionalServices />
                    <Faq />
                    <FlightSearchForm />
                    <Reviews rating={4.9} totalCount={10} reviews={REVIEWS} />
                </div>

                <div className="space-y-4 lg:sticky lg:top-24">
                    <BookingCard
                        pricing={tour.pricing}
                        dateRange={tour.dateRange}
                        availableSpots={tour.availableSpots}
                        instantBooking={tour.instantBooking}
                    />
                    <OrganizerCard organizer={tour.organizer} />
                </div>
            </div>
        </div>
    )
}
