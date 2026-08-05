import {type ComponentProps, type ReactNode} from "react";

import styles from "./Button.module.css";
import clsx from "clsx";

type Props = ComponentProps<'button'> & {
    variant?: "solid" | "outlined";
    color?: "primary" | "default";
}

export default function Button({
                                   variant = 'solid',
                                   color = "default",
                                   children,
                                   className,
                                   ...otherProps
                               }: Props): ReactNode {
    return (

        <button {...otherProps} className={clsx(styles.button, styles[variant], styles[color], className)}>
            Create
        </button>);
}