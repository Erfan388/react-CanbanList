import {type ReactNode, useRef} from "react";

import styles from './BoardToolbar.module.css';
import IconButton from "@/components/IconButton/IconButton.tsx";
import MingcuteAddLine from "@/components/icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "@/components/icons/MingcuteEdit2Line.tsx";
import ListModal from "@/modals/ListModal/ListModal.tsx";
import BoardModal from "@/modals/BoardModal/BoardModal.tsx";
import type {BoardType} from "@/types/board.ts";

type Props = {
    board : BoardType
}

export default function BoardToolbar({board} : Props): ReactNode {

    const ListmodalRef = useRef<HTMLDialogElement>(null);
    const BoardmodalRef = useRef<HTMLDialogElement>(null);

    const handleCreateButtonListClick = (): void => {
        ListmodalRef.current?.showModal();
    };

    const handleEditeButtonBoardClick = (): void => {
        BoardmodalRef.current?.showModal();
    };

    return <div className={styles['board-toolbar']}>
        <div className={styles.title}>{board.title}</div>
        <div className={styles.actions}>

            <IconButton onClick={handleEditeButtonBoardClick}>
                <MingcuteEdit2Line/>
            </IconButton>
            <IconButton onClick={handleCreateButtonListClick}>
                <MingcuteAddLine/>
            </IconButton>
        </div>
        <ListModal modalRef={ListmodalRef}/>
        <BoardModal boardId={board.id} modalRef={BoardmodalRef} />
    </div>;
}