import { Agents } from "./agents"
import { Categories } from "./categories"
import { Header } from "./header"
import { SpecialOffers } from "./special-offers"
import { TourSection } from "./tours"
import { UnforgettableCities } from "./unforgettable-cities"
import { WhyUs } from "./why-us"

export default function Index() {
    return (
        <main className="flex flex-col w-full bg-white text-slate-900">
            <section className="w-full mx-auto px-4 sm:px-6 lg:px-15 pt-6 pb-12 md:pb-20">
                <Header />
            </section>
            <TourSection />
            <Categories />
            <UnforgettableCities />
            <Agents />
            <div className="lg:p-15 px-6 py-10">
                <SpecialOffers />
            </div>
            <WhyUs />
        </main>
    )
}
