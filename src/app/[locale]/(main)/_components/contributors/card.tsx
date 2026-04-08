import { IconCheckCircle } from "@/assets/icons/check-circle"
import { IconCheckCircleGradient } from "@/assets/icons/check-circle-gradient"
import { IconEllipsisCircleGradient } from "@/assets/icons/ellipsis-circle-gradient"
import { IconSparkle } from "@/assets/icons/sparkle"
import { IconWarningCircleGradient } from "@/assets/icons/warning-circle-gradient"
import ClientImg from "@/components/common/client-img"
import ClientTranslate from "@/components/common/translation/client-translate"

interface Props {
    index: number
}

export default function ContributorsCard({ index }: Props) {
    return (
        <article className="relative rounded-md p-[1px] hover:[&_.content]:gradient-2 hover:[&_.bg]:blur transition-all">
            <div className="bg absolute top-0 left-0 w-full h-full gradient-2 rounded-md transition-all duration-300" />
            <div className="content relative z-10 bg-background hover:bg-linear-[220deg] from-[#00BCE6] from-[13%] to-[#D500F9] to-100% hover:text-background hover:[&_.contributions-badge]:bg-background hover:[&_.footer-stats_span]:text-background hover:[&_.footer-stats_.icon_path]:fill-background hover:[&_.check-icon-gradient]:hidden hover:[&_.check-icon-white]:inline rounded-md flex flex-col items-center justify-center p-6 transition-all">
                <hgroup className="relative mb-6">
                    <ClientImg
                        src="https://imageio.forbes.com/specials-images/imageserve/66f7ff378cece7f2c6fbee8f/TechCrunch-Disrupt-NY-2017---Day-3/960x0.jpg?height=474&width=711&fit=bounds"
                        alt="user"
                        wrapperClassName="rounded-full w-[6.25rem] h-[6.25rem] lg:w-28 lg:h-28"
                    />
                    <span className="gradient-2 w-9 h-9 rounded-full font-extrabold text-xl grid place-items-center absolute top-0 -right-1">
                        #{index + 1}
                    </span>
                </hgroup>

                <div className="mb-8 text-center">
                    <h4 className="font-semibold lg:text-2xl text-[1.375rem]">
                        Naval Ravikant
                    </h4>
                    <p className="font-medium lg:text-base text-sm">
                        CEO & CO-Founder @Figma
                    </p>
                </div>

                <hgroup className="contributions-badge py-3 px-4 flex items-center gap-4 rounded-xl bg-primary-8-lighter mb-12">
                    <div className="flex items-center gap-2.5">
                        <IconSparkle />
                        <span className="text-gradient font-semibold text-3xl">
                            781
                        </span>
                    </div>
                    <span className="font-medium text-text-300 lg:text-base text-sm">
                        <ClientTranslate translationKey="contributions" />
                    </span>
                </hgroup>

                <hgroup className="footer-stats flex justify-between w-full">
                    <div className="flex items-center gap-3">
                        <IconWarningCircleGradient className="icon" />
                        <span className="lg:text-lg text-base font-medium text-text-400">
                            345
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <IconEllipsisCircleGradient className="icon" />
                        <span className="lg:text-lg text-base font-medium text-text-400">
                            345
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <IconCheckCircleGradient className="check-icon-gradient" />
                        <IconCheckCircle className="check-icon-white hidden" />
                        <span className="lg:text-lg text-base font-medium text-text-400">
                            345
                        </span>
                    </div>
                </hgroup>
            </div>
        </article>
    )
}
