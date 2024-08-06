import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

// Layouts
import MainLayout from "@layouts/index";

// Pages
import GamePage from "@Modules/game";
import HomePage from "@Modules/home";
import Login from "@Modules/login";
import ErrorPage from "@Modules/error";
import ProfilePage from "@Modules/profile";

// Loaders
import { GameLoader, StoreLoader, LoginForm, ProfileLoader, CartLoader } from "loaders";
import ProfileProvider from "context/Profile";
import ProfileGames from "@Modules/profile/modules/games";
import ProfileWishlist from "@Modules/profile/modules/wishlist";
import ProfileMain from "@Modules/profile/modules/main";
import CartPage from "@Modules/cart";
import RegisterPage from "@Modules/register";

const RouterStructure = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index loader={StoreLoader} element={<HomePage bannerEvent="/HomeHeader.png" />} />
            <Route path="game/:IdGame" loader={GameLoader} element={<GamePage />} />
            <Route path="/login" loader={LoginForm} element={<Login />} />
            <Route path="/register" loader={LoginForm} element={<RegisterPage />} />
            <Route
                path="/profile/:userId"
                loader={ProfileLoader}
                element={
                    <ProfileProvider>
                        <ProfilePage />
                    </ProfileProvider>
                } >
                <Route path="games" element={<ProfileGames />} />
                <Route path="wishlist" element={<ProfileWishlist />} />
                <Route index element={<ProfileMain />} />
            </Route>
            <Route path="/cart" loader={CartLoader} element={<CartPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Route>
    )
)

export default RouterStructure