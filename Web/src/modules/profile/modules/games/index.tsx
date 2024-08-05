import { ProfileContext } from "context"
import { useContext } from "react"

// Styles
import './index.css'
import { Link } from "react-router-dom";

export default function ProfileGames() {

    const { Profile } = useContext(ProfileContext);

    const { ProfileName, Library } = Profile

    return (
        <div id="SteamProfileContent-GamesPage">
            <div id="SteamProfileContent-GamesPageTitle">
                <h2>Juegos de {ProfileName}</h2>
            </div>
            {
                Library
                    ?
                    Library.map(({ images, name, releaseDate, idGame, icon }) => {
                        const ImagesFilter = images.filter(({ type }) => type === "image")
                        return (
                            <div className="SteamProfileContent-GamesPageElements">
                                <img className="SteamProfileContent-GamesPageElements-Image" src={ImagesFilter[0].url} alt={name} width={216} height={101} />
                                <div className="SteamProfile-GamesPageElements-Container">
                                    <div className="SteamProfileContent-GamesPageElements-Data">
                                        <span className="SteamProfileContent-GamesPageElements-DataTitle">{name}</span>
                                        <span className="SteamProfileContent-GamesPageElements-ReleaseDate">{releaseDate.replace(/-/g, " ")}</span>
                                    </div>
                                    <Link className="SteamProfileContent-GamesPageElements-Store" to={`/game/${idGame}`}>
                                        <img className="SteamProfileContent-GamesPageElements-DataImage" src={icon} alt={name} width={30} height={30} />
                                        Ver en la tienda
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div className="SteamProfileContent-GamesPageElements">
                        <span id="SteamProfileContent-GamesPageElements-Null">{"Lo siento, no poseo juegos por el momento :("}</span>
                    </div>
            }
        </div>
    )
}