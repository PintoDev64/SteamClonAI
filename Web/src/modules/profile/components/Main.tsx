import { PageTransitionContext, ProfileContext } from "context"
import { ModifyTransition } from "hooks";
import { useContext } from "react"
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Main() {

    const { ModifyPageTransition } = useContext(PageTransitionContext)

    const { Profile } = useContext(ProfileContext);

    const { pathname } = useLocation()

    const SideElements = [
        {
            name: "Juegos",
            url: "games",
            value: Profile.Library?.length ?? 0,
        },
        {
            name: "Deseados",
            url: "wishlist",
            value: Profile.Wishlist?.length ?? 0,
        }
    ]

    function CreateTransition() {
        ModifyTransition(ModifyPageTransition)
    }

    return (
        <div id="SteamProfileContent-Main">
            <div id="SteamProfileContent-MainContent">
                <Outlet />
            </div>
            <div id="SteamProfileContent-MainSide">
                <div className={`SteamProfileContent-MainSideElement ${Profile.Status}`}>
                    <span className="SteamProfileContent-MainSideElement-Span">Estado</span>
                    <span className="SteamProfileContent-MainSideElement-Span">{Profile.Status}</span>
                </div>
                <div className="SteamProfileContent-MainSideCollumn">
                    <span>Insignias</span>
                    <div>
                        <img className="SteamProfileContent-MainSideElement-Image" src="/6YearofService.png" alt="6 Steam Years" width={45} height={45} />
                        <img className="SteamProfileContent-MainSideElement-Image" src="/SteamVote.png" alt="6 Steam Years" width={45} height={45} />
                        <img className="SteamProfileContent-MainSideElement-Image" src="/SteamUnknow.png" alt="6 Steam Years" width={45} height={45} />
                    </div>
                </div>
                {SideElements.map(({ name, url, value }, _index) =>
                    <div key={_index} className={`SteamProfileContent-MainSideElement ${pathname.includes(url) && "Active"}`}>
                        <Link to={url} onClick={CreateTransition}>
                            <span className="SteamProfileContent-MainSideElement-Span">{name}</span>
                            <span className="SteamProfileContent-MainSideElement-Span">{value}</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}