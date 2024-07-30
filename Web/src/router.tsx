import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import MainLayout from "@layouts/index";

import GamePage from "@Modules/game";
import HomePage from "@Modules/home";
import { GameLoader, StoreLoader } from "loaders";

const RouterStructure = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index loader={StoreLoader} element={<HomePage bannerEvent="/HomeHeader.png" />} />
            <Route  path="game/:IdGame" loader={GameLoader} element={<GamePage />}/>
        </Route>
    )
)

export default RouterStructure