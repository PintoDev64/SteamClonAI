import { PageTransitionContext } from 'context'
import { PageTransition } from 'context/context'
import { useReducer } from 'react'

export default function PageTransitionProvider({ children }: PageTransition.ProviderProps) {

    const defineVariables: PageTransition.ProviderVariables = {
        loader: 0,
        children
    }
    
    function PageTransitionReducer(state: PageTransition.ProviderVariables, { action, value }: PageTransition.ReducerObject) {
        return {
            ...state,
            [action]: value
        }
    }

    const [PageTransitionState, dispatch] = useReducer(PageTransitionReducer, defineVariables, undefined)

    function ModifyPageTransition(value: number) {
        dispatch({
            action: "loader",
            value
        })
    }

    return (
        <PageTransitionContext.Provider value={{
            loader: PageTransitionState.loader,
            ModifyPageTransition
        }}>
            {children}
        </PageTransitionContext.Provider>
    )
}
