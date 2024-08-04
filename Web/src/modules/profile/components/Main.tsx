import { ProfileContext } from "context"
import { useContext } from "react"
import { Link } from "react-router-dom";

export default function Main() {

    const { Profile } = useContext(ProfileContext);

    const SideElements = [
        {
            name: "Games",
            url: "games",
            value: Profile.Library?.length ?? 0,
        }
    ]

    return (
        <div id="SteamProfileContent-Main">
            <div id="SteamProfileContent-MainContent">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
            <div id="SteamProfileContent-MainSide">
                <div className="SteamProfileContent-MainSideElement">
                    <span>Estado</span>
                    <span>{Profile.Status}</span>
                </div>
                {SideElements.map(({ name, url, value }) =>
                    <>
                        <Link to={url}>
                            <div className="SteamProfileContent-MainSideElement">
                                <span>{name}</span>
                                <span>{value}</span>
                            </div>
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}