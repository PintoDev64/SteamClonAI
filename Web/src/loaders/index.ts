import { URL_API } from "@constants";
import { Params } from "react-router-dom";
import { redirect } from "react-router-dom";

type LoaderType = { request: Request, params: Params }

export async function LoginForm() {
    redirect("/")
    return null
}

export function ProfileLoader({ params }: LoaderType) {
    return fetch(`${URL_API}/api/v1/profile/${params.userId}`)
}

export function GameLoader({ params }: LoaderType) {
    return fetch(`${URL_API}/api/v1/game?idGame=${params.IdGame}`)
}

export function StoreLoader() {
    return fetch(`${URL_API}/api/v1/store`)
}

export function CartLoader() {
    return fetch(`${URL_API}/api/v1`)
}