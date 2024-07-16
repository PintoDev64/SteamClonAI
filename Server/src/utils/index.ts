// Local Constants
// Default HTTP Responses
const DEFAULT_404 = {
    message: "resource could not be found"
}
const DEFAULT_500 = {
    message: "We are sorry for the inconvenience with the service, we are investigating what happened, thank you :("
}

export const HTTPResponses = {
    "200": <T>(response: T, data: any) => {
        // @ts-ignore
        response.json(data)
    },
    "302": <T>(response: T) => {
        // @ts-ignore
        response.redirect("https://steam-clon-ai-web.vercel.app/")
    },
    "404": <T>(response: T) => {
        // @ts-ignore
        response.json(DEFAULT_404)
    },
    "500": <T>(response: T) => {
        // @ts-ignore
        response.json(DEFAULT_500)
    }
}