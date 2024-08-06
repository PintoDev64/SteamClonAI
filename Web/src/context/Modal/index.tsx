import { ModalContext } from "context";
import { Modal } from "context/context";
import { useReducer } from "react";

export default function ModalProvider({ children }: Modal.ProviderProps) {
    const defineVariables: Modal.ProviderVariables = {
        Active: false
    }

    function PageTransitionReducer(state: Modal.ProviderVariables, { Active }: Modal.ReducerObject) {
        return {
            Active
        }
    }

    const [ModalState, dispatch] = useReducer(PageTransitionReducer, defineVariables, undefined)

    function EditModal(value: Modal.ProviderVariables) {
        dispatch(value)
    }

    return (
        <ModalContext.Provider value={{
            Active: ModalState.Active,
            EditModal
        }}>
            {children}
        </ModalContext.Provider>
    )
}