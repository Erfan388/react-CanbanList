import type {ReactNode} from "react";

import styles from "./BoardCard.module.css";
import clsx from "clsx";
import { Link } from "react-router"

type BoardColor = "gray" | "red" | "green" | "blue" | "yellow" | "white";
type BoardCardProps = {
    id: number;
    title: string;
    description: string;
    color: BoardColor;
}


export default function BoardCard({title, color, description , id}: BoardCardProps): ReactNode {
    return (
        <div className={clsx(styles["board-card"] , color)}>
            <div className={clsx(styles.board)}>
                <div className={styles.cover}></div>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <div className={styles.title}>{title}</div>
                        <Link to={`/board/${id}`}>View</Link>
                    </div>
                    <p className={styles.description}>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}