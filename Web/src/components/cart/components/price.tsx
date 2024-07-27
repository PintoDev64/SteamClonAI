import { Monhts } from "../constants";
import { CalculatePriceDiscount } from "../utils"

type ProductPriceProps = { mode?: "Huge" | "Small", price: number, discount?: number, date?: DatePattern | string }
export default function ProductPrice({ mode = "Huge", price, discount, date }: ProductPriceProps) {
    if (discount && date) {
        const DateFormated = date.split("-")
        const GetMonth = parseInt(DateFormated[1])
        return (
            <>
                <span className={`SteamCart${mode}-DiscountDate`}>
                    Hasta {DateFormated[0]} {Monhts[GetMonth]}
                </span>
                <div className={`SteamCart${mode}-Price`}>
                    <ProductPercentage mode={mode} price={price} discount={discount} />
                    <div className={`SteamCart${mode}-PriceContainer`}>
                        <span className={`SteamCart${mode}-PriceContainer-Real`}>
                            $ {discount}
                        </span>
                        <span className={`SteamCart${mode}-PriceContainer-Discount`}>
                            $ {price}
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