import ErrorHandler from "../Handlers/Error";
import MysqlHandler from "../Handlers/MysqlHandler";
import MongoHandler from "../Handlers/MongoHandler";
import { deleteWishlist } from "./Wishlist";

// Constants
const collectionName = "GameData";

export async function getProducts(userId: number): DatabaseOperation.GenericClassReturnType {
    return await ErrorHandler.Wrapper(async () => {
        const results = await MysqlHandler.Select("Cart", ["ITEMS"], {
            Where: {
                Columns: ["ACCOUNT_ID"],
                Values: [userId]
            }
        })

        return results
    })
}
/**
 * 
 */
export async function setProducts(userId: number, productId: string): DatabaseOperation.GenericClassReturnType {
    return await ErrorHandler.Wrapper(async () => {

        const { downloadUrl, ...rest } = await MongoHandler.Select<getGameDataType>(collectionName, { idGame: productId })

        const { ITEMS } = await MysqlHandler.Select("Cart", ["ITEMS"], {
            Where: {
                Columns: ["ACCOUNT_ID"],
                Values: [userId]
            }
        })

        const FilterPatsProducts = ITEMS !== null && ITEMS.some(({ idGame }) => idGame === productId)

        if (FilterPatsProducts) {
            return ITEMS
        }

        const UpdateCart = ITEMS !== null ? [...ITEMS, { ...rest }] : [{ ...rest }]

        await MysqlHandler.Update("Cart", ["ITEMS"], [JSON.stringify(UpdateCart)], {
            Where: {
                Columns: ["ACCOUNT_ID"],
                Values: [userId]
            }
        })

        return UpdateCart
    })
}
export async function deleteProducts(userId: number, IdGame: UUIDPattern): DatabaseOperation.GenericClassReturnType {
    return await ErrorHandler.Wrapper(async () => {
        const { ITEMS } = await MysqlHandler.Select("Cart", ["ITEMS"], {
            Where: {
                Columns: ["ACCOUNT_ID"],
                Values: [userId]
            }
        })

        const newCartList = ITEMS.filter(({ idGame }) => idGame !== IdGame)

        await MysqlHandler.Update("Cart", ["ITEMS"], [JSON.stringify(newCartList)], {
            Where: {
                Columns: ["ACCOUNT_ID"],
                Values: [userId]
            }
        })

        return true
    })
}
export async function buyProducts(userId: number, publicId: string): DatabaseOperation.GenericClassReturnType {
    return await ErrorHandler.Wrapper(async () => {

        const { ITEMS: WishlistItems } = await MysqlHandler.Select("Wishlist", ["ITEMS"], {
            Where: {
                Columns: ["PUBLIC_ID"],
                Values: [publicId]
            }
        })

        const { ITEMS: CartItems } = await MysqlHandler.Select("Cart", ["ITEMS"], {
            Where: {
                Columns: ["ACCOUNT_ID"],
                Values: [userId]
            }
        })

        const { CURRENCY } = await MysqlHandler.Select("User", ["CURRENCY"], {
            Where: {
                Columns: ["ACCOUNT_ID"],
                Values: [userId]
            }
        })

        // -----------> THROW ERROR
        if (!CartItems || CartItems.length === 0) return {
            buyState: false,
            message: "No tienes suficiente fondos para esta transaccion"
        }

        const ProductsWithDiscount = CartItems.filter(({ products }) => products[0].price.discount !== undefined).map(({ products }) => products[0].price.discount?.value)

        const ProductsNormal = CartItems.filter(({ products }) => products[0].price.discount === undefined).map(({ products }) => products[0].price.default)

        const TotalPrice = [...ProductsWithDiscount, ...ProductsNormal].filter((n): n is number => n !== null && n !== undefined) // Filtra los valores no válidos
            .reduce((accumulator: number, currentValue: number) => {
                return accumulator + currentValue;
            }, 0);

        if (CURRENCY < TotalPrice) {
            return {
                buyState: false,
                message: "No tienes suficiente fondos para esta transaccion"
            }
        } else if (TotalPrice === 0 && CartItems.length === 0) {
            return {
                buyState: false,
                message: "No contienes ningun articulo para finalizar tu compra"
            }
        } else {
            const { LIBRARY } = await MysqlHandler.Select("User", ["LIBRARY"], {
                Where: {
                    Columns: ["ACCOUNT_ID"],
                    Values: [userId]
                }
            })

            const UpdateCart = LIBRARY !== null ? [...LIBRARY, ...CartItems] : [...CartItems]

            WishlistItems.map(({ idGame }) => deleteWishlist(publicId, idGame))

            await MysqlHandler.Update("User", ["LIBRARY", "CURRENCY"], [JSON.stringify(UpdateCart), CURRENCY - TotalPrice], {
                Where: {
                    Columns: ["ACCOUNT_ID"],
                    Values: [userId]
                }
            })

            CartItems.map(({ idGame }) => deleteProducts(userId, idGame))

            return {
                buyState: true,
                message: "Transaccion Exitosa"
            }
        }
    })
}