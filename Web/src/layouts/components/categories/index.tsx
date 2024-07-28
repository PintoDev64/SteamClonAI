
// Style
import { getDominantColor } from '@utils'
import './index.css'
import { useEffect, useState } from 'react'

type CategoriesCardProps = { imageUrl: string, Text: string }
export default function CategoriesCard({ Text, imageUrl }: CategoriesCardProps) {

    const [DominantColor, setDominantColor] = useState("")
    useEffect(() => {
        getDominantColor(imageUrl, 90)
            .then(value => setDominantColor(value))
            .catch(() => { })
    }, [imageUrl])

    return (
        <div className="SteamCategoryCard" style={{ backgroundImage: `url(${imageUrl})` }}>
            <div className="SteamCategoryCardGradient" style={{ background: `linear-gradient(rgba(0,0,0,.5), ${DominantColor} 100%)` }} />
            <span className="SteamCategoryCardText">{Text}</span>
        </div>
    )
}