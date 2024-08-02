import GameProducts from "./GameProducts";

export default function GameAbout({ about, platforms, name, products }: ComponentsRequestProps.GameAbout) {

    const PlatformsKeys = Object.keys(platforms)

    console.log(about);


    return (
        <div id="GamePageContent-About">
            <GameProducts products={products} platforms={platforms}/>
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