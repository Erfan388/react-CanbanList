import {type ComponentProps, memo, type ReactNode} from "react";

import styles from "./IconButton.module.css";
import clsx from "clsx";

type Props = ComponentProps<'button'>;

const IconButton = memo(function IconButton({
                                   children,
                                   className,
                                   ...otherProps
                               }: Props): ReactNode {
    return (

        <button {...otherProps} className={clsx(styles['icon-button'], className)}>
            {children}
        </button>);
});

export default IconButton;