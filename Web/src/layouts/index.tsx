// Components
import Header from "./header/header";

// Styles
import './index.css'
import Footer from "./footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}