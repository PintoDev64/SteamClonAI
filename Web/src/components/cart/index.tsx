// Styles
import ProductPrice from './components/price'
import './index.css'

type AddtoCartProps = {
    price: number,
    discount?: number,
    discountDate?: DatePattern
}
export default function AddtoCart({ price, discount, discountDate }: AddtoCartProps) {
  return (
    <div className="SteamCart">
        <ProductPrice price={price} discount={discount} date={discountDate}/>
        <button className="SteamCart-Button">
            <span className="SteamCart-ButtonText">Add to Cart</span>
        </button>
    </div>
  )
}
