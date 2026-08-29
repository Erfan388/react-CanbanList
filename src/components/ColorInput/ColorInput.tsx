import {type ComponentProps, type ReactNode, useId, useState} from "react";

import styles from './ColorInput.module.css';
import clsx from "clsx";
import {BOARD_COLORS, type BoardColor} from "@/types/board.ts";
import CheckFillIcon from '@iconify-react/mingcute/check-fill';


type Props = Omit<ComponentProps<'input'>, 'type' | 'value' | 'defaultValue' | "onChange"> & {
    label: string;
    value?: BoardColor;
    defaultValue?: BoardColor;
    error?: string | null;
    onChange?: (value: BoardColor) => void;
}


export default function ColorInput({
                                       className,
                                       error,
                                       label,
                                       value: controlledValue,
                                       defaultValue,
                                       onChange,
                                       ...otherProps
                                   }: Props): ReactNode {
    const [uncontrolledValue, setUncontrolledValue] = useState<BoardColor>(defaultValue ?? 'blue');

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const id = useId();

    const handleButtonClick = (color: BoardColor): void => {
        if (!isControlled) {
            setUncontrolledValue(color);
        }

        onChange?.(color);
    }

    console.log("current value:", value);

    return <div className={clsx(styles['color-input'], !!error && styles.error, className)}>
        <label htmlFor={id}>{label}</label>
        <div className={styles.colors}>
            {
                BOARD_COLORS.map(color => (
                    <button key={color} className={clsx(color, color === value && styles.active)} type='button'
                            onClick={() => handleButtonClick(color)}>
                        {color === value && <CheckFillIcon width="20" height="20" color={color} />}
                    </button>
                ))
            }
        </div>
        <input id={id} type='hidden' value={value} {...otherProps} placeholder="enter yout text"/>
        <span className={styles.error}>{error || "\u00A0"}</span>
    </div>;
}