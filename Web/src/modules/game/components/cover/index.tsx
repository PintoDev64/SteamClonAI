import SteamWishlist from "@components/wishlist"

import "./index.css";

type GameCoverProps = { Title: string }
export default function GameCover({ Title }: GameCoverProps) {
    return (
        <div id="GameCover">
            <div id="GameCoverTitle">
                <h1 id="GameCoverTitleText">{Title}</h1>
                <SteamWishlist mode="Normal" />
            </div>
        </div>
    )
}