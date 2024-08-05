// Style
import { SteamLogoIndividual } from '@components/separator/assets'
import './index.css'
import { useContext, useEffect, useState } from 'react'
import { URL_API } from '@constants'
import { useNavigate } from 'react-router-dom'
import { CompleteTransition, ModifyTransition } from 'hooks'
import { PageTransitionContext } from 'context'

export default function Login() {

    const { ModifyPageTransition } = useContext(PageTransitionContext)

    const RedirectMediumEffect = () => ModifyTransition(ModifyPageTransition)
    const RedirectEffect = () => CompleteTransition(ModifyPageTransition)

    const [Mail, setMail] = useState("")
    const [Password, setPassword] = useState("")

    const navigate = useNavigate();

    const RequestData = async () => {
        RedirectMediumEffect()
        try {
            const response = await fetch(`${URL_API}/api/v1/profile/login`, {
                method: "post",
                credentials: 'include',
                body: JSON.stringify({
                    mail: Mail,
                    password: Password
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                RedirectEffect()
                throw new Error('Error en la solicitud');
            }

            const data = await response.json();
            if (data.status === 404) return
            localStorage.setItem("UserData", JSON.stringify(data))
            navigate("/"); // Redirecciona a la página principal
        } catch (error) {
            RedirectEffect()
            console.error('Error al realizar la solicitud:', error);
        }
    }

    useEffect(() => {
        document.title = `Inicar sesion - Steam AI`
        CompleteTransition(ModifyPageTransition)
    }, [])

    return (
        <div id="SteamLogin">
            <div id="SteamLogin-Form">
                <div id="SteamLogin-FormElement">
                    <div id="SteamLogin-FormElement-Title">
                        <SteamLogoIndividual />
                        <h1>Iniciar sesión</h1>
                    </div>
                    <div className="SteamLogin-FormElement-Inputs">
                        <span className="SteamLogin-FormElement-InputsTitle">
                            Correo Electronico
                        </span>
                        <input className='SteamLogin-FormElement-InputsElements' type="email" value={Mail} id='mail' name='mail' required onChange={e => setMail(e.target.value)} />
                    </div>
                    <div className="SteamLogin-FormElement-Inputs">
                        <label className="SteamLogin-FormElement-InputsTitle">
                            Contraseña
                        </label>
                        <input className='SteamLogin-FormElement-InputsElements' type="password" value={Password} id='password' name='password' required onChange={e => setPassword(e.target.value)} />
                    </div>
                </div>
                <div id="SteamLogin-FormSubmit">
                    <button type="submit" onClick={RequestData} id="SteamLogin-FormSubmit-Button">
                        Iniciar Sesion
                    </button>
                </div>
            </div>
        </div>
    )
}