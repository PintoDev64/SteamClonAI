import { Outlet } from "react-router-dom";

// Components
import Header from "./header";
import Footer from "./footer";

// Styles
import './index.css'

// Context
import UserProvider from "context/User";
import ModalElement from "./components/Modal";
import { useContext } from "react";
import { ModalContext } from "context";

export default function MainLayout() {

    const { Active } = useContext(ModalContext)

    return (
        <>
            <UserProvider>
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </UserProvider>
            {Active && <ModalElement />}
        </>
    )
}