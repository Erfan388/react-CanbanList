import {type ReactNode, useRef} from "react";

import styles from "./HomePage.module.css";
import Button from "@/components/Button/Button.tsx";
import BoardCard from "@/components/boardCard/boardCard.tsx";
import BoardModal from "@/modals/BoardModal/BoardModal.tsx";
import {useKanbanStore} from "@/stores/kanban-store/kanban-store.ts";


export default function HomePage(): ReactNode {
    const boards = useKanbanStore(state => state.boards);

    const modalRef = useRef<HTMLDialogElement>(null);

    const handleCreateButtonClick = (): void => {
        modalRef.current?.showModal();
    }
    return (
        <div className={styles["home-page"]}>
            <div className={styles.header}>
                <h1 className={styles.title}>Boards</h1>
                <Button variant="outlined" onClick={handleCreateButtonClick} color="primary">
                    click
                </Button>
            </div>
            <ul className={styles.boards}>
                {boards.map(board =>
                    <li key={board.id}>
                        <BoardCard board={board}/>
                    </li>
                )}
            </ul>
            <BoardModal modalRef={modalRef} />
        </div>
    )
}



