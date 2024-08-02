import { SteamLogoIndividual } from "@components/separator/assets"
import { URL_API } from "@constants"
import { UserContext } from "context"
import { useContext, useState } from "react"
import { useParams } from "react-router-dom"

export default function GameSidebar({ features, categories }: ComponentsRequestProps.GameSidebar) {

    const { IdGame } = useParams()

    const { User } = useContext(UserContext);

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
        .then(data => data.json() )
        .then(({ Response_AI }) => setSteamAIResponse(Response_AI))
        .catch(err => console.log(err.message))
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
            <div className="GamePageContent-Sidebar-Element" id="GamePageContent-Sidebar-Features">
                <h3 id="GamePageContent-Sidebar-Features-Title" >Features</h3>
                {features.map(value =>
                    <div className="GamePageContent-Sidebar-Features-Element">
                        <span>{value}</span>
                    </div>
                )}
            </div>
        </div>
    )
}