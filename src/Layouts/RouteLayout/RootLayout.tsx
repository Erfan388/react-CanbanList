import {type ReactNode} from "react";
import styles from "./RootLayout.module.css";

import Footer from "@/components/footer/Footer.tsx";


import {Outlet} from "react-router";
import SideBar from "@/components/SideBar/SideBar.tsx";

export default function RootLayout(): ReactNode {
    return (
            <div className={styles.RootLayout}>
                <main>
                    <Outlet/>
                </main>
                <SideBar />
                <Footer/>
            </div>
    )
}