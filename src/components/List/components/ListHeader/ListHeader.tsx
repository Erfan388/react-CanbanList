import {type ReactNode, useRef} from "react";

import styles from './ListHeader.module.css';
import IconButton from "@/components/IconButton/IconButton.tsx";
import MingcuteAddLine from "@/components/icons/MingcuteAddLine.tsx";
import DotsLineIcon from '@iconify-react/mingcute/dots-line';
import ListItemModal from "../../../../modals/ListItemModal/ListItemModal.tsx";
import type {SyntheticListenerMap} from "@dnd-kit/core/dist/hooks/utilities";
import MingcuteEdit2Line from "@/components/icons/MingcuteEdit2Line.tsx";
import ListModal from "@/modals/ListModal/ListModal.tsx";
import type {ListType} from "@/types/list.ts";

type Props = {
    list: ListType;
    listIndex: number;
    listeners?: SyntheticListenerMap;
}

export default function ListHeader({list, listIndex, listeners}: Props): ReactNode {
    const listModalRef = useRef<HTMLDialogElement>(null);
    const listItemModalRef = useRef<HTMLDialogElement>(null);


    const handleCreateButtonClick = () => {
        listItemModalRef.current?.showModal();
    };
    const handleEditListButtonClick = () => {
        listModalRef.current?.showModal();
    };

    return <div className={styles['list-header']}>
        <div className={styles['drag-handle']} {...listeners}>
            <DotsLineIcon height="1em"/>
            <div className={styles.title}>{list.title}</div>
        </div>
        <div className={styles.actions}>
            <IconButton onClick={handleEditListButtonClick}>
                <MingcuteEdit2Line/>
            </IconButton>
            <IconButton onClick={handleCreateButtonClick}>
                <MingcuteAddLine/>
            </IconButton>
        </div>
        <ListModal listIndex={listIndex} modalRef={listModalRef} defaultValues={list}/>
        <ListItemModal modalRef={listItemModalRef} listIndex={listIndex}/>
    </div>;
}