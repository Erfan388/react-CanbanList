import type {ReactNode} from "react";

import styles from './BoardToolbar.module.css';
import IconButton from "@/components/IconButton/IconButton.tsx";
import MingcuteAddLine from "@/components/icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "@/components/icons/MingcuteEdit2Line.tsx";

export default function BoardToolbar(): ReactNode {
    return <div className={styles['board-toolbar']}>
        <div className={styles.title}>Board title</div>
        <div className={styles.actions}>

            <IconButton>
                <MingcuteAddLine/>
            </IconButton>
            <IconButton>
                <MingcuteEdit2Line/>
            </IconButton>
        </div>
    </div>;
}