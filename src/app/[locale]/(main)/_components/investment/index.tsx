import Card from "./card"
import LeftSide from "./left-side"

export default function Investment() {
    return (
        <section className="bg-background pb-25 clamp-[pt,3rem,8.5rem] relative">
            <main className="home-container relative clamp-[px,5,10] w-full flex max-lg:flex-col lg:items-center lg:justify-between lg:gap-10 clamp-[gap,8,20] text-foreground">
                <LeftSide />
                <Card />
            </main>
        </section>
    )
}
