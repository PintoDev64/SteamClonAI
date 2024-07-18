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

declare type FriendsType = {
    friendOne: string
    friendTwo: string
}

declare type UserTableInterface = {
    PUBLIC_ID: string
    STATUS: string
    PROFILE_NAME: string
    ACCOUNT_NAME: string
    REAL_NAME: string
    VAC_STATUS: boolean
    MAIL: string
    THEME: number
    PROFILE_PICTURE: number
    BACKGROUND_IMAGE: number
    TOKEN: string
    PASSWORD: string
}

declare type FriendsTableInterface = {
    RELATION_ID: number,
    STATUS: boolean,
    FRIEND_ONE_ID: string
    FRIEND_TWO_ID: string
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