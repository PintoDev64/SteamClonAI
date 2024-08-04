import { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

// Styles
import '../index.css'

type CustomButtonProps<T extends "button" | "a"> = { text: string, type: T, to?: string } & ComponentProps<T>
export default function CustomButton<T extends "button" | "a">({ text, type, to, ...props }: CustomButtonProps<T>) {
    if (type === "a") {
        return (
            <Link to={to ?? "/"}  {...props as ComponentProps<"a">}>
                <span>{text}</span>
            </Link>
        )
    }

    return (
        <button {...props as ComponentProps<"button">}>
            <span>{text}</span>
        </button>
    )
}
