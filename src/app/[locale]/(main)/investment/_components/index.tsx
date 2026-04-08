import Breadcrumb from "@/components/common/breadcrumb"
import { useTranslations } from "next-intl"
import LeftSide from "./left-side"
import RightSide from "./right-side"

const Index = () => {
    const t = useTranslations()
    return (
        <div className="home-container clamp-[pt,0,10] clamp-[pb,5rem,7.5rem]">
            <Breadcrumb
                className="hidden md:flex"
                crumbs={[{ label: t("investmentMarket") }]}
            />
            <div className="flex flex-col md:flex-row gap-8 md:gap-6 clamp-[mt,2,6]">
                <LeftSide />
                <RightSide />
            </div>
        </div>
    )
}

export default Index
