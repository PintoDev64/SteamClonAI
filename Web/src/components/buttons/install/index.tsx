import { ComponentProps } from 'react'
// Assets
import { InstallIcon } from '../assets/icons'
// Styles
import '../index.css'

type InstallProps = ComponentProps<"button">
export default function Install(props: InstallProps) {
    return (
        <button className="SteamButton-Install" {...props}>
            <div className="SteamButton-InstallIcon">
                <InstallIcon />
            </div>
            <span className='SteamButton-InstallText'>Instalar</span>
        </button>
    )
}