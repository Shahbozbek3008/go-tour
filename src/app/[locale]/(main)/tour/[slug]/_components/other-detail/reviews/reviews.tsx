import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useModal } from "@/hooks/use-modal"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { ReviewsSectionProps } from "../../../_types"
import { AllReviewers } from "./all-reviewers"
import { RatingSummary } from "./rating-summary"
import { ReviewCard } from "./review-card"

export const Reviews = ({
    rating,
    totalCount,
    reviews,
}: ReviewsSectionProps) => {
    const { isOpen, openModal } = useModal(MODAL_KEYS.ALL_REVIEWS_MODAL)

    return (
        <section className="w-full">
            <RatingSummary rating={rating} totalCount={totalCount} />
            <Separator />
            {reviews.map((review, index) => (
                <div key={review.id}>
                    <ReviewCard review={review} />
                    {index < reviews.length - 1 && <Separator />}
                </div>
            ))}
            <Separator className="mb-1" />
            <div className="mt-5">
                <Button
                    size="lg"
                    className="text-sm font-semibold bg-[#f0f2f5] hover:bg-[#e4e6e9] text-black"
                    onClick={openModal}
                >
                    All reviews ({totalCount})
                </Button>
            </div>
            {isOpen && (
                <AllReviewers
                    reviews={reviews}
                    rating={rating}
                    totalCount={totalCount}
                />
            )}
        </section>
    )
}
