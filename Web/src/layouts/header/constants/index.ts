import { UserContext } from "context"
import { useContext } from "react"


export default function Constans() {
    const { User } = useContext(UserContext)

    const HeaderTitles = [
        {
            name: "Inicio",
            url: "/"
        },
        {
            name: "Deseados",
            url: User.PublicId && `/profile/${User.PublicId}/wishlist`
        },
    ]

    const HeaderPersonal = [
        {
            name: "Carrito",
            url: "/cart"
        }
    ]

    return {
        HeaderTitles,
        HeaderPersonal
    }
}