import {type ReactNode} from "react";
import styles from "./RootLayout.module.css";

import Header from "@/components/Header/Header.tsx";
import Footer from "@/components/footer/Footer.tsx";
import BoardProvider from "@/Providera/BoardProvider.tsx";


import {Outlet} from "react-router";

export default function RootLayout(): ReactNode {
    return (
        <BoardProvider>
            <div className={styles.RootLayout}>
                <Header/>
                <main>
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        </BoardProvider>
    )
}