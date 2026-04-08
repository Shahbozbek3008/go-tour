import { IconCheckCircle } from "@/assets/icons/check-circle"
import { IconCheckCircleGradient } from "@/assets/icons/check-circle-gradient"
import { IconEllipsisCircleGradient } from "@/assets/icons/ellipsis-circle-gradient"
import { IconSparkle } from "@/assets/icons/sparkle"
import { IconWarningCircleGradient } from "@/assets/icons/warning-circle-gradient"
import ClientImg from "@/components/common/client-img"

interface Props {
    index: number
}

export default function Row({ index }: Props) {
    return (
        <main className="bg-background rounded-xl border-stroke-gray py-5 px-8 grid grid-cols-[0.5fr_1fr_5fr_5fr_5fr] clamp-[gap,0,8] items-center">
            <span className="text-xl font-extrabold text-text-300">
                #{index + 4}
            </span>

            <ClientImg
                src="https://imageio.forbes.com/specials-images/imageserve/66f7ff378cece7f2c6fbee8f/TechCrunch-Disrupt-NY-2017---Day-3/960x0.jpg?height=474&width=711&fit=bounds"
                alt="user"
                wrapperClassName="rounded-full w-14 h-14 mr-6"
            />

            <div>
                <p className="font-medium text-lg">Davronbek Turdiyev</p>
                <p className="font-medium text-text-500">
                    CEO & CO-Founder @Figma
                </p>
            </div>

            <hgroup className="py-3 px-4 clamp-[mx,0,5] inline-flex items-center justify-between gap-4 rounded-xl bg-primary-8-lighter">
                <div className="flex items-center gap-2.5">
                    <IconSparkle />
                    <span className="text-gradient font-semibold text-3xl">
                        781
                    </span>
                </div>
                <span className="font-medium text-text-300">Contributions</span>
            </hgroup>

            <hgroup className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                    <IconWarningCircleGradient className="icon" />
                    <span className="text-lg font-medium text-text-400">
                        345
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <IconEllipsisCircleGradient className="icon" />
                    <span className="text-lg font-medium text-text-400">
                        345
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <IconCheckCircleGradient className="check-icon-gradient" />
                    <IconCheckCircle className="check-icon-white hidden" />
                    <span className="text-lg font-medium text-text-400">
                        345
                    </span>
                </div>
            </hgroup>
        </main>
    )
}
