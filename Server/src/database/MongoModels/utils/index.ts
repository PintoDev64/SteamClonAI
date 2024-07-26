type checkChatsIdsParams = {
    resultFriendChatData: MySQLSchemas.FriendsTable
    yourPublicId: string
    yourFriendId: string
}
export function checkChatsIds({ resultFriendChatData, yourFriendId, yourPublicId }: checkChatsIdsParams) {
    const checkOne = resultFriendChatData.FRIEND_ONE_ID === yourPublicId || resultFriendChatData.FRIEND_TWO_ID === yourPublicId
    const checkTwo = resultFriendChatData.FRIEND_ONE_ID === yourFriendId || resultFriendChatData.FRIEND_TWO_ID === yourFriendId
    return {
        checkOne,
        checkTwo
    }
}