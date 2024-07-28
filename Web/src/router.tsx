import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import MainLayout from "@layouts/index";

import HomePage from "@Modules/home";

const RouterStructure = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage bannerEvent="/SteamAutumnSale.webp" TextEvent="Steam Winter Sale" />} />
        </Route>
    )
)

export default RouterStructure