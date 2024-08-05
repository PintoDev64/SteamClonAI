import { ProfileContext } from "context"
import { Profile } from "context/context"
import { useReducer } from "react"

export default function ProfileProvider({ children }: Profile.ProviderProps) {

    const defaultVariables: Profile.ProviderVariables = {
        Library: null,
        ProfileName: "",
        ProfilePicure: 1,
        Theme: 1,
        RealName: "",
        Status: "Offline",
        Items: null
    }

    function ProfileReducer(_state: Profile.ProviderVariables, data: Profile.ReducerObject) {
        return data
    }

    const [ProfileState, dispatch] = useReducer(ProfileReducer, defaultVariables, undefined)

    function EditProfile(User: Profile.ProviderVariables) {
        dispatch(User)
    }

    return (
        <ProfileContext.Provider value={{
            Profile: { ...ProfileState },
            EditProfile
        }}>
            {children}
        </ProfileContext.Provider>
    )
}
