declare type UserType = {
    status: string,
    profileName: string,
    AccountName: string,
    realName: string,
    vacStatus: number,
    mail: string,
    theme: number,
    profilePicture: number,
    backgroundImage: number
}

declare type FriendChatType = {
    relationId: number,
	data: {
		username: string,
		image: number,
		content: string,
		date: `${string}-${string}-${string}`
	}
}