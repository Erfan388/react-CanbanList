import type {ReactNode} from "react";

import styles from './ListItems.module.css';
import {SortableContext} from "@dnd-kit/sortable";
import ListItem from "@/components/ListItem/ListItem.tsx";
import type {ListType} from "@/types/list.ts";
import {useDroppable} from "@dnd-kit/core";

type Props = {
    presentational?: boolean;
    listIndex: number;
    list: ListType;
}

export default function ListItems({presentational, list, listIndex}: Props): ReactNode {
    const {setNodeRef} = useDroppable({
        id: list.id,
        data: {
            isList: true, listIndex, list
        }
    });

    return (
        <SortableContext id={list.id} items={list.items.map(item => item.id)}>
            <ul ref={setNodeRef} className={styles["list-items"]}>
                {
                    list.items.map((item, itemIndex) => (
                        <li key={item.id}>
                            <ListItem Presentational={presentational} listIndex={listIndex} itemIndex={itemIndex} item={item}/>
                        </li>
                    ))
                }
            </ul>
        </SortableContext>
    )
}