export type createUserParams =  UserType & PublicIdType & TokenType & PasswordType
export type getUserParams = { publicId: string }

export interface UserContract {
    createUser({ AccountName, backgroundImage, mail, password, profileName, profilePicture, publicId, realName, status, theme, token, vacStatus
    }: createUserParams): GenericClassReturnType
    getUser({ publicId }: getUserParams): GenericClassReturnType
}