import { ComponentProps } from 'react'
// Assets
import { PauseIcon } from '../assets/icons'
// Styles
import '../index.css'

type PauseProps = ComponentProps<"button">
export default function Pause(props: PauseProps) {
    return (
        <button className="SteamButton-Pause" {...props}>
            <div className="SteamButton-PauseIcon">
                <PauseIcon />
            </div>
            <span className='SteamButton-PauseText'>Pausar</span>
        </button>
    )
}