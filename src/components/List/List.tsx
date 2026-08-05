import {memo, type ReactNode,} from "react";

import styles from './List.module.css';
import type {ListType} from "@/types/list.ts";

import ListHeader from "@/components/List/components/ListHeader/ListHeader.tsx";
import ListItems from "@/components/List/components/ListItems/ListItems.tsx";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import clsx from "clsx";

type Props = {
    presentational?: boolean;
    listIndex: number;
    list: ListType;
}

const List = memo(function List({presentational, listIndex, list}: Props): ReactNode {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({id: list.id, data: {isList: true, listIndex, list}});


    return <div ref={setNodeRef} className={clsx(styles.list, presentational)}
                style={{
                    opacity: isDragging ? ".5" : undefined,
                    transform: CSS.Translate.toString(transform),
                    transition
                }}
                {...attributes}
    >
        < ListHeader title={list.title} listIndex={listIndex} listeners={listeners}/>
        <ListItems presentational={presentational} listIndex={listIndex} list={list}/>
    </div>;
});

export default List;