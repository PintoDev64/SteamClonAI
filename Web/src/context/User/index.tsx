import { UserContext } from "context"
import { User } from "context/context"

export default function UserProvider({ children }: User.ProviderProps) {

    const defaultVariables = {
        UserId: localStorage.getItem("UserId") ?? ""
    } as const

    return (
        <UserContext.Provider value={defaultVariables}>
            {children}
        </UserContext.Provider>
    )
}
