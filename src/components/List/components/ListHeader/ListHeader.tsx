import {type ReactNode, useRef} from "react";

import styles from './ListHeader.module.css';
import IconButton from "@/components/IconButton/IconButton.tsx";
import MingcuteAddLine from "@/components/icons/MingcuteAddLine.tsx";
import MingcuteMore1Line from "@/components/icons/MingcuteMore1Line.tsx";
import DotsLineIcon from '@iconify-react/mingcute/dots-line';
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
            <DotsLineIcon height="1em" />
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