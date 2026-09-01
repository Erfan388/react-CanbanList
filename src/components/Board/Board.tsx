import {type ReactNode} from "react";

import styles from './Board.module.css';

import BoardToolbar from "@/components/Board/components/BoardToolbar/BoardToolbar.tsx";
import BoardList from "@/components/Board/components/BoardList/BoardList.tsx";
import type {BoardType} from "@/types/board.ts";

type Props = {
    board : BoardType
}

function Board({board} : Props): ReactNode {

    return (
        <div className={styles.board}>
            <BoardToolbar board={board}/>
            <BoardList lists={board.lists}/>
        </div>
    )
}

export default Board
