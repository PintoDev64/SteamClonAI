// Layouts
import AddtoCart from "@components/cart";
import { PlatformsIcons } from "@layouts/components/cards/assets";

export default function GameProducts({ products, platforms }: ComponentsRequestProps.GameProducts) {

    const PlatformsKeys = Object.keys(platforms)

    return (
        <>
            {products.map(({ name, price }) =>
                <div className="GamePageContent-Main-Product">
                    <div className="GamePageContent-Main-ProductTitle">
                        <h2 className="GamePageContent-Main-ProductTitleText">{name}</h2>
                        {price.discount && <span className="DiscountActive">Oferta finaliza el {price.discount?.finalDate}</span>}
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
                            text={price.default === 0 ? "Jugar" : "Comprar"} />
                    </div>
                </div>
            )}
        </>
    )
}