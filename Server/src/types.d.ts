// |---------> General Purpose
declare namespace GeneralTypes {
    type GameReviewsType = {
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

    type UserType = {
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
    type FriendChatType = {
        relationId: number,
        data: {
            username: string,
            image: number,
            content: string,
            date: `${string}-${string}-${string}`
        }
    }
    type ProfileReviewsType = {
        publicId: `${string}-${string}-${string}-${string}-${string}`,
        username: string,
        image: number,
        content: string,
        date: `${string}-${string}-${string}` // "DD-MM-YYYY"
    }
}

// |---------> MySQL Database Schemas
declare namespace MySQLSchemas {
    type UserTable = {
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
        PASSWORD: string,
        LIBRARY: (getGameDataType & IdGameType)[]
    }

    type FriendsTable = {
        RELATION_ID: number,
        STATUS: boolean,
        FRIEND_ONE_ID: string
        FRIEND_TWO_ID: string
    }

    type CartTable = {
        ACCOUNT_ID: number,
        ITEMS: (getGameDataType & IdGameType)[]
    }

    type __FieldPacket = {
        fieldCount: number,
        affectedRows: number,
        insertId: number,
        info: string,
        serverStatus: number,
        warningStatus: number,
        changedRows: number0
    }

    type __QueryArray = [any, FieldPacket[]]
}

// |---------> Operation Database
declare namespace DatabaseOperation {
    type MethodReturnStructure = { status: HTTPCodes; data?: any }
    type GenericClassReturnType = Promise<MethodReturnStructure>
}

// |---------> Library
declare namespace Library {
    type getUserParams = { publicId: string }
    type getPrivateUserParams = { accountId: number }
}

// |---------> User
declare namespace User {
    type createUserParams = UserType & PublicIdType & TokenType & PasswordType
    type getUserParams = { publicId: string }
}

// |---------> Cart
declare namespace Cart {

}

// |---------> Profile
declare namespace ProfileReviews {
    type GetProfileReviewDef = { publicId: string }
    type ProfileReviewsSendStructureType = { publicId: string, content: string }
    type insertProfileReviewType = { data: ProfileReviews.ProfileReviewsSendStructureType, publicId: string }
}

// |---------> Game Review
declare namespace GameReview {
    type CreateGameReviewParam = GeneralTypes.GameReviewsType & IdGameType
    type InsertGameReviewParams = { data: GeneralTypes.GameReviewsType & IdGameType, idGame: string }
    type GetGameReviewsParams = { idGame: string }
}

// |---------> Game Data
declare namespace GameData {
    type InsertGameDataParam = GameDataType & IdGameType
    type IdGameType = { idGame?: UUIDPattern | UUIDPattern[], name?: string | string[] }
}

// |---------> Friends
declare namespace Friends {
    type submitFriendRequestParam = { friendOne: string, friendTwo: string }
    type getFriendsParams = { limit: number }
    type responseFriendRequestParams = { response: boolean, requestFriend: string, yourPublicId: string }
}

// |---------> Friends Chat
declare namespace FriendsChat {
    type GetChatParams = { relationId: number, limit: { min: number, max: number } | undefined }
    type ExistChatParams = { chatId: number, yourPublicId: string, yourFriendId: string }
    type FriendChatStructureType = {
        username: string,
        image: number,
        content: string,
        date: `${string}-${string}-${string}`// "DD-MM-YYYY"
    }
}

// |---------> Patterns
type UUIDPattern = `${string}-${string}-${string}-${string}-${string}`
type DatePattern = `${string}-${string}-${string}`

// |---------> Local
type HTTPCodes = "200" | "302" | "404" | "500"

// |---------> Globals
declare type getGameDataType = { _id: ObjectId } & GameDataType
declare type PasswordType = { password: string }
declare type TokenType = { token: string }
declare type PublicIdType = { publicId: UUIDPattern }
declare
declare type GameDataType = {
    name: string,
    shortDescription: string,
    icon: string,
    images: {
        type: "image" | "video",
        url: string
    }[],
    releaseDate: DatePattern // "DD-MM-YYYY",
    developer: {
        name: string,
        url: string
    },
    publishers: {
        name: string,
        url: string | undefined
    }[],
    downloadUrl: string,
    categories: string[],
    features: ("Single-Player" | "Online PvP" | "Online Co-op" | "Cross-Platform Multiplayer" | "Steam Achievements" | "Captiosn Available" | "In-App Purchases" | "Steam Cloud" | "Steam Trading Cards" | "Valve Anti-Cheat")[],
    requirements: {
        type: "3rd-Party Account",
        accountName: string
    } | undefined,
    lenguajes: Record<"Spanish" | "English" | "Japanise", {
        interface?: boolean,
        subtitles?: boolean,
        audio?: boolean
    } | undefined>,
    links: {
        url: string
    },
    platforms: Record<"Win" | "Mac" | "Lin", {
        OS: string,
        processor: string,
        Memory: string,
        Graphics: string,
        DirectX: string,
        Storage: string,
        SoundCard?: string,
        AddiotionalNotes?: string,
    } | undefined>,
    products: {
        name: string,
        content?: string[],
        price: {
            default: number,
            format: "Dollar",
            discount?: {
                value: number,
                finalDate: string // "DD-MM-YYYY"
            }
        }
    }[],
    downloadableContent: {
        name: string,
        price: {
            default: number,
            format: "Dollar" | "Cop" | "Eur",
            discount: {
                value: number,
                finalDate: string // "DD-MM-YYYY"
            }
        }
    }[],
    about: string
}