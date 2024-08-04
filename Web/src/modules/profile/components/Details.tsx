import { Images } from "@constants"
import { ProfileContext } from "context"
import { useContext } from "react"
import { useParams } from "react-router-dom"

export default function Details() {

    const { userId } = useParams()

    const { Profile } = useContext(ProfileContext)

    const { PublicId } = JSON.parse(localStorage.getItem("UserData")!)

    const EvalEditProfile = PublicId === userId

    return (
        <div id="SteamProfileContent-Details">
            <div id="SteamProfileContent-DetailsMain">
                <img src={Images[Profile.ProfilePicure]} alt={Profile.ProfileName} id="SteamProfileContent-DetailsMain-Image" />
                <div id="SteamProfileContent-DetailsMain-Content">
                    <h1>{Profile.ProfileName}</h1>
                </div>
            </div>
            <div id="SteamProfileContent-DetailsSide">
                <div id="SteamProfileContent-DetailsSide-EditProfile">
                    {EvalEditProfile && <button id="SteamProfileContent-DetailsSide-EditProfile-Button">Editar Perfil</button>}
                </div>
                <div id="SteamProfileContent-DetailsSide-Feature">
                    <div className="SteamProfileContent-DetailsSide-FeatureElement">
                        <div className="SteamProfileContent-DetailsSide-FeatureElement-Level">
                            <span>1</span>
                        </div>
                        <div className="SteamProfileContent-DetailsSide-FeatureElement-Details">
                            <span>Level</span>
                            <span>1,000 XP</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}