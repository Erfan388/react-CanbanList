import {type ReactNode} from "react";
import styles from "./BoardPage.module.css";

import BoardProvider from "../../Providera/BoardProvider.tsx";
import Board from "@/components/Board/Board.tsx";
import DndProvider from "@/Providera/DndProvider/DndProvider/DndProvider.tsx";

export default function BoardPage(): ReactNode {

    return (
        <BoardProvider>
            <DndProvider>
                <div className={styles["board-page"]}>
                    <Board/>
                </div>
            </DndProvider>
        </BoardProvider>
    )
};