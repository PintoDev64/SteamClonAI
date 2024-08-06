// Styles
import { useContext, useEffect } from 'react'
import './index.css'
import { ProfileContext } from 'context';

export default function ProfileMain() {

    const { Profile } = useContext(ProfileContext);
    const { ProfileName } = Profile

    useEffect(() => {
        document.title = `${ProfileName} - Steam AI`
    }, [ProfileName])

    return (
        <div id='SteamProfileContent-HomePage'>
            <div id="SteamProfileContent-HomePageTitle">
                <h2>Hola, Bienvenido a mi perfil de SteamAI 😄</h2>
            </div>
        </div>
    )
}
