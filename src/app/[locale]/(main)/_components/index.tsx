import { ScrollReveal } from "@/components/motion-primitives/scroll-reveal"
import dynamic from "next/dynamic"
import Header from "./header"
import StickyAi from "./sticky-ai"

const Categories = dynamic(() => import("./categories"))
const Investment = dynamic(() => import("./investment"))
const Privacy = dynamic(() => import("./privacy"))
const OutreachHub = dynamic(() => import("./outreach-hub"))
const News = dynamic(() => import("./news"))
const Testimonials = dynamic(() => import("./testimonials"))
const Partners = dynamic(() => import("./partners"))
const Contributors = dynamic(() => import("./contributors"))
const AppLink = dynamic(() => import("./app-link"))

export default function Index() {
    return (
        <div className="text-background">
            <Header />
            <StickyAi />
            <div className="relative z-10 bg-background">
                <ScrollReveal>
                    <Categories />
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                    <Investment />
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                    <Privacy />
                </ScrollReveal>
                <ScrollReveal delay={0.3}>
                    <OutreachHub />
                </ScrollReveal>
                <ScrollReveal delay={0.4}>
                    <News />
                </ScrollReveal>
                <ScrollReveal delay={0.5}>
                    <Testimonials />
                </ScrollReveal>
                <ScrollReveal delay={0.6}>
                    <Partners />
                </ScrollReveal>
                <ScrollReveal delay={0.7}>
                    <Contributors />
                </ScrollReveal>
            </div>
            <AppLink />
        </div>
    )
}
