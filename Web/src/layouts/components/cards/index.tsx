import { useContext, useState } from "react";

// Styles
import './index.css'
import AddtoCart from "../../../components/cart";
import SteamWishlist from "../../../components/wishlist";
import { PlatformsIcons } from "./assets";
import { Link, useLocation } from "react-router-dom";
import { ModifyTransition } from "hooks";
import { PageTransitionContext, UserContext } from "context";
import { AddRemove_Wishlist } from "@utils";
type GameCardProps = { preset?: "Big" | "Small", data: RequestAPI.GameDataType }
export default function GameCard({ preset = "Big", data }: GameCardProps) {

    const { User } = useContext(UserContext)

    const { ModifyPageTransition } = useContext(PageTransitionContext)

    const { pathname } = useLocation()

    const { shortDescription, images, products, categories, platforms, name } = data;

    const CardImages = images.filter(({ type }) => type === "image")
    const PlatformsKeys = Object.keys(platforms)
    const ShortCategories = categories.slice(0, 4)
    const OtherImages = CardImages.slice(1, CardImages.length)

    const [CardSelector, setCardSelector] = useState(0)

    const priceReal = products[0].price.default > 0 ? "Comprar" : "Jugar"

    function ClickLink(url: string) {
        url !== pathname && ModifyTransition(ModifyPageTransition)
    }

    const WishlistButton = (state: boolean) => {
        AddRemove_Wishlist(state, data.idGame)
    }

    if (preset === "Small") {
        return (
            <div className="SteamCardGame-Small">
                <div className="SteamCardGame-Small-Image">
                    <Link to={`/game/${data.idGame}`} onClick={() => ClickLink(`/game/${data.idGame}`)}>
                        <img className="SteamCardGame-Small-ImageElement" src={CardImages[CardSelector].url} alt={name} fetchPriority="high" />
                    </Link>
                </div>
                <div className="SteamCardGame-Small-Details">
                    <Link to={`/game/${data.idGame}`} onClick={() => ClickLink(`/game/${data.idGame}`)}>
                        <h2 className="SteamCardGame-Small-DetailsTitle">{name}</h2>
                    </Link>
                    <div className="SteamCardGame-Small-DetailsExtra">
                        <div className="SteamCardGame-Small-DetailsExtra-Platforms">
                            {PlatformsKeys.map((value: "Win" | "Mac" | "Lin" | string, _index) => {
                                if (platforms[value] === undefined) return
                                return <PlatformsIcons key={_index} platform={value} />
                            })}
                        </div>
                        <div className="SteamCardGame-Small-DetailsExtra-Options">
                            <AddtoCart mode="Small" price={{
                                value: products[0].price.default,
                                discount: products[0].price.discount?.value,
                                discountDate: products[0].price.discount?.finalDate
                            }} text={priceReal} />
                            {!User.Library?.some(({ idGame }) => idGame === data.idGame) && <SteamWishlist wishlistFunction={WishlistButton} mode="Square" state={User.Wishlist?.some(({ idGame }) => idGame === data.idGame)} />}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function MouseOn(ElementCode: number) {
        setCardSelector(ElementCode)
    }

    function MouseOff() {
        setCardSelector(0)
    }

    return (
        <div className="SteamCardGame-Big">
            <div className="SteamCardGame-Big-Image">
                <Link to={`/game/${data.idGame}`} onClick={() => ClickLink(`/game/${data.idGame}`)}>
                    <img className="SteamCardGame-Big-ImageElement" fetchPriority="high" src={CardImages[CardSelector].url} alt={name} />
                </Link>
            </div>
            <div className="SteamCardGame-Big-Details">
                <Link to={`/game/${data.idGame}`} onClick={() => ClickLink(`/game/${data.idGame}`)}>
                    <h2 className="SteamCardGame-Big-DetailsTitle">{name}</h2>
                </Link>
                <p className="SteamCardGame-Big-DetailsParagraph">{shortDescription}</p>
                <div className="SteamCardGame-Big-DetailsImages" onMouseLeave={MouseOff}>
                    {OtherImages.map(({ url }, _index) =>
                        <img key={_index} src={url} alt={name} className="SteamCardGame-Big-DetailsImages-Element" fetchPriority="high" onMouseEnter={() => MouseOn(_index + 1)} />
                    )}
                </div>
                <div className="SteamCardGame-Big-DetailsExtra">
                    <div className="SteamCardGame-Big-DetailsExtra-Tags">
                        {ShortCategories.map((value, _index) =>
                            <div key={_index} className="SteamCardGame-Big-DetailsExtra-TagsElement">{value}</div>
                        )}
                    </div>
                    <div className="SteamCardGame-Big-DetailsExtra-Platforms">
                        {PlatformsKeys.map((value, _index) => {
                            if (platforms[value] === undefined) return
                            return <PlatformsIcons key={_index} platform={value} />
                        })}
                    </div>
                </div>
                <div className="SteamCardGame-Big-DetailsOptions">
                    <AddtoCart ActiveDate={false} price={{
                        value: products[0].price.default,
                        discount: products[0].price.discount?.value,
                        discountDate: products[0].price.discount?.finalDate
                    }} text={priceReal} InLibrary={User.Library?.some(({ idGame }) => idGame === data.idGame)}/>
                    {!User.Library?.some(({ idGame }) => idGame === data.idGame) && <SteamWishlist wishlistFunction={WishlistButton} mode="Normal" state={User.Wishlist?.some(({ idGame }) => idGame === data.idGame)} />}
                </div>
            </div>
        </div>
    )
}