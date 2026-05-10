export function formatReviewCount(count: number): string {
    if (count === 1) return "1 review"
    if (count < 5) return `${count} reviews`
    return `${count} reviews`
}
