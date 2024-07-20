export type ProfileReviewsStructureType = {
    publicId: `${string}-${string}-${string}-${string}-${string}`,
    username: string,
    image: number,
    content: string,
    date: `${string}-${string}-${string}` // "DD-MM-YYYY"
}
export type ProfileReviewsType = {
    data: ProfileReviewsStructureType[]
}
export type GetProfileReviewDef = { publicId: string }
export type ProfileReviewsSendStructureType = { publicId: string, content: string }

export interface ProfileReviewsContract {
    createProfileReview(data: ProfileReviewsType & PublicIdType): GenericClassReturnType,
    insertProfileReview({ data, publicId }: { data: ProfileReviewsSendStructureType, publicId: string }): GenericClassReturnType,
    getProfileReviews({ publicId }: GetProfileReviewDef): GenericClassReturnType
}