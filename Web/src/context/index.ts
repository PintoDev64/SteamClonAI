import { createContext } from "react";
import { Modal, PageTransition, Profile, User } from "./context";

export const PageTransitionContext = createContext<PageTransition.ContextProps>(null!)
export const UserContext = createContext<User.ContextProps>(null!)
export const ProfileContext = createContext<Profile.ContextProps>(null!)
export const ModalContext = createContext<Modal.ContextProps>(null!)