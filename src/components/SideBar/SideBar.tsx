import {type ReactNode} from "react";

import styles from './SideBar.module.css';
import {Link} from "react-router";
import SideBarItem from "@/components/SideBar/components/SideBarItem/SideBarItem.tsx";
import ExitIcon from '@iconify-react/iconamoon/exit';
import SideBarGroups from "@/components/SideBar/components/SideBarGroups/SideBarGroups.tsx";
import IconButton from "@/components/IconButton/IconButton.tsx";
import clsx from "clsx";
import EmojiRightwardsArrowIcon from '@iconify-react/arcticons/emoji-rightwards-arrow';
import {useSideBarStore} from "@/stores/sideBar-store.ts";
import Logo from "@/components/Logo/Logo.tsx";

export default function SideBar(): ReactNode {
    const isCollapsed = useSideBarStore(state => state.isCollapsed);
    const fold = useSideBarStore(state => state.fold);


    return (
        <aside className={clsx(styles.sideBar, isCollapsed && styles.collapsed)}>
            <div className={styles.header}>
                <Link to="/" className={styles.logo}>
                    <Logo/>
                </Link>
                <IconButton className={styles.arrow} onClick={fold}>
                    <EmojiRightwardsArrowIcon/>
                </IconButton>
            </div>

            <nav>
                <SideBarGroups/>
            </nav>

            <div className={styles.footer}>
                <SideBarItem id="sign out" title="Sign Out" color="gray" icon={<ExitIcon height="30px"/>}/>
            </div>
        </aside>
    )
}