import {type ReactNode} from "react";
import styles from "./BoardPage.module.css";

import Board from "@/components/Board/Board.tsx";
import DndProvider from "@/Providera/DndProvider/DndProvider/DndProvider.tsx";
import {useParams} from "react-router";
import UndefindPage from "@/pages/UndefindPage/UndefindPage.tsx";
import {useKanbanStore} from "@/stores/kanban-store/kanban-store.ts";

export default function BoardPage(): ReactNode {
    const {id} = useParams();

    const boards = useKanbanStore(state => state.boards);


    const board = boards.find((board) => board.id === id);

    if (!board) return <UndefindPage/>;

    return (
                <DndProvider>
                    <div className={styles["board-page"]}>
                        <Board board={board}/>
                    </div>
                </DndProvider>
    );
}


