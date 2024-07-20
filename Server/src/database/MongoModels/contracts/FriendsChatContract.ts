export type FriendChatStructureType = {
    username: string,
    image: number,
    content: string,
    date: `${string}-${string}-${string}`// "DD-MM-YYYY"
}

export type GetChatParams = { relationId: number, limit: { min: number, max: number } | undefined }
export type ExistChatParams = { chatId: number, yourPublicId: string, yourFriendId: string }

export interface ChatFriendContract {
    existFriendChat({ chatId, yourPublicId, yourFriendId }: ExistChatParams): Promise<boolean>
    getChats({ relationId, limit }: GetChatParams): GenericClassReturnType
    getChats({ relationId, limit }: GetChatParams): GenericClassReturnType
}