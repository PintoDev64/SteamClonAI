import { useLocation } from "react-router-dom"

export function GetActualPath(localPathname: string) {
    const { pathname } = useLocation()
    return localPathname === pathname
}