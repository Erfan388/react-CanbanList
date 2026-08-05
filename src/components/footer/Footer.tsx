import type {ReactNode} from "react";

import styles from "./Fotter.module.css";


export default function Footer():ReactNode {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>copyright &copy; {year}</footer>
    )
}