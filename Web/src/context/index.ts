import { createContext } from "react";
import { PageTransition, Profile, User } from "./context";

export const PageTransitionContext = createContext<PageTransition.ContextProps>(null!)
export const UserContext = createContext<User.ContextProps>(null!)
export const ProfileContext = createContext<Profile.ContextProps>(null!)