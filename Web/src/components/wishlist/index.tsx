import { useRef, ComponentProps, useState } from 'react'
import './index.css'
import { WishlistIcon } from './assets/icons'

type SteamSwitchProps = ComponentProps<"input">
export default function SteamWishlist(props: SteamSwitchProps) {

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

  return (
    <div>
      <input type="checkbox" name="Checkbox" ref={InputCheckboxElement} aria-hidden hidden {...props} />
      <div onClick={Execute} className={`SteamWishlist ${SwitchState ? States.Active : States.Desactive}`}>
        <WishlistIcon state={SwitchState}/>
      </div>
    </div>
  )
}
