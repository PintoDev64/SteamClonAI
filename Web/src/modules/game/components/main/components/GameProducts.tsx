// Layouts
import AddtoCart from "@components/cart";
import { URL_API } from "@constants";
import { PlatformsIcons } from "@layouts/components/cards/assets";
import { craeteFetch, decodeDate } from "@utils";
import { PageTransitionContext } from "context";
import { ModifyTransition } from "hooks";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function GameProducts({ products, platforms, InLibrary, idGame }: ComponentsRequestProps.GameProducts) {

    const { ModifyPageTransition } = useContext(PageTransitionContext)

    const PlatformsKeys = Object.keys(platforms)

    const navigate = useNavigate()

    const BuyGame = async () => {
        ModifyTransition(ModifyPageTransition)
        const response = await craeteFetch(`${URL_API}/api/v1/cart/add`, {
            productId: idGame
        }, "put")
        if (response.status === 500 || response.status === 401) {
            navigate("/login")
        } else {
            console.log(response);
        }
    }

    return (
        <>
            {products.map(({ name, price }) =>
                <div className="GamePageContent-Main-Product">
                    <div className="GamePageContent-Main-ProductTitle">
                        <h2 className="GamePageContent-Main-ProductTitleText">{name}</h2>
                        {price.discount && <span className="DiscountActive">Oferta finaliza el {decodeDate(price.discount?.finalDate)}</span>}
                    </div>
                    <div className="GamePageContent-Main-ProductDetail">
                        <div className="GamePageContent-Main-ProductDetail-Platforms">
                            {PlatformsKeys.map((value: "Win" | "Mac" | "Lin" | string, _index) => {
                                if (platforms[value] === undefined) return
                                return <PlatformsIcons key={_index} platform={value} />
                            })}
                        </div>
                        <AddtoCart
                            price={{
                                value: price.default,
                                discount: price.discount?.value,
                                discountDate: price.discount?.finalDate
                            }}
                            ActiveDate={false}
                            mode="Huge"
                            InLibrary={InLibrary}
                            text={price.default === 0 ? "Jugar" : "Comprar"} 
                            ButtonProps={{
                                onClick: BuyGame
                            }}/>
                    </div>
                </div>
            )}
        </>
    )
}