import { Outlet } from "react-router-dom";

// Components
import Header from "./header";
import Footer from "./footer";

// Styles
import './index.css'

// Context
import PageTransitionProvider from "context/PageTransition";
import UserProvider from "context/User";

export default function MainLayout() {
    return (
        <UserProvider>
            <PageTransitionProvider>
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </PageTransitionProvider>
        </UserProvider>
    )
}