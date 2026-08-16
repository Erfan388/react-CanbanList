import {type ReactNode, useRef} from "react";

import styles from "./BoardCard.module.css";
import clsx from "clsx";
import {Link} from "react-router"
import type {BoardType} from "@/types/board.ts";
import MingcuteEdit2Line from "@/components/icons/MingcuteEdit2Line.tsx";
import IconButton from "@/components/IconButton/IconButton.tsx";
import BoardModal from "@/modals/BoardModal/BoardModal.tsx";

type BoardCardProps = {
    board: BoardType;
}


export default function BoardCard({board}: BoardCardProps): ReactNode {
   const modalRef = useRef<HTMLDialogElement | null>(null);

   const handleEditButtonClick = () => {
       modalRef.current?.showModal();
   }
    return (
        <div className={clsx(styles["board-card"], board.color)}>
            <div className={clsx(styles.board)}>
                <div className={styles.cover}></div>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <Link className={styles.title} to={`/board/${board.id}`}>{board.title}</Link>
                        <IconButton onClick={handleEditButtonClick}>
                            <MingcuteEdit2Line/>
                        </IconButton>
                    </div>
                    <p className={styles.description}>
                        {board.description}
                    </p>
                </div>
            </div>
            <BoardModal modalRef={modalRef} boardId={board.id} defaultValues={board} />
        </div>
    )
}