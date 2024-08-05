import { ProfileContext } from "context"
import { useContext } from "react"
import { Link, useLocation, useParams } from "react-router-dom"

export default function Details() {

    const { userId } = useParams()

    const { pathname } = useLocation()

    const { Profile } = useContext(ProfileContext)

    const comprobacion = pathname.includes(`/profile/${userId}/games`) || pathname.includes(`/profile/${userId}/wishlist`)

    return (
        <div id="SteamProfileContent-Details">
            <div id="SteamProfileContent-DetailsMain">
                <img src={Profile.ProfilePicure ?? "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} alt={Profile.ProfileName} id="SteamProfileContent-DetailsMain-Image" fetchPriority="high"/>
                <div id="SteamProfileContent-DetailsMain-Content">
                    <h1>{Profile.ProfileName}</h1>
                    <p>{Profile.RealName}</p>
                </div>
            </div>
            <div id="SteamProfileContent-DetailsSide">
                <div id="SteamProfileContent-DetailsSide-EditProfile">
                    {comprobacion &&
                        <Link to={`/profile/${userId}`} className="SteamProfileContent-DetailsSide-EditProfile-Button">
                            Volver al perfil
                        </Link>}
                    {/* {UserData && <button className="SteamProfileContent-DetailsSide-EditProfile-Button">Editar Perfil</button>} */}
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
                    <div className="SteamProfileContent-DetailsSide-FeatureElement">
                        <div className="SteamProfileContent-DetailsSide-FeatureElement-Level">
                            <img src="/6YearofService.png" alt="Steam 6 Years" width={49} height={49} />
                        </div>
                        <div className="SteamProfileContent-DetailsSide-FeatureElement-Details">
                            <span>6 Años de servicio</span>
                            <span>300 XP</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}