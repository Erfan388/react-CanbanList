import {
    type ComponentProps,
    type ReactNode, type RefObject,
    useRef,
} from "react";

import styles from "./FormModal.module.css";
import Modal from "src/modals/Modal/Modal.tsx";
import Button from "src/components/Button/Button.tsx";
import clsx from "clsx";

type ModalProps = {
    modalRef: ComponentProps<typeof Modal>['ref'];
    heading: ComponentProps<typeof Modal>['heading'];
}

type FormProps = Omit<ComponentProps<"form">, "ref"> &
    {
        formRef: RefObject<HTMLFormElement | null>;
        extraActions?: ReactNode;
    }


type Props = ModalProps & FormProps;

export default function FormModal({
                                      modalRef,
                                      formRef,
                                      heading,
                                      extraActions,
                                      children,
                                      ...otherProps
                                  }: Props): ReactNode {
    const InternalFormRef = useRef<HTMLFormElement>(null);

    const handleModalClose = () => {
        InternalFormRef.current?.reset();
    };

    const handleCancelButtonClick = () => {
        modalRef.current?.close();
    }

    return (
        <Modal ref={modalRef} ContentClassName={clsx(styles["form-modal"])}
               heading={heading} onClose={handleModalClose}>
            <form ref={(node) => {
                InternalFormRef.current = node;

                if (formRef) {
                    formRef.current = node;
                }
            }} {...otherProps}>
                {children}
                <div className={styles.actions}>
                    {extraActions}
                    <Button type="reset" onClick={handleCancelButtonClick} className={styles.cancel}>Cancel</Button>
                    <Button type='submit' color='primary'>Submit</Button>
                </div>
            </form>

        </Modal>
    );
}