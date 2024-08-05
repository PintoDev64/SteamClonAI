import GameProducts from "./GameProducts";

export default function GameAbout({ about, platforms, name, products, InLibrary, idGame }: ComponentsRequestProps.GameAbout) {

    const PlatformsKeys = Object.keys(platforms)

    return (
        <div id="GamePageContent-About">
            <GameProducts idGame={idGame} InLibrary={InLibrary} products={products} platforms={platforms}/>
            <div id="GamePageContent-AboutDetails">
                <h3 id="GamePageContent-AboutDetails-Title">
                    About {name}
                </h3>
                <p id="GamePageContent-AboutDetails-Text">
                    {about}
                </p>
            </div>
            <div id="GamePageContent-PlatformsDetails">
                {PlatformsKeys}
            </div>
        </div>
    )
}