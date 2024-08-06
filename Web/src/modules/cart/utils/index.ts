import { URL_API } from "@constants";
import { craeteFetch } from "@utils";

export async function CompletePay(execute: () => void) {
    execute()
    const ResponseCart = await craeteFetch(`${URL_API}/api/v1/cart/payment`, {}, "post")
    console.log(ResponseCart);
}

export async function DeletePay(execute: (ResponseData: unknown) => void, IdGame: string) {
    const ResponseCart = await craeteFetch(`${URL_API}/api/v1/cart/remove`, { IdGame: IdGame }, "put")
    execute(ResponseCart.data)
    console.log(ResponseCart);
}