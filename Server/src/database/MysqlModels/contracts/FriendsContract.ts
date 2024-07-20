export type FriendsParam = {
    friendOne: string
    friendTwo: string
}
export type getFriendsParams = { limit: number }
export type responseFriendRequestParams = { response: boolean, requestFriend: string, yourPublicId: string }

export interface FriendContract {
    submitFriendRequest(data: FriendsParam): GenericClassReturnType
    getFriends({ limit }: getFriendsParams): GenericClassReturnType
    responseFriendRequest({ response, requestFriend, yourPublicId }: responseFriendRequestParams): GenericClassReturnType
}