// Styles
import ProductPrice from './components/price'
import './index.css'

type AddtoCartProps = {
  mode?: "Huge" | "Small"
  price: {
    value: number,
    discount?: number,
    discountDate?: DatePattern
  },
  ActiveDate?: boolean,
  text?: string,
}
export default function AddtoCart({ mode = "Huge", ActiveDate = true, price, text }: AddtoCartProps) {
  return (
    <div className={`SteamCart${mode}`}>
      <ProductPrice ActiveDate={ActiveDate} mode={mode} price={price.value} discount={price.discount} date={price.discountDate} />
      <button className={`SteamCart${mode}-Button`}>
        <span className={`SteamCart${mode}-ButtonText`}>{text ?? "Carrito"}</span>
      </button>
    </div>
  )
}
