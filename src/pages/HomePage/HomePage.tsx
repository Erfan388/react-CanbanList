import {type ReactNode, use, useRef} from "react";

import styles from "./HomePage.module.css";
import Button from "@/components/Button/Button.tsx";
import BoardCard from "@/components/boardCard/boardCard.tsx";
import {BoardsContext} from "@/context/boards-context.ts";
import BoardModal from "@/modals/BoardModal/BoardModal.tsx";


export default function HomePage(): ReactNode {
    const {boards} = use(BoardsContext)

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



