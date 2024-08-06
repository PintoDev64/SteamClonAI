import { ModalContext, PageTransitionContext } from "context"
import { CompleteTransition } from "hooks"
import { useContext, useEffect } from "react"

export default function ModalElement() {

    const { EditModal } = useContext(ModalContext)

    const { ModifyPageTransition } = useContext(PageTransitionContext)

    useEffect(() => {
        CompleteTransition(ModifyPageTransition)
    }, [])

    return (
        <div id="SteamModal">
            <div id="SteamModal-Element">
                <span>Tarea<br/>completada</span>
                <button onClick={() => EditModal({ Active: false })}>
                    Cerrar
                </button>
            </div>
        </div>
    )
}