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
import { GameLoader, StoreLoader, LoginForm, ProfileLoader } from "loaders";

const RouterStructure = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index loader={StoreLoader} element={<HomePage bannerEvent="/HomeHeader.png" />} />
            <Route path="game/:IdGame" loader={GameLoader} element={<GamePage />} />
            <Route path="/login" loader={LoginForm} element={<Login />} />
            <Route path="/profile/:userId" loader={ProfileLoader} element={<ProfilePage />} />
            <Route path="*" element={<ErrorPage />} />
        </Route>
    )
)

export default RouterStructure