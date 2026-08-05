import {type ReactNode, useContext} from "react";

import styles from './Board.module.css';
import MingcuteAddLine from "@/components/icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "@/components/icons/MingcuteEdit2Line.tsx";

import IconButton from "../IconButton/IconButton.tsx"
import List from "@/components/List/List.tsx";
import {BoardContext} from "@/context/board-context.ts";
import {SortableContext} from "@dnd-kit/sortable";


function Board(): ReactNode {
    const {lists} = useContext(BoardContext)

    return (
        <div className={styles.board}>
            <div className={styles.toolbar}>
                <div className={styles.title}>Board title</div>
                <div className={styles.actions}>

                    <IconButton>
                        <MingcuteAddLine/>
                    </IconButton>
                    <IconButton>
                        <MingcuteEdit2Line/>
                    </IconButton>
                </div>
            </div>
            <SortableContext id="board" items={lists.map(list => list.id)}>
                <ul className={styles.lists}>
                    {
                        lists.map((list, listIndex) => (
                            <li key={list.id}>
                                <List listIndex={listIndex} list={list}/>
                            </li>
                        ))
                    }
                </ul>
            </SortableContext>
        </div>
    )
}

export default Board
