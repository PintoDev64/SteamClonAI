import ErrorHandler from "../Handlers/Error";
import MongoHandler from "../Handlers/MongoHandler";
import MysqlHandler from "../Handlers/MysqlHandler";

// Constants
const collectionName = "GameData";

export async function getWishlist(publicId: string): DatabaseOperation.GenericClassReturnType {
    return await ErrorHandler.Wrapper(async () => {
        const { ITEMS } = await MysqlHandler.Select("Wishlist", ["ITEMS"], {
            Where: {
                Columns: ["PUBLIC_ID"],
                Values: [publicId]
            }
        })

        const Wishlist = ITEMS

        return Wishlist
    })
}

/**
 * 
 */
export async function setWishlist(publicId: string, productId: string): DatabaseOperation.GenericClassReturnType {
    return await ErrorHandler.Wrapper(async () => {

        const { downloadUrl, ...rest } = await MongoHandler.Select<getGameDataType>(collectionName, { idGame: productId })

        const { ITEMS } = await MysqlHandler.Select("Wishlist", ["ITEMS"], {
            Where: {
                Columns: ["PUBLIC_ID"],
                Values: [publicId]
            }
        })

        const FilterPatsProducts = ITEMS !== null && ITEMS.some(({ idGame }) => idGame === productId)

        if (FilterPatsProducts) {
            return ITEMS
        }

        const UpdateCart = ITEMS !== null ? [...ITEMS, { ...rest }] : [{ ...rest }]

        await MysqlHandler.Update("Wishlist", ["ITEMS"], [JSON.stringify(UpdateCart)], {
            Where: {
                Columns: ["PUBLIC_ID"],
                Values: [publicId]
            }
        })

        return UpdateCart
    })
}

export async function deleteWishlist(publicId: string, IdGame: UUIDPattern): DatabaseOperation.GenericClassReturnType {
    return await ErrorHandler.Wrapper(async () => {
        const { ITEMS } = await MysqlHandler.Select("Wishlist", ["ITEMS"], {
            Where: {
                Columns: ["PUBLIC_ID"],
                Values: [publicId]
            }
        })

        const newWishlistList = ITEMS.filter(({ idGame }) => idGame !== IdGame)

        await MysqlHandler.Update("Wishlist", ["ITEMS"], [JSON.stringify(newWishlistList)], {
            Where: {
                Columns: ["PUBLIC_ID"],
                Values: [publicId]
            }
        })

        return true
    })
}