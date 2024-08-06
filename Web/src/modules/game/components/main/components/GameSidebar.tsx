import { SteamLogoIndividual } from "@components/separator/assets"
import { URL_API } from "@constants"
import { UserContext } from "context"
import { useContext, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { GameFeatureIcon, ShareIcon } from "../assets"

export default function GameSidebar({ features, categories }: ComponentsRequestProps.GameSidebar) {

    const { IdGame } = useParams()

    const { User } = useContext(UserContext);

    const CheckBoxCopyLink = useRef<HTMLInputElement>(null!)

    const [SteamAIResponse, setSteamAIResponse] = useState<string | null>(null)

    const SteamAI = () => {
        if (SteamAIResponse) return
        setSteamAIResponse("Generando...")
        const CategoriesJoin = categories.join(", ")
        fetch(`${URL_API}/api/v1/game/steamai`, {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: User.Name,
                idGame: IdGame,
                categories: CategoriesJoin
            })
        })
            .then(data => data.json())
            .then(({ Response_AI }) => setSteamAIResponse(Response_AI))
            .catch(err => console.log(err.message))
    }

    const ShareLink = () => {
        CheckBoxCopyLink.current.click()
        const blobData = new Blob([window.location.href], { type: 'text/plain' })
        const CreateClipboardItem = new ClipboardItem({ 'text/plain': blobData })
        navigator.clipboard.write([CreateClipboardItem])
        setTimeout(() => {
            CheckBoxCopyLink.current.click()
        }, 2000);
    }

    return (
        <div id="GamePageContent-Sidebar">
            <div className="GamePageContent-Sidebar-Element" id="GamePageContent-Sidebar-SteamAI" onClick={SteamAI}>
                {!SteamAIResponse
                    ?
                    <>
                        <SteamLogoIndividual />
                        <p>Ver resumen por <span>SteamAI</span></p>
                    </>
                    :
                    <div id="GamePageContent-Sidebar-ElementContainer">
                        <div id="GamePageContent-Sidebar-Element-Header">
                            <SteamLogoIndividual />
                            <span>SteamAI</span>
                        </div>
                        <div id="GamePageContent-Sidebar-Element-Content">
                            {SteamAIResponse}
                        </div>
                    </div>
                }

            </div>
            <div className="GamePageContent-Sidebar-Element">
                <h3 className="GamePageContent-Sidebar-Features-Title" >Features</h3>
                {features.map(value =>
                    <div className="GamePageContent-Sidebar-Features-Element">
                        <GameFeatureIcon />
                        <span>{value}</span>
                    </div>
                )}
            </div>
            <div className="GamePageContent-Sidebar-Element" >
                <h3 className="GamePageContent-Sidebar-Features-Title" >Features</h3>
                <input type="checkbox" id="GamePageContent-Sidebar-Features-Checkbox" ref={CheckBoxCopyLink} hidden aria-hidden />
                <button onClick={ShareLink} className="GamePageContent-Sidebar-Features-Element NoLinks">
                    <ShareIcon />
                    <span>Compartir</span>
                </button>
            </div>
        </div>
    )
}