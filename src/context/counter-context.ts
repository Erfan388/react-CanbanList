import {createContext} from "react";


type counterContextType = {
    count?: number;
    increment?: () => void;
    decrement?: () => void;
    reset?: () => void;
};

export const CounterContext = createContext<counterContextType>({
   count: 0,
    increment: () => {},
    decrement: ()=>{},
    reset: () => {}
});