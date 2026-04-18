"use client"

import Modal from "@/components/common/modal"
import { Separator } from "@/components/ui/separator"
import { useModal } from "@/hooks/use-modal"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { Star } from "lucide-react"
import { Review } from "../../../_types"
import { ReviewCard } from "./review-card"

interface AllReviewersProps {
    reviews: Review[]
    rating: number
    totalCount: number
}

export const AllReviewers = ({
    reviews,
    rating,
    totalCount,
}: AllReviewersProps) => {
    const { closeModal } = useModal(MODAL_KEYS.ALL_REVIEWS_MODAL)

    return (
        <Modal
            onClose={closeModal}
            modalKey={MODAL_KEYS.ALL_REVIEWS_MODAL}
            className="w-full h-[100dvh] max-h-[100dvh] max-w-full rounded-none p-0 flex flex-col overflow-hidden sm:h-auto sm:max-h-[90vh] sm:max-w-4xl sm:rounded-3xl border-0 sm:border"
            closeButtonClassName="top-[22px] right-5 sm:top-[40px] sm:right-8"
        >
            {/* Fixed Header */}
            <div className="shrink-0 pt-5 pb-5 px-5  sm:pb-6 sm:px-8 border-b border-border">
                <div className="flex items-center gap-2.5">
                    <Star className="size-6 sm:size-7 fill-[#ADC227] text-[#ADC227]" />
                    <span className="text-[22px] sm:text-2xl font-bold text-foreground leading-none">
                        Rating {rating.toFixed(1)} • {totalCount} reviews
                    </span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-2">
                <div className="flex flex-col gap-6 mt-4 sm:mt-2 pb-10">
                    {reviews.map((review, index) => (
                        <div key={review.id}>
                            <ReviewCard review={review} className="py-0" />
                            {index < reviews.length - 1 && (
                                <Separator className="mt-6" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    )
}
