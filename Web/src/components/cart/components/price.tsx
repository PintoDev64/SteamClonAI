import { Monhts } from "../constants";
import { CalculatePriceDiscount } from "../utils"

type ProductPriceProps = { ActiveDate: boolean ,mode?: "Huge" | "Small", price: number, discount?: number, date?: DatePattern | string }
export default function ProductPrice({ ActiveDate = true, mode = "Huge", price, discount, date }: ProductPriceProps) {
    if (discount && date) {
        const DateFormated = date.split("-")
        const GetMonth = parseInt(DateFormated[1])
        return (
            <>
                {ActiveDate && <span className={`SteamCart${mode}-DiscountDate`}>
                    Hasta {DateFormated[0]} {Monhts[GetMonth]}
                </span>}
                <div className={`SteamCart${mode}-Price`}>
                    <ProductPercentage mode={mode} price={price} discount={discount} />
                    <div className={`SteamCart${mode}-PriceContainer`}>
                        <span className={`SteamCart${mode}-PriceContainer-Real`}>
                            $ {price}
                        </span>
                        <span className={`SteamCart${mode}-PriceContainer-Discount`}>
                            $ {discount}
                        </span>
                    </div>
                </div>
            </>
        )
    }
    return (
        <div className={`SteamCart${mode}-Price`}>
            <span className={`SteamCart${mode}-Prices-Normal`}>
                {price === 0 ? "Gratuito" : `$ ${price}`}
            </span>
        </div>
    )
}

type ProductPercentageProps = { mode?: "Huge" | "Small", price: number, discount: number }
function ProductPercentage({ mode = "Huge", price, discount }: ProductPercentageProps) {
    const DiscountValue = CalculatePriceDiscount(price, discount)
    return (
        <div className={`SteamCart${mode}-PricePercentage`}>
            <span className={`SteamCart${mode}-PricePercentageText`}>-{DiscountValue}%</span>
        </div>
    )
}