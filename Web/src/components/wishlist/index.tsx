import { useRef, ComponentProps, useState, useEffect } from 'react'
import './index.css'
import { WishlistIcon } from './assets/icons'

type SteamSwitchProps = { mode: "Square" | "Normal", state?: boolean, wishlistFunction: (state: boolean) => void } & ComponentProps<"input">
export default function SteamWishlist({ mode, state, wishlistFunction, ...props }: SteamSwitchProps) {

  enum States {
    Active = "Active",
    Desactive = "Desactive"
  }

  const InputCheckboxElement = useRef<HTMLInputElement>(null!)
  const [SwitchState, setSwitchState] = useState(state ?? false)

  function Execute() {
    setSwitchState(!SwitchState)
    InputCheckboxElement.current.checked = !SwitchState
    wishlistFunction(!SwitchState)
  }

  useEffect(() => {
    setSwitchState(state ?? false)
  }, [state])

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
