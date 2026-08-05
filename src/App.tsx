import {type ReactNode} from "react";

import RootLayout from "@/Layouts/RouteLayout/RootLayout.tsx";
import {Routes, Route} from "react-router";

import HomePage from "@/pages/HomePage/HomePage.tsx";
import BoardPage from "@/pages/BoardPage/BoardPage.tsx";
import UndefindPage from "@/pages/UndefindPage/UndefindPage.tsx";


import("./components/boardCard/boardCard.tsx");

export default function App(): ReactNode {
    return (
        <Routes>
            <Route element={<RootLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="board/:id" element={<BoardPage/>}/>
                <Route path="*" element={<UndefindPage />} />
            </Route>
        </Routes>
    )
};

cd react-first-projectcd react-first-projectcd react-first-project