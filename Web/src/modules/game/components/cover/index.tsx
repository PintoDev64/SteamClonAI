import SteamWishlist from "@components/wishlist"

import "./index.css";
import { useContext } from "react";
import { UserContext } from "context";
import { AddRemove_Wishlist } from "@Modules/game/utils";

type GameCoverProps = { Title: string, InLibrary: boolean, GameId: string }
export default function GameCover({ Title, InLibrary, GameId }: GameCoverProps) {

    const { User } = useContext(UserContext)

    const InWishlist = User.Wishlist?.some(({ idGame }) => idGame === GameId)

    console.log(InWishlist);

    const WishlistButton = (state: boolean) => {
        AddRemove_Wishlist(state, GameId)
    }

    return (
        <div id="GameCover">
            <div id="GameCoverTitle">
                <h1 id="GameCoverTitleText">{Title}</h1>
                {!InLibrary && <SteamWishlist wishlistFunction={WishlistButton} mode="Normal" state={InWishlist ?? false}/>}
            </div>
        </div>
    )
}