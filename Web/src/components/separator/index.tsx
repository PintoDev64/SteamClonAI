import { ReactNode } from 'react'

// Style
import './index.css'

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
                <h2 className="SteamSeparatorContainer-Elements-Title">{Text}</h2>
                {SeeMoreLink && <a href={SeeMoreLink} className="SteamSeparatorContainer-Elements-SeeMore">Ver mas</a>}
            </div>
            {children}
        </div>
    )
}