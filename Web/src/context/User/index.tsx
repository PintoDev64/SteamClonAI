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

    function UserReducer(_state: User.ProviderVariables, data: User.ReducerObject) {
        return data
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
