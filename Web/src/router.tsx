import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import MainLayout from "@layouts/index";

import GamePage from "@Modules/game";
import HomePage from "@Modules/home";
import { GameLoader, StoreLoader } from "loaders";
import Login from "@Modules/login";
import { LoginForm } from "action";

const RouterStructure = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index loader={StoreLoader} element={<HomePage bannerEvent="/HomeHeader.png" />} />
            <Route path="game/:IdGame" loader={GameLoader} element={<GamePage />}/>
            <Route path="/login" action={LoginForm} element={<Login />} />
        </Route>
    )
)

export default RouterStructure