import {type ComponentProps, type ReactNode, useContext} from "react";

import styles from './SideBarGroups.module.css';
import SideBarItem from "@/components/SideBar/components/SideBarItem/SideBarItem.tsx";
import {BoardsContext} from "@/context/boards-context.ts";
import Home7LineIcon from '@iconify-react/mingcute/home-7-line';
import Settings5FillIcon from '@iconify-react/mingcute/settings-5-fill';
import Initials from "@/components/Intials/Initials.tsx";
import {SideBarContext} from "@/components/SideBar/context/sidebar-context.ts";
import clsx from "clsx";


type SideBarGroup = {
    title?: string;
    items: ComponentProps<typeof SideBarItem>[];
}
export default function SideBarGroups(): ReactNode {
    const {boards} = useContext(BoardsContext)
    const {isCollapsed} = useContext(SideBarContext);

    const groups: SideBarGroup[] = [
        {
            items: [
                {
                    href: '/',
                    title: "Home",
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
                    color: 'gray',
                    icon: <Settings5FillIcon height="30px"/>
                }
            ]
        },
        {
            title: "Boards",
            items: boards.map((board) => ({
                href: `/board/${board.id}`,
                title: board.title,
                color: board.color,
                icon: <Initials title={board.title} color={board.color}/>
            }))
        }
    ]

    return groups.map((group, groupIndex) => (
        <div key={groupIndex} className={clsx(styles.group, isCollapsed && styles.collapsed)}>
            {group.title && <div className={styles.title}>{ isCollapsed ? group.title[0] : group.title}</div>}
            <ul>
                {
                    group.items.map(item => <li key={item.href}>
                        <SideBarItem {...item} />
                    </li>)
                }
            </ul>
        </div>
    ))


}