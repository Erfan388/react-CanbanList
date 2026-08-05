import {type ComponentProps, type ReactNode, useId} from "react";

import styles from './TextInput.module.css';
import clsx from "clsx";


type Props = ComponentProps<'input'> & {
    label: string;
    type: "text";
    error?: string | null;
}


export default function TextInput({className, error, label, ...otherProps}: Props): ReactNode {
    const id = useId();

    return <div className={clsx(styles['text-input'], !!error && styles.error, className)}>
        <label htmlFor={id}>{label}</label>
        <input id={id} {...otherProps} placeholder="enter yout text"/>
        <span className={styles.error}>{error || "\u00A0"}</span>
    </div>;
}