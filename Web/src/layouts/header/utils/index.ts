import { useLocation } from "react-router-dom"

export function GetActualPath() {
    const { pathname } = useLocation()
    return location.pathname === `/${pathname}`
}