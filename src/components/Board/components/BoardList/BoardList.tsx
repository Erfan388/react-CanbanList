import {type ReactNode} from "react";

import styles from './BoardList.module.css';
import List from "@/components/List/List.tsx";
import {SortableContext} from "@dnd-kit/sortable";
import type {ListType} from "@/types/list.ts";

type Props = {
    lists : ListType[]
}

export default function BoardList({lists} : Props): ReactNode {


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