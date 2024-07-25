import { ComponentProps } from 'react'
// Assets
import { PlayIcon } from '../assets/icons'
// Styles
import '../index.css'

type PlayProps = ComponentProps<"button">
export default function Play(props: PlayProps) {
    return (
        <button className="SteamButton-Play" {...props}>
            <div className="SteamButton-PlayIcon">
                <PlayIcon />
            </div>
            <span className='SteamButton-PlayText'>Jugar</span>
        </button>
    )
}