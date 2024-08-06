import { ReactNode } from "react"

declare namespace PageTransition {
    type ProviderJSONExpect = "loader" | "children"

    type ProviderProps = { children: ReactNode }
    type ProviderVariables = {
        loader: number,
        [x: string]: number | ReactNode
    } & ProviderProps
    type ReducerObject = { action: ProviderJSONExpect, value: number }
    type ContextProps = {
        loader: number,
        ModifyPageTransition(value: number): void
    }
}

declare namespace User {
    type ProviderJSONExpect = "Currency" | "Name" | "Picture" | "PublicId" | "Wishlist"

    type ProviderProps = { children: ReactNode }

    type ProviderVariables = {
        Name: string
        Picture: string
        PublicId: string
        Currency: number,
        Library: RequestAPI.GameDataType[] | null
        Wishlist: RequestAPI.GameDataType[] | null
    }

    type ReducerObject = ProviderVariables

    type ContextProps = {
        User: ProviderVariables
        EditUser({ User }: ProviderVariables): void
    }
}

declare namespace Profile {
    type ProviderProps = { children: ReactNode }

    type ProviderVariables = {
        Library: RequestAPI.GameDataType[] | null
        ProfileName: string
        ProfilePicure: string
        Theme: number
        RealName: string
        Status: "Offline" | "Online"
        Items: RequestAPI.GameDataType[] | null
        Wishlist: RequestAPI.GameDataType[] | null
    }

    type ReducerObject = ProviderVariables

    type ContextProps = {
        Profile: ProviderVariables,
        EditProfile({ Profile }: ProviderVariables): void
    }
}