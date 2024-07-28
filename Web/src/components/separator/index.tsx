import { ReactNode } from 'react'

// Style
import './index.css'

type SeparatorContainerProps = { children: ReactNode, Text: string, SeeMoreLink?: string }
export function SeparatorContainer({ Text, SeeMoreLink = undefined, children }: SeparatorContainerProps) {
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