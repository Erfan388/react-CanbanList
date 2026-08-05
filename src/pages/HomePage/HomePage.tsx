import type {ReactNode} from "react";

import styles from "./HomePage.module.css";
import Button from "@/components/Button/Button.tsx";
import BoardCard from "@/components/boardCard/boardCard.tsx";
// import Header from "@/components/Header/Header.tsx";
// import Footer from "@/components/Footer/Footer.tsx";

export default function HomePage(): ReactNode {
    return (
        <div className={styles["home-page"]}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Boards</h1>
                    <Button variant="outlined" color="primary">
                        click
                    </Button>
                </div>
                <ul className={styles.boards}>
                    <li>
                        <BoardCard title="board 1"
                                   description="welcome to jefery epstin website the site is full of MR. jeff boards."
                                   color="green" id={1}/>
                    </li>
                    <li>
                        <BoardCard title="board 2"
                                   description="welcome to jefery epstin website the site is full of MR. jeff boards."
                                   color="yellow" id={2}/>

                    </li>
                    <li>
                        <BoardCard title="board 3"
                                   description="welcome to jefery epstin website the site is full of MR. jeff boards."
                                   color="blue" id={3} />

                    </li>
                </ul>
        </div>
    )
}
