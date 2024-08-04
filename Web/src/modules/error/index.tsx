// Styles
import { useContext, useEffect } from "react"
import "./index.css"
import { PageTransitionContext } from "context"
import { CompleteTransition, ModifyTransition } from "hooks"
import CustomButton from "@components/buttons/custom"

export default function ErrorPage() {

    const { ModifyPageTransition, loader } = useContext(PageTransitionContext)

    const RedirectMediumEffect = () => ModifyTransition(ModifyPageTransition)
    const RedirectEffect = () => loader === 50 ? CompleteTransition(ModifyPageTransition) : (() => {})()

    useEffect(RedirectEffect, [loader])

    return (
        <div id="SteamError">
            <h1 id="SteamError-Title" >{"Hubo un problema al cargar la pagina :("}</h1>
            <CustomButton id="SteamError-Button" text="Volver al Inicio" type="a" onClick={RedirectMediumEffect}/>
        </div>
    )
}