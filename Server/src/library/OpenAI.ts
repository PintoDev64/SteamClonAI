import { generateText } from "ai";
import { GPT4o_mini } from "../constants";

export async function StoreRecommendation(categories: string, game: string, user: string) {
    const prompt = `
    A partir de las categorias ${categories}, cuales de estos juegos me recomiendas "${game}", responde unicamente con un array de maximo 9 elementos con los nombres de los juegos que me recomiendes
    `

    const QueryParam = {
        model: GPT4o_mini("gpt-4o-mini", { user }),
        prompt,
        stream: true,
        max_tokens: 512,
        temperature: 0.75,
        frequency_penalty: 1,
    } as const

    const { text } = await generateText(QueryParam)
    return text
}

export function GameReviews(data: string) {

}