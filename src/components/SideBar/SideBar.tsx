import type {ReactNode} from "react";

import styles from './SideBar.module.css';

export default function SideBar(): ReactNode {
    return <div className={styles['side-bar']}></div>;
}