import { useRef, ComponentProps, useState } from 'react'
import './index.css'
import { WishlistIcon } from './assets/icons'

type SteamSwitchProps = { mode: "Square" | "Normal" } & ComponentProps<"input">
export default function SteamWishlist({ mode, ...props }: SteamSwitchProps) {

  enum States {
    Active = "Active",
    Desactive = "Desactive"
  }

  const InputCheckboxElement = useRef<HTMLInputElement>(null!)
  const [SwitchState, setSwitchState] = useState(false)

  function Execute() {
    setSwitchState(!SwitchState)
    InputCheckboxElement.current.checked = !SwitchState
  }

  if (mode === "Square") {
    return (
      <div>
        <input type="checkbox" name="Checkbox" ref={InputCheckboxElement} aria-hidden hidden {...props} />
        <div onClick={Execute} className={`SteamWishlistSquare ${SwitchState ? States.Active : States.Desactive}`}>
          <WishlistIcon state={SwitchState} />
        </div>
      </div>
    )
  }
  return (
    <div>
      <input type="checkbox" name="Checkbox" ref={InputCheckboxElement} aria-hidden hidden {...props} />
      <div onClick={Execute} className={`SteamWishlistNormal ${SwitchState ? States.Active : States.Desactive}`}>
        <span className="SteamWishlistNormal-Text">Deseados</span>
        <WishlistIcon state={SwitchState} />
      </div>
    </div>
  )
}
