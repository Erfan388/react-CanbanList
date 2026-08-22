import {type ReactNode, use} from "react";
import styles from "./BoardPage.module.css";

import ListProvider from "../../Providera/ListProvider.tsx";
import Board from "@/components/Board/Board.tsx";
import DndProvider from "@/Providera/DndProvider/DndProvider/DndProvider.tsx";
import {BoardsContext} from "@/context/boards-context.ts";
import {useParams} from "react-router";
import UndefindPage from "@/pages/UndefindPage/UndefindPage.tsx";
import BoardPageProvider from "@/Providera/BoardPageProvider.tsx";

export default function BoardPage(): ReactNode {
    const {id} = useParams();

    const {boards} = use(BoardsContext)

    const board = boards.find((board) => board.id === id);

    if (!board) return <UndefindPage/>;

    return (
        <BoardPageProvider board={board}>
            <ListProvider key={id}>
                <DndProvider>
                    <div className={styles["board-page"]}>
                        <Board/>
                    </div>
                </DndProvider>
            </ListProvider>
        </BoardPageProvider>
    );
}


