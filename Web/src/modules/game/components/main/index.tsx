// Components
import GameAbout from "./components/GameAbout";
import GameSidebar from "./components/GameSidebar";

// Styles
import './index.css'

export default function GameMain({ features, products, platforms, about, name, categories }: ComponentsRequestProps.GameAbout & ComponentsRequestProps.GameProducts & ComponentsRequestProps.GameSidebar) {
    return (
        <div id="GamePageContent-Main">
            <GameAbout about={about} products={products} name={name} platforms={platforms}/>
            <GameSidebar features={features} categories={categories}/>
        </div>
    )
}