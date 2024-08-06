import { ModalContext, PageTransitionContext, UserContext } from "context"
import { CompleteTransition, ModifyTransition } from "hooks"
import { useContext, useEffect } from "react"

import { useLoaderData, useNavigate } from "react-router-dom"
import { PlatformsIcons } from "@layouts/components/cards/assets"

// Styles
import './index.css'
import { DeleteAllElements, DeleteElement } from "./assets"
import { CompletePay, DeletePay } from "./utils"

export default function CartPage() {

    const navigate = useNavigate()

    const { data } = useLoaderData() as RequestAPI.Cart_API
    const { ITEMS } = data

    console.log(ITEMS);

    const { ModifyPageTransition } = useContext(PageTransitionContext)
    const { User } = useContext(UserContext)
    const { EditModal } = useContext(ModalContext)

    const TransitionStart = () => {
        navigate("/cart")
        if (!ITEMS || ITEMS.length === 0) return
        EditModal({ Active: true })
        ModifyTransition(ModifyPageTransition)
    }
    const TransitionDelete = (ResponseData: unknown) => {
        navigate("/cart")
        ResponseData && EditModal({ Active: true })
        ModifyTransition(ModifyPageTransition)
    }

    useEffect(() => CompleteTransition(ModifyPageTransition), [])

    const ProductsWithDiscount = !ITEMS ? [0] : ITEMS.filter(({ products }) => products[0].price.discount !== undefined).map(({ products }) => products[0].price.discount?.value)

    const ProductsNormal = !ITEMS ? [0] : ITEMS.filter(({ products }) => products[0].price.discount === undefined).map(({ products }) => products[0].price.default)

    const TotalPrice = [...ProductsWithDiscount, ...ProductsNormal].filter((n): n is number => n !== null && n !== undefined) // Filtra los valores no válidos
        .reduce((accumulator: number, currentValue: number) => {
            return accumulator + currentValue;
        }, 0);

    return (
        <div id="SteamCart">
            <h1 id="SteamCartTitle">Carrito de {User.Name}</h1>
            {ITEMS && ITEMS.map(({ platforms, images, name, products, idGame }, _index) => {
                const PlatformsKeys = Object.keys(platforms)
                const ImagesFilter = images.filter(({ type }) => type === "image")
                return (
                    <div key={_index} className="SteamCartElement SteamCartElementDividor">
                        <div className="SteamCartElement-Left">
                            <img src={ImagesFilter[0].url ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5a8QX_UjwuoW3QNrnYytjMakvOY67vObepA&s"} alt={name} className="SteamCartElement-Image" width={161} height={75} />
                            <h2 className="SteamCartElement-GameTitle">{name}</h2>
                            {PlatformsKeys.map((value: "Win" | "Mac" | "Lin" | string, _index) => {
                                if (platforms[value] === undefined) return
                                return <PlatformsIcons key={_index} platform={value} />
                            })}
                        </div>
                        <div className="SteamCartElement-Right">
                            <span className="SteamCartElement-Right-Price">
                                $ {
                                    products[0].price.discount
                                        ? products[0].price.discount.value
                                        : products[0].price.default
                                }
                            </span>
                            <button className="SteamCartElement-Right-Delete" onClick={() => DeletePay(TransitionDelete, idGame)}>
                                <DeleteElement />
                            </button>
                        </div>
                    </div>
                )
            })}
            <div id="SteamCart-PayConfirmation" className="SteamCartElementDividor">
                <div id="SteamCart-PayConfirmation-Estimated">
                    <h2>Precio Estimado</h2>
                    <div id="SteamCart-PayConfirmation-EstimatedData">
                        <span id="SteamCart-PayConfirmation-EstimatedData-Price">
                            $ {TotalPrice}
                        </span>
                        <button id="SteamCart-PayConfirmation-EstimatedData-DeleteAll" onClick={() => {
                            ITEMS.forEach(({ idGame }) => DeletePay(TransitionDelete, idGame))
                        }}>
                            <DeleteAllElements />
                        </button>
                    </div>
                </div>
                <div id="SteamCart-PayConfirmation-Button">
                    <button id="SteamCart-PayConfirmation-ButtonConfirm" onClick={() => CompletePay(TransitionStart)}>
                        Completar pago
                    </button>
                </div>
            </div>
        </div>
    )
}