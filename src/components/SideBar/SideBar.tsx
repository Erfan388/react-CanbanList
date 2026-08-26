import {type ReactNode, useState} from "react";

import styles from './SideBar.module.css';
import {Link} from "react-router";
import SideBarItem from "@/components/SideBar/components/SideBarItem/SideBarItem.tsx";
import ExitIcon from '@iconify-react/iconamoon/exit';
import SideBarGroups from "@/components/SideBar/components/SideBarGroups/SideBarGroups.tsx";
import {SideBarContext} from "@/components/SideBar/context/sidebar-context.ts";
import IconButton from "@/components/IconButton/IconButton.tsx";
import clsx from "clsx";
import EmojiRightwardsArrowIcon from '@iconify-react/arcticons/emoji-rightwards-arrow';

export default function SideBar(): ReactNode {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    const handleArrowClick = (): void => {
        setIsCollapsed(old => !old);
    };


    return (
        <SideBarContext value={{isCollapsed}}>
            <aside className={clsx(styles.sideBar , isCollapsed && styles.collapsed)}>
                <div className={styles.header}>
                    <Link to="/" className={styles.logo}>
                        <img src="/public/favicon.svg" alt="Canban Icon"/>
                    </Link>
                    <IconButton className={styles.arrow} onClick={handleArrowClick}>
                        <EmojiRightwardsArrowIcon/>
                    </IconButton>
                </div>

                <nav>
                    <SideBarGroups/>
                </nav>

                <div className={styles.footer}>
                    <SideBarItem title="Sign Out" color="gray" icon={<ExitIcon height="30px"/>}/>
                </div>
            </aside>
        </SideBarContext>
    )
}