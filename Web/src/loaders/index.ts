import { URL_API } from "@constants";
import { Params } from "react-router-dom";

type LoaderType = { request: Request, params: Params }

export async function LoginForm() {
    return null
}

export function ProfileLoader({ params }: LoaderType) {
    return fetch(`${URL_API}/api/v1/profile/${params.userId}`)
}

export function GameLoader({ params }: LoaderType) {
    return fetch(`${URL_API}/api/v1/game?idGame=${params.IdGame}`, {
        credentials: "include",
    })
}

export function StoreLoader() {
    return fetch(`${URL_API}/api/v1/store`)
}

export function CartLoader() {
    return fetch(`${URL_API}/api/v1/cart`, {
        credentials: "include",
    })
}