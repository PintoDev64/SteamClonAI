import { useRef, ComponentProps, useState } from 'react'
import './index.css'

type SteamSwitchProps = ComponentProps<"input">
export default function SteamSwitch(props: SteamSwitchProps) {

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
      <div onClick={Execute} className={`SteamSwitch ${SwitchState ? States.Active : States.Desactive}`}>
        <div className={`SteamSwitchElement ${SwitchState ? States.Active : States.Desactive}`} />
      </div>
    </div>
  )
}