import { URL_API } from "@constants";
import { UserContext } from "context"
import { User } from "context/context"
import { useEffect, useReducer } from "react"
import { io } from "socket.io-client";

export default function UserProvider({ children }: User.ProviderProps) {

    const defaultVariables: User.ProviderVariables = {
        Currency: 0,
        Library: null,
        Name: "",
        Picture: "",
        PublicId: "",
        Wishlist: null
    }

    function UserReducer(_state: User.ProviderVariables, data: User.ReducerObject) {
        return data
    }

    const [UserState, dispatch] = useReducer(UserReducer, defaultVariables, undefined)

    useEffect(() => {
        if (UserState.PublicId && UserState.PublicId.length > 0) {
            io(`${URL_API}/status`, {                
                withCredentials: true,
                query: {
                    yourPublicId: UserState.PublicId
                }
            })
        }
    }, [UserState])

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
