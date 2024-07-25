import { useRef, ComponentProps, useState } from 'react'
import './index.css'
import { CheckboxIcon } from './assets/icons'

type SteamSwitchProps = ComponentProps<"input">
export default function SteamCheckbox(props: SteamSwitchProps) {

    enum States {
        Active = "Active",
        Desactive = "Desactive"
    }

    const InputCheckboxElement = useRef<HTMLInputElement>(null!)
    const [CheckboxState, setCheckboxState] = useState(false)

    function Execute() {
        setCheckboxState(!CheckboxState)
        InputCheckboxElement.current.checked = !CheckboxState
    }

    return (
        <div>
            <input type="checkbox" name="Checkbox" ref={InputCheckboxElement} aria-hidden hidden {...props} />
            <div onClick={Execute} className="SteamCheckbox">
                <div className={`SteamCheckboxElement ${CheckboxState ? States.Active : States.Desactive}`}>
                    { CheckboxState && <CheckboxIcon /> }
                </div>
            </div>
        </div>
    )
}
