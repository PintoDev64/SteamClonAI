import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Contexts
import { PageTransitionContext } from "context";

// Hooks
import { CompleteTransition, ModifyTransition } from "hooks";

// Assets
import { SteamLogoIndividual } from "@components/separator/assets";

// Constants
import { URL_API } from "@constants";

// Styles
import './index.css'

export default function RegisterPage() {

    const { ModifyPageTransition } = useContext(PageTransitionContext)

    const navigate = useNavigate();

    const RedirectMediumEffect = () => ModifyTransition(ModifyPageTransition)
    const RedirectEffect = () => CompleteTransition(ModifyPageTransition)

    const [FormData, setFormData] = useState<{ [t: string]: string }>({
        AccountName: "",
        realName: "",
        mail: "",
        password: "",
        profilePicture: ""
    })
    const [ErrorMessage, setErrorMessage] = useState<string | null>(null)

    const RequestData = async () => {
        RedirectMediumEffect()
        try {
            const response = await fetch(`${URL_API}/api/v1/profile/register`, {
                method: "post",
                credentials: 'include',
                body: JSON.stringify(FormData),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                RedirectEffect()
                throw new Error('Error en la solicitud');
            }

            const data = await response.json();

            console.log(data);

            if (data.status === 404) throw new Error("Los datos no son validos")
            if (data.status === 500) throw new Error("No se proceso el registro")

            localStorage.setItem("UserData", JSON.stringify(data))

            navigate("/login");
        } catch (err) {
            RedirectEffect()
            setErrorMessage((err as { name: string, message: string, stack?: string }).message);
        }
    }

    useEffect(() => {
        document.title = `Registrarse - Steam AI`
        CompleteTransition(ModifyPageTransition)
    }, [])

    return (
        <div id="SteamRegister">
            <div id="SteamRegister-Form">
                <div id="SteamRegister-FormElement">
                    <div id="SteamRegister-FormElement-Title">
                        <SteamLogoIndividual />
                        <h1>Registrate</h1>
                    </div>
                    <div id="SteamRegister-Image">
                        <img src={FormData.profilePicture.length !== 0 ? FormData.profilePicture : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} alt="" id="SteamRegister-ImageElement" width={100} height={100} />
                        <div id="SteamRegister-Image-Form">
                            <label className="SteamRegister-Image-Form-InputsTitle">
                                {"Foto de perfil (URL)"}
                            </label>
                            <input className='SteamRegister-Image-Form-InputsElements' type="text" autoComplete="url" value={FormData.profilePicture} name='mail' required onChange={e => setFormData({ ...FormData, profilePicture: e.target.value })} placeholder="https://domain.com/image.png" />
                        </div>
                    </div>
                    <div className="SteamRegister-FormElement-Inputs">
                        <label className="SteamRegister-FormElement-InputsTitle">
                            Nombre Real
                        </label>
                        <input className='SteamRegister-FormElement-InputsElements' type="text" autoComplete="name" value={FormData.realName} name='mail' required onChange={e => setFormData({ ...FormData, realName: e.target.value })} placeholder="Pedro Sanchez" />
                    </div>
                    <div className="SteamRegister-FormElement-Inputs">
                        <label className="SteamRegister-FormElement-InputsTitle">
                            Nombre de la cuenta
                        </label>
                        <input className='SteamRegister-FormElement-InputsElements' type="text" autoComplete="username" value={FormData.AccountName} name='mail' required onChange={e => setFormData({ ...FormData, AccountName: e.target.value })} placeholder="PedroSteam" pattern="\S+" />
                    </div>
                    <div className="SteamRegister-FormElement-Inputs">
                        <label className="SteamRegister-FormElement-InputsTitle">
                            Correo Electronico
                        </label>
                        <input className='SteamRegister-FormElement-InputsElements' autoComplete="email" type="email" value={FormData.mail} name='mail' required onChange={e => setFormData({ ...FormData, mail: e.target.value.replace(/ /g, "") })} pattern="\S+" placeholder="pedrosanchez@domain.com" />
                    </div>
                    <div className="SteamRegister-FormElement-Inputs">
                        <label className="SteamRegister-FormElement-InputsTitle">
                            Contraseña
                        </label>
                        <input className='SteamRegister-FormElement-InputsElements' type="password" autoComplete="new-password" value={FormData.password} id='password' name='password' required onChange={e => setFormData({ ...FormData, password: e.target.value })} pattern="\S+" />
                    </div>
                </div>
                {ErrorMessage && <span id="SteamRegister-FormError">{ErrorMessage}</span>}
                <div id="SteamRegister-FormSubmit">
                    <button type="submit" onClick={RequestData} id="SteamRegister-FormSubmit-Button">
                        Registrarse
                    </button>
                </div>
            </div>
        </div>
    )
}