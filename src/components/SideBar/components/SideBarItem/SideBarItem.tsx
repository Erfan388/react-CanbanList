import {type ReactNode} from "react";

import styles from './SideBarItem.module.css';
import type {BoardColor} from "@/types/board.ts";
import clsx from "clsx";
import {NavLink} from "react-router";
import {useSideBarStore} from "@/stores/sideBar-store.ts";

type Props = {
    href?: string;
    title: ReactNode;
    color: BoardColor
    icon: ReactNode;
    onClick?: () => void;
}


export default function SideBarItem({href, title, color, icon, onClick}: Props): ReactNode {
    const isCollapsed = useSideBarStore(state => state.isCollapsed)

    const className = clsx(styles['sidebar-item'], color, isCollapsed && styles.Collapsed);

    const children = (
        <>
            <span className={styles.icon}>{icon}</span>
            <span className={styles.title}>{title}</span>
        </>
    )

    if (!href) {
        return (
            <button className={className} onClick={onClick}>{children}</button>
        )
    }

    return (
        <NavLink to={href}
                 className={({isActive}) =>
                     clsx(className, isActive && styles.active)
                 }>
            {children}
        </NavLink>
    )

}