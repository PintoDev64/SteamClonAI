/// <reference types="vite/client" />

declare type DatePattern = `${string}-${string}-${string}`
type _IdGame = { idGame: `${string}-${string}-${string}-${string}-${string}` }
type SystemRequeriments = {
    OS: string,
    processor: string,
    Memory: string,
    Graphics: string,
    DirectX: string,
    Storage: string
}

declare type GameShortDataType = {
    name: string,
    shortDescription: string,
    images: {
        type: string,
        url: string
    }[],
    categories: string[],
    platforms: {
        [K: "Win" | "Mac" | "Lin" | string]: SystemRequeriments | undefined
    },
    products: [
        {
            name: string,
            price: {
                default: number,
                format: "Dollar",
                discount?: {
                    value: number,
                    finalDate: DatePattern // "DD-MM-YYYY"
                }
            }
        }
    ]
}

//// --------------------
declare namespace ComponentsRequestProps {
    type GameDetails = {
        images: {
            type: "image" | "video",
            url: string
        }[],
        name: string,
        shortDescription: string,
        releaseDate: DatePattern,
        reviews: GameReviewsData,
        developer: {
            name: string,
            url: string
        },
        publishers: {
            name: string,
            url: string | undefined
        }[],
        categories: string[]
    }

    type GameAbout = {
        name: string,
        about: string,
        platforms: GameProducts["platforms"]
        products: GameProducts["products"]
        InLibrary: boolean,
        idGame: string
    }

    type GameProducts = {
        products: RequestAPI.GameDataType["products"],
        platforms: RequestAPI.GameDataType["platforms"]
        InLibrary: boolean
        idGame: string
    }

    type GameSidebar = {
        features: RequestAPI.GameDataType["features"],
        categories: RequestAPI.GameAllData["categories"]
    }
}
declare namespace RequestAPI {
    type GameAllData = GameDataType & { 
        reviews: GameReviewsData, 
        InLibrary: boolean
    }
    type GameDataType = {
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
        platforms: Record<"Win" | "Mac" | "Lin" | string, {
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
                    finalDate: DatePattern // "DD-MM-YYYY"
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
    } & _IdGame
    type GameReviewsData = {
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
    type Home_APIStore = {
        Featured: GameDataType[],
        Offers: GameDataType[],
        SteamAI: GameDataType[]
    }
    type Profile_API = {
        status: number,
        data: {
            LIBRARY: GameDataType[] | null,
            ITEMS: GameDataType[] | null,
            PROFILE_NAME: string,
            PROFILE_PICTURE: string,
            THEME: number,
            REAL_NAME: string,
            STATUS: "Offline" | "Online"
            WISHLIST: GameDataType[] | null
        }
    }
    type Cart_API = {
        data: {
            ITEMS: GameDataType[]
        }
    }
}