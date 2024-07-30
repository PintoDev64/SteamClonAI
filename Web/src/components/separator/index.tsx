import { ReactNode } from 'react'

// Style
import './index.css'
import { SteamLogoIndividual } from './assets'

type SeparatorContainerProps = { Ai?: boolean, children: ReactNode, Text: string, SeeMoreLink?: string }
export function SeparatorContainer({ Ai = false, Text, SeeMoreLink = undefined, children }: SeparatorContainerProps) {
    if (Ai) {
        return (
            <></>
        )
    }
    return (
        <div className="SteamSeparatorContainer">
            <div className="SteamSeparatorContainer-Elements">
                {Text === "SteamAI" && <SteamLogoIndividual />}
                <h2 className={`SteamSeparatorContainer-Elements-Title${Text === "SteamAI" ? "SteamAI" : ""}`}>
                    {Text === "SteamAI" ? <>Recomendados por Steam AI</> : <>{Text}</>}
                </h2>
                {Text === "SteamAI" && <SteamLogoIndividual />}
                {SeeMoreLink && <a href={SeeMoreLink} className="SteamSeparatorContainer-Elements-SeeMore">Ver mas</a>}
            </div>
            {children}
        </div>
    )
}