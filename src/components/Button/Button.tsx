import {type ComponentProps, memo, type ReactNode} from "react";

import styles from "./Button.module.css";
import clsx from "clsx";

type Props = ComponentProps<'button'> & {
    variant?: "solid" | "outlined" | "text";
    color?: "primary" | "default" | "danger";
}

const Button = memo(function Button({
                                           variant = 'solid',
                                           color = "default",
                                           children,
                                           className,
                                           ...otherProps
                                       }: Props): ReactNode {
    return (

        <button {...otherProps}
                className={clsx(styles.button, styles[variant], styles[color], className)}>
            {children}
        </button>);
});

export default Button;