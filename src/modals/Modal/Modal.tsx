import {type ComponentProps, type ReactNode, type RefObject, type MouseEvent} from "react";

import styles from './Modal.module.css';
import IconButton from "@/components/IconButton/IconButton.tsx";
import CloseLineIcon from '@iconify-react/mingcute/close-line';
import clsx from "clsx";

type Props = ComponentProps<"dialog"> & {
    ref: RefObject<HTMLDialogElement | null>;
    ContentClassName?: string;
    heading: string;
};


export default function Modal({
                                  ref,
                                  className,
                                  ContentClassName,
                                  onClick,
                                  heading,
                                  children,
                                  ...otherProps
                              }: Props): ReactNode {

    const handleDialogClick = (event: MouseEvent<HTMLDialogElement>): void => {
        if (event.target === event.currentTarget) {
            ref.current?.close();
        } else {
            onClick?.(event);
        }
    };

    const handleCloseClick = () => {
        ref.current?.close();
    };

    return (
        <dialog
            onClick={handleDialogClick} ref={ref} className={clsx(styles.modal, className)}
            {...otherProps}>
            <header className={styles.header}>{heading}
                <div className={styles.actions}>
                    <IconButton onClick={handleCloseClick}>
                        <CloseLineIcon height="1em"/>
                    </IconButton>
                </div>
            </header>
            <main className={ContentClassName}>{children}</main>
        </dialog>
    )
}