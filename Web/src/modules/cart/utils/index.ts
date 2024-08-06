import { URL_API } from "@constants";
import { craeteFetch } from "@utils";

export async function CompletePay() {
    const ResponseCart = await craeteFetch(`${URL_API}/api/v1/cart/payment`, {}, "post")
    const ResponseJSON = await ResponseCart.json()
    console.log(ResponseJSON);
}