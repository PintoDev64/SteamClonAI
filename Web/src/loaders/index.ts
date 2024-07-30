import { URL_API } from "contants";
import { Params } from "react-router-dom";

type LoaderType = { request: Request, params: Params }
export function GameLoader({ params }: LoaderType) {
    return fetch(`${URL_API}/api/v1/game?idGame=${params.IdGame}`)
}

export function StoreLoader() {
    return fetch(`${URL_API}/api/v1/store`)
}