// Styles
import { useContext, useEffect } from 'react'
import './index.css'
import { PageTransitionContext, ProfileContext } from 'context';
import { CompleteTransition } from 'hooks';

export default function ProfileMain() {

    const { ModifyPageTransition } = useContext(PageTransitionContext)

    const { Profile } = useContext(ProfileContext);
    const { ProfileName } = Profile

    useEffect(() => {
        document.title = `${ProfileName} - Steam AI`
    }, [ProfileName])

    useEffect(() => CompleteTransition(ModifyPageTransition), [])

    return (
        <div id='SteamProfileContent-HomePage'>
            <div id="SteamProfileContent-HomePageTitle">
                <h2>Hola, Bienvenido a mi perfil de SteamAI 😄</h2>
            </div>
        </div>
    )
}
