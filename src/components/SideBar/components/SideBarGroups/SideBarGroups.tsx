import {type ComponentProps, type ReactNode, useContext} from "react";

import styles from './SideBarGroups.module.css';
import SideBarItem from "@/components/SideBar/components/SideBarItem/SideBarItem.tsx";
import {BoardsContext} from "@/context/boards-context.ts";
import Home7LineIcon from '@iconify-react/mingcute/home-7-line';
import Settings5FillIcon from '@iconify-react/mingcute/settings-5-fill';
import MoonFillIcon from '@iconify-react/akar-icons/moon-fill';
import Initials from "@/components/Intials/Initials.tsx";
import clsx from "clsx";
import {useSideBarStore} from "@/stores/sideBar-store.ts";
import {useThemeStore} from "@/stores/theme-store.ts";


type SideBarGroup = {
    title?: string;
    items: ComponentProps<typeof SideBarItem>[];
}
export default function SideBarGroups(): ReactNode {
    const isCollapsed = useSideBarStore(state => state.isCollapsed);

    const theme = useThemeStore(state => state.theme);
    const toggleTheme = useThemeStore(state => state.toggleTheme);

    const {boards} = useContext(BoardsContext);

    const groups: SideBarGroup[] = [
        {
            items: [
                {
                    href: '/',
                    title: "Home",
                    id: "Home",
                    color: 'gray',
                    icon: <Home7LineIcon height="30px"/>
                }
            ]
        },
        {
            title: 'System',
            items: [
                {
                    href: '/setting',
                    title: "setting",
                    id: "setting",
                    color: 'gray',
                    icon: <Settings5FillIcon height="30px"/>
                },
                {
                    id: 'theme',
                    title: <span className={styles.spTitle}>{theme === "light" ? "dark" : "light"} mode</span>,
                    color: 'gray',
                    icon: <MoonFillIcon height="30px"/>,
                    onClick: toggleTheme,
                }
            ]
        },
        {
            title: "Boards",
            items: boards.map((board) => ({
                id: board.id ,
                href: `/board/${board.id}`,
                title: board.title,
                color: board.color,
                icon: <Initials title={board.title} color={board.color}/>
            }))
        }
    ]

    return groups.map((group, groupIndex) => (
        <div key={groupIndex} className={clsx(styles.group, isCollapsed && styles.collapsed)}>
            {group.title && <div className={styles.title}>{isCollapsed ? group.title[0] : group.title}</div>}
            <ul>
                {
                    group.items.map(item => <li key={item.id}>
                        <SideBarItem {...item} />
                    </li>)
                }
            </ul>
        </div>
    ))


}