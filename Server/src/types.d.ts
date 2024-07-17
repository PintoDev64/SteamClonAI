declare type PasswordType = { password: string }
declare type TokenType = { token: string }
declare type PublicIdType = { publicId: `${string}-${string}-${string}-${string}-${string}` }
declare type IdGameType = { idGame: `${string}-${string}-${string}-${string}-${string}` }

type HTTPCodes = "200" | "302" | "404" | "500"
declare type MethodReturnStructure = { status: HTTPCodes; data?: any }

declare type GenericClassReturnType = Promise<MethodReturnStructure>