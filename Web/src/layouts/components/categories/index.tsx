
// Style
import { getDominantColor } from '@utils'
import './index.css'
import { useContext, useEffect, useState } from 'react'
import { PageTransitionContext } from 'context'
import { ModifyTransition } from 'hooks'
import { Link, useLocation } from 'react-router-dom'

type CategoriesCardProps = { imageUrl: string, Text: string }
export default function CategoriesCard({ Text, imageUrl }: CategoriesCardProps) {

    const { pathname } = useLocation()

    const { ModifyPageTransition } = useContext(PageTransitionContext)

    const [DominantColor, setDominantColor] = useState("")
    useEffect(() => {
        getDominantColor(imageUrl, 90)
            .then(value => setDominantColor(value))
            .catch(() => { })
    }, [imageUrl])

    function ClickLink(url: string) {
        url !== pathname && ModifyTransition(ModifyPageTransition)
    }

    return (
        <div className="SteamCategoryCard" style={{ backgroundImage: `url(${imageUrl})` }}>
            <Link to={"/"} onClick={() => ClickLink("/")}>
                <div className="SteamCategoryCardGradient" style={{ background: `linear-gradient(rgba(0,0,0,.5), ${DominantColor} 100%)` }} />
                <span className="SteamCategoryCardText">{Text}</span>
            </Link>
        </div>
    )
}