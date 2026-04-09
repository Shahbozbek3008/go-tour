import { Categories } from "./categories"
import { Header } from "./header"
import { TourSection } from "./tours"
import { UnforgettableCities } from "./unforgettable-cities"

export default function Index() {
    return (
        <div className="text-background">
            <div className="px-15 py-10">
                <Header />
            </div>
            <TourSection />
            <Categories />
            <UnforgettableCities />
        </div>
    )
}
