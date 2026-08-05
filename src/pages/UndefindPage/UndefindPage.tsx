import type {ReactNode} from "react";

import styles from './UndefindPage.module.css';
import {Link} from "react-router";

export default function UndefindPage(): ReactNode {
    return <div className={styles['undefind-page']}>
        <h2 className={styles.title}> This page is not undefind!</h2>
        <Link to={"/"} className={styles.link}> return to home page </Link>
    </div>;
}