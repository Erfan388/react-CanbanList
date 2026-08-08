import {type ComponentProps, type ReactNode, useId} from "react";

import styles from './TextArea.module.css';
import clsx from "clsx";


type Props = ComponentProps<'textarea'> & {
    label: string;
    type: "text";
    error?: string | null;
    name?: string;
}


export default function TextArea({className, error, label, name, ...otherProps}: Props): ReactNode {
    const id = useId();

    return <div className={clsx(styles['text-area'], !!error && styles.error, className)}>
        <label htmlFor={id}>{label}</label>
        <textarea name="title" id={id} {...otherProps} placeholder="enter yout text"/>
        <span className={styles.error}>{error || "\u00A0"}</span>
    </div>;
}