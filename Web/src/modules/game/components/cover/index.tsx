import SteamWishlist from "@components/wishlist"

import "./index.css";
import { useContext } from "react";
import { ModalContext, UserContext } from "context";
import { AddRemove_Wishlist } from "@utils";

type GameCoverProps = { Title: string, InLibrary: boolean, GameId: string }
export default function GameCover({ Title, InLibrary, GameId }: GameCoverProps) {

    const { User } = useContext(UserContext)

    const { EditModal } = useContext(ModalContext)

    const InWishlist = User.Wishlist?.some(({ idGame }) => idGame === GameId)

    console.log(InWishlist);

    const WishlistButton = (state: boolean) => {
        EditModal({ Active: true })
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