import {type ReactNode, useState} from "react";

type CounterProps = {
    title: string;
    counternumber: number;
}

export default function Counter({title , counternumber}: CounterProps): ReactNode {

    const [count, setCount] = useState(0)
    const buttonClickHandler = (): void => {
        setCount((count): number => count + 1)
    };

    return (
        <div className="counter">
            <h1 className="title">{title}<span>{counternumber}</span></h1>
            <div className="count">{count}</div>
            <button onClick={buttonClickHandler} className="button">increment</button>
        </div>
    )
}