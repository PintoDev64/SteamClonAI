export type GameReviewsType = {
    data: {
        type: "recommended" | "non-recomended",
        username: string,
        image: string,
        userUrl: string,
        content: string,
        date: `${string}-${string}-${string}` // "DD-MM-YYYY",
        hours: number,
        reactions: {
            yes: number,
            no: number,
            funny: number
        }
    }[]
}
export type CreateGameReviewParam = GameReviewsType & IdGameType
export type InsertGameReviewParams = { data: GameReviewsType & IdGameType, idGame: string }
export type GetGameReviewsParams = { idGame: string }

export interface GameReviewContract {
    createGameReview(data: CreateGameReviewParam): GenericClassReturnType
    insertGameReview({ data, idGame }: InsertGameReviewParams): GenericClassReturnType
    getGameReviews({ idGame }: GetGameReviewsParams): GenericClassReturnType
}