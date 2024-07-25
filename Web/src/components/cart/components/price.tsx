import { Monhts } from "../constants";
import { CalculatePriceDiscount } from "../utils"

type ProductPriceProps = { price: number, discount?: number, date?: DatePattern | string }
export default function ProductPrice({ price, discount, date }: ProductPriceProps) {
    if (discount && date) {
        console.log(date.split("-"));
        const DateFormated = date.split("-")
        const GetMonth = parseInt(DateFormated[1])
        return (
            <>
                <span className="SteamCart-DiscountDate">
                    Hasta el {DateFormated[0]} de {Monhts[GetMonth]}
                </span>
                <div className="SteamCart-Price">
                    <ProductPercentage price={price} discount={discount} />
                    <div className="SteamCart-PriceContainer">
                        <span className="SteamCart-PriceContainer-Real">
                            ${discount}
                        </span>
                        <span className="SteamCart-PriceContainer-Discount">
                            ${price}
                        </span>
                    </div>
                </div>
            </>
        )
    }
    return (
        <div className="SteamCart-Price">
            <span className="SteamCart-Prices-Normal">
                ${price}
            </span>
        </div>
    )
}

type ProductPercentageProps = { price: number, discount: number }
function ProductPercentage({ price, discount }: ProductPercentageProps) {
    const DiscountValue = CalculatePriceDiscount(price, discount)
    return (
        <div className="SteamCart-PricePercentage">
            <span className="SteamCart-PricePercentageText">-{DiscountValue}%</span>
        </div>
    )
}