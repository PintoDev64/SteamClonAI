import { UserContext } from "context"
import { User } from "context/context"
import { useReducer } from "react"

export default function UserProvider({ children }: User.ProviderProps) {

    const defaultVariables: User.ProviderVariables = {
        Currency: 0,
        Name: "",
        Picture: 2,
        PublicId: ""
    }

    function UserReducer(state: User.ProviderVariables, { action, value }: User.ReducerObject) {
        return {
            ...state,
            [action]: value
        }
    }

    const [UserState, dispatch] = useReducer(UserReducer, defaultVariables, undefined)

    function EditUser(User: User.ProviderVariables) {
        dispatch(User)
    }

    return (
        <UserContext.Provider value={{
            User: { ...UserState },
            EditUser
        }}>
            {children}
        </UserContext.Provider>
    )
}
