import {type ReactNode, use} from "react";

import styles from "./HomePage.module.css";
import Button from "@/components/Button/Button.tsx";
import BoardCard from "@/components/boardCard/boardCard.tsx";
import BoardProvider from "@/Providera/BoardProvider.tsx";
import {BoardsContext} from "@/context/boards-context.ts";


export default function HomePage(): ReactNode {
    return (
        <BoardProvider>
            <HomePageContent/>
        </BoardProvider>
    );
}


function HomePageContent(): ReactNode {
    const {boards} = use(BoardsContext)


    return (
        <div className={styles["home-page"]}>
            <div className={styles.header}>
                <h1 className={styles.title}>Boards</h1>
                <Button variant="outlined" color="primary">
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
        </div>
    )
}
