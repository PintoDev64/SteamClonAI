import { useLoaderData } from "react-router-dom"

// Styles
import './index.css'
import { useContext, useEffect } from "react"
import { ProfileContext } from "context"
import Details from "./components/Details"
import Main from "./components/Main"

export default function ProfilePage() {

    const { data } = useLoaderData() as RequestAPI.Profile_API
    const { LIBRARY, PROFILE_NAME, PROFILE_PICTURE, REAL_NAME, STATUS, THEME, ITEMS } = data

    const { EditProfile } = useContext(ProfileContext)

    useEffect(() => {
        EditProfile({
            Library: LIBRARY,
            ProfileName: PROFILE_NAME,
            ProfilePicure: PROFILE_PICTURE,
            RealName: REAL_NAME,
            Status: STATUS,
            Theme: THEME,
            Items: ITEMS
        })
    }, [])

    return (
        <div id="SteamProfile">
            <div id="SteamProfileContent">
                <Details />
                <Main />
            </div>
        </div>
    )
}