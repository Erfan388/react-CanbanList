import type {ReactNode} from "react";

import styles from './Logo.module.css';
import {useSideBarStore} from "@/stores/sideBar-store.ts";

export default function Logo(): ReactNode {
    const isCollapsed = useSideBarStore(state => state.isCollapsed);

    return <div className={styles.logo}>{isCollapsed ? "C" : "Canban"}</div>;
}