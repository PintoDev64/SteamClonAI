export function CalculatePriceDiscount(price: number, discount: number) {
    const TotalDiscount = price - discount;
    return parseInt(`${(TotalDiscount / price) * 100}`)
}