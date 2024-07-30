import { createContext } from "react";
import { PageTransition, User } from "./context";

export const PageTransitionContext = createContext<PageTransition.ContextProps>(null!)
export const UserContext = createContext<User.ContextProps>(null!)