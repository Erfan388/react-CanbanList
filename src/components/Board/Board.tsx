import {type ReactNode} from "react";

import styles from './Board.module.css';

import BoardToolbar from "@/components/Board/components/BoardToolbar/BoardToolbar.tsx";
import BoardList from "@/components/Board/components/BoardList/BoardList.tsx";


function Board(): ReactNode {

    return (
        <div className={styles.board}>
            <BoardToolbar/>
            <BoardList/>
        </div>
    )
}

export default Board
