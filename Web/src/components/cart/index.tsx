// Styles
import { ComponentProps } from 'react'
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
  InLibrary?: boolean,
  ButtonProps?: ComponentProps<"button">
}
export default function AddtoCart({ mode = "Huge", ActiveDate = true, price, text, InLibrary = false, ButtonProps }: AddtoCartProps) {
  return (
    <div className={`SteamCart${mode}`}>
      <ProductPrice ActiveDate={ActiveDate} mode={mode} price={price.value} discount={price.discount} date={price.discountDate} />
      <button {...ButtonProps} className={`SteamCart${mode}-Button ${InLibrary && "InLibrary"}`} disabled={InLibrary}>
        <span className={`SteamCart${mode}-ButtonText`}>{InLibrary ? "En tu libreria" : text ?? "Carrito"}</span>
      </button>
    </div>
  )
}
