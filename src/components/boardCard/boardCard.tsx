import type {ReactNode} from "react";

import styles from "./BoardCard.module.css";
import clsx from "clsx";
import { Link } from "react-router"
import type { BoardType} from "@/types/board.ts";

type BoardCardProps = {
    board: BoardType;
}


export default function BoardCard({board}: BoardCardProps): ReactNode {
    return (
        <div className={clsx(styles["board-card"] , board.color)}>
            <div className={clsx(styles.board)}>
                <div className={styles.cover}></div>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <div className={styles.title}>{board.title}</div>
                        <Link to={`/board/${board.id}`}>View</Link>
                    </div>
                    <p className={styles.description}>
                        {board.description}
                    </p>
                </div>
            </div>
        </div>
    )
}