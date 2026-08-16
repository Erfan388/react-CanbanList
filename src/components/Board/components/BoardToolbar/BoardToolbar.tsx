import {type ReactNode, use, useRef} from "react";

import styles from './BoardToolbar.module.css';
import IconButton from "@/components/IconButton/IconButton.tsx";
import MingcuteAddLine from "@/components/icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "@/components/icons/MingcuteEdit2Line.tsx";
import ListModal from "@/modals/ListModal/ListModal.tsx";
import {BoardpageContext} from "@/context/board-page-context.ts";

export default function BoardToolbar(): ReactNode {
    const {board} = use(BoardpageContext)

    const modalRef = useRef<HTMLDialogElement>(null);

    const handleCreateButtonListClick = (): void => {
        modalRef.current?.showModal();
    };

    return <div className={styles['board-toolbar']}>
        <div className={styles.title}>{board.title}</div>
        <div className={styles.actions}>

            <IconButton>
                <MingcuteEdit2Line/>
            </IconButton>
            <IconButton onClick={handleCreateButtonListClick}>
                <MingcuteAddLine/>
            </IconButton>
        </div>
        <ListModal modalRef={modalRef}/>
    </div>;
}