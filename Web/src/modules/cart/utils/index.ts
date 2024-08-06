import { URL_API } from "@constants";
import { craeteFetch } from "@utils";
import { PageTransitionContext } from "context";
import { ModifyTransition } from "hooks";
import { useContext } from "react";

export async function CompletePay() {
    const { ModifyPageTransition } = useContext(PageTransitionContext)
    ModifyTransition(ModifyPageTransition)
    const ResponseCart = await craeteFetch(`${URL_API}/api/v1/cart/payment`, {}, "post")
    const ResponseJSON = await ResponseCart.json()
    console.log(ResponseJSON);
}