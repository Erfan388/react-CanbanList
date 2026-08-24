import {type ComponentProps, type ReactNode, useContext} from "react";

import styles from './SideBarGroups.module.css';
import  SideBarItem from "@/components/SideBar/components/SideBarItem/SideBarItem.tsx";
import {BoardsContext} from "@/context/boards-context.ts";
import Home7LineIcon from '@iconify-react/mingcute/home-7-line';
import MingcuteAddLine from "@/components/icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "@/components/icons/MingcuteEdit2Line.tsx";


type SideBarGroup = {
    title?: string;
    items: ComponentProps<typeof SideBarItem>[];
}
export default function SideBarGroups(): ReactNode {
    const {boards} = useContext(BoardsContext)

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
                    icon: <MingcuteEdit2Line />
                }
            ]
        },
        {
            title: "Boards",
            items: boards.map((board) => ({
                href: `/board/${board.id}`,
                title: board.title ,
                color: board.color,
                icon: <MingcuteAddLine />
            }))
        }
    ]

    return groups.map( (group , groupIndex) => (
        <div key={groupIndex} className={styles.group}>
            {group.title && <div className={styles.title}>{group.title}</div>}
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