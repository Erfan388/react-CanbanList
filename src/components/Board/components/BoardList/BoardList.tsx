import {type ReactNode, useContext} from "react";

import styles from './BoardList.module.css';
import List from "@/components/List/List.tsx";
import {SortableContext} from "@dnd-kit/sortable";
import {BoardContext} from "@/context/board-context.ts";

export default function BoardList(): ReactNode {
    const {lists} = useContext(BoardContext)


    return <SortableContext id="board" items={lists.map(list => list.id)}>
        <ul className={styles['board-list']}>
            {
                lists.map((list, listIndex) => (
                    <li key={list.id}>
                        <List listIndex={listIndex} list={list}/>
                    </li>
                ))
            }
        </ul>
    </SortableContext>
}