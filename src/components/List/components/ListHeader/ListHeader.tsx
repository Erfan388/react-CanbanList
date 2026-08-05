import {type ReactNode, useRef} from "react";

import styles from './ListHeader.module.css';
import MingcuteAddLine from "@/components/icons/MingcuteAddLine.tsx";
import IconButton from "@/components/IconButton/IconButton.tsx";
import MingcuteMore1Line from "@/components/icons/MingcuteMore1Line.tsx";
import ListItemModal from "../../../../modals/ListItemModal/ListItemModal.tsx";
import type {SyntheticListenerMap} from "@dnd-kit/core/dist/hooks/utilities";

type Props = {
    title: string;
    listIndex: number;
    listeners?: SyntheticListenerMap;
}

export default function ListHeader({title, listIndex, listeners}: Props): ReactNode {
    const modalRef = useRef<HTMLDialogElement>(null);


    const handleCreateButtonClick = () => {
        modalRef.current?.showModal();
    }

    return <div className={styles['list-header']}>
        <div className={styles['drag-handle']} {...listeners}>
                <MingcuteMore1Line />
            <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.actions}>
            <IconButton>
                <MingcuteMore1Line/>
            </IconButton>
            <IconButton onClick={handleCreateButtonClick}>
                <MingcuteAddLine/>
            </IconButton>
        </div>
        <ListItemModal modalRef={modalRef} listIndex={listIndex}/>
    </div>;
}