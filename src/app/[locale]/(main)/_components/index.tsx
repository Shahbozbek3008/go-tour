import { Agents } from "./agents"
import { Categories } from "./categories"
import { Header } from "./header"
import { QuickLinks } from "./header/quick-links"
import { SpecialOffers } from "./special-offers"
import { TourSection } from "./tours"
import { UnforgettableCities } from "./unforgettable-cities"
import { WhyUs } from "./why-us"

export default function Index() {
    return (
        <main className="flex flex-col w-full bg-white overflow-x-hidden">
            <section className="home-container w-full flex flex-col gap-6 pt-6 pb-12 md:pb-20">
                <Header />
                <QuickLinks />
            </section>
            <TourSection />
            <Categories />
            <UnforgettableCities />
            <SpecialOffers />
            <Agents />
            <WhyUs />
        </main>
    )
}
