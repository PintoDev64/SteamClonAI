import { PageTransitionContext, UserContext } from "context"
import { CompleteTransition } from "hooks"
import { useContext, useEffect } from "react"

import { useLoaderData } from "react-router-dom"
import { PlatformsIcons } from "@layouts/components/cards/assets"

// Styles
import './index.css'
import { DeleteAllElements, DeleteElement } from "./assets"
import { CompletePay } from "./utils"

export default function CartPage() {

    const { data } = useLoaderData() as RequestAPI.Cart_API
    const { ITEMS } = data

    const { ModifyPageTransition } = useContext(PageTransitionContext)
    const { User } = useContext(UserContext)

    useEffect(() => CompleteTransition(ModifyPageTransition), [])

    const ProductsWithDiscount = ITEMS.filter(({ products }) => products[0].price.discount !== undefined).map(({ products }) => products[0].price.discount?.value)

    const ProductsNormal = ITEMS.filter(({ products }) => products[0].price.discount === undefined).map(({ products }) => products[0].price.default)

    const TotalPrice = [...ProductsWithDiscount, ...ProductsNormal].filter((n): n is number => n !== null && n !== undefined) // Filtra los valores no válidos
        .reduce((accumulator: number, currentValue: number) => {
            return accumulator + currentValue;
        }, 0);

    return (
        <div id="SteamCart">
            <h1 id="SteamCartTitle">Carrito de {User.Name}</h1>
            {ITEMS.map(({ platforms, images, name, products }, _index) => {
                const PlatformsKeys = Object.keys(platforms)
                const ImagesFilter = images.filter(({ type }) => type === "image")
                return (
                    <div key={_index} className="SteamCartElement SteamCartElementDividor">
                        <div className="SteamCartElement-Left">
                            <img src={ImagesFilter[0].url} alt={name} className="SteamCartElement-Image" width={161} height={75} />
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
                            <button className="SteamCartElement-Right-Delete">
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
                        <button id="SteamCart-PayConfirmation-EstimatedData-DeleteAll">
                            <DeleteAllElements />
                        </button>
                    </div>
                </div>
                <div id="SteamCart-PayConfirmation-Button">
                    <button id="SteamCart-PayConfirmation-ButtonConfirm" onClick={CompletePay}>
                        Completar pago
                    </button>
                </div>
            </div>
        </div>
    )
}