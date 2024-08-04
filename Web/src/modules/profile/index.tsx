import { useLoaderData } from "react-router-dom"

// Styles
import './index.css'

export default function ProfilePage() {

    const RequestData = useLoaderData() as RequestAPI.Home_APIStore

    console.log(RequestData);

    return (
        <div id="SteamProfile">

        </div>
    )
}