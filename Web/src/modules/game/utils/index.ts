import { URL_API } from "@constants";
import { craeteFetch } from "@utils";

export function AddRemove_Wishlist(state: boolean, IdGame: string) {
    if (state) {
        craeteFetch(`${URL_API}/api/v1/wishlist/add`, {
            productId: IdGame
        }, "put")
        return
    }
    craeteFetch(`${URL_API}/api/v1/remove`, {
        IdGame
    }, "put")
}