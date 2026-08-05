import {type PropsWithChildren, useState} from "react";
import {CounterContext} from "@/context/counter-context.ts";


type Props = PropsWithChildren;

export default function provideCounterContext({children}: Props) {
    const [count, setCount] = useState(0);
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(0);

    return (
        <CounterContext value={{count, increment, decrement, reset}}>
            {children}
        </CounterContext>
    )
}