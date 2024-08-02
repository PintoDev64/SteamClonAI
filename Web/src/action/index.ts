import { Params, redirect } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type LoaderType = { request: Request, params: Params }
export async function LoginForm() {
    return redirect("/")
}