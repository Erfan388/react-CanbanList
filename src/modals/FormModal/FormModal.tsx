import {
    type ComponentProps,
    type ReactNode,
} from "react";

import styles from "./FormModal.module.css";
import Modal from "@/modals/Modal/Modal.tsx";
import Button from "@/components/Button/Button.tsx";
import clsx from "clsx";

type ModalProps = {
    modalRef: ComponentProps<typeof Modal>['ref'];
    heading: ComponentProps<typeof Modal>['heading'];
    onClose: ComponentProps<typeof Modal>['onClose'];
}

type FormProps = ComponentProps<"form"> & {
    onRemove?: false | (() => void);
}


type Props = ModalProps & FormProps;

export default function FormModal({
                                      modalRef,
                                      heading,
                                      onRemove,
                                      onClose,
                                      children,
                                      ...otherProps
                                  }: Props): ReactNode {


    const handleCancelButtonClick = () => {
        modalRef.current?.close();
    }

    return (
        <Modal ref={modalRef} ContentClassName={clsx(styles["form-modal"])}
               heading={heading} onClose={onClose}>
            <form {...otherProps} >
                {children}
                <div className={styles.actions}>
                    {onRemove && (
                        <Button
                            type="button"
                            variant="text"
                            color="danger"
                            onClick={onRemove}>
                            Remove
                        </Button>
                    )}
                    <Button type="reset" onClick={handleCancelButtonClick} className={styles.cancel}>Cancel</Button>
                    <Button type='submit' color='primary'>Submit</Button>
                </div>
            </form>

        </Modal>
    );
}