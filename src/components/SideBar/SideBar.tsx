import type {ReactNode} from "react";

import styles from './SideBar.module.css';
import {Link} from "react-router";
import SideBarItem from "@/components/SideBar/components/SideBarItem/SideBarItem.tsx";
import ExitIcon from '@iconify-react/iconamoon/exit';
import SideBarGroups from "@/components/SideBar/components/SideBarGroups/SideBarGroups.tsx";
// import Home7LineIcon from '@iconify-react/mingcute/home-7-line';

export default function SideBar(): ReactNode {
    return <aside className={styles['side-bar']}>
        <div className={styles.header}>
            <Link to="/" className={styles.logo}>
                <img src="/public/icons.svg" alt="" />
            </Link>
        </div>

        <nav>
            <SideBarGroups />
        </nav>

        <div className={styles.footer}>
            <SideBarItem title="Sign Out" color="gray" icon={<ExitIcon height="1em" />} />
        </div>
    </aside>
}