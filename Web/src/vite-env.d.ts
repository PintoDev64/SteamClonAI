/// <reference types="vite/client" />

declare type DatePattern = `${string}-${string}-${string}`

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
}