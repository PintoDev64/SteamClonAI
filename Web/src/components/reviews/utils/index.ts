export function calculateReviewPercentage(good: number, bad: number) {
    const TotalReviews = good + bad
    const GoodPercentage = parseInt(`${(good / TotalReviews) * 100}`); 
    const BadPercentage = parseInt(`${(bad / TotalReviews) * 100}`); 
    return {
        GoodPercentage,
        BadPercentage
    }
}