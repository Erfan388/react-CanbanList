import {createContext} from "react";

type ContextValue = {
    isCollapsed: boolean;
}


export const SideBarContext = createContext<ContextValue>({} as ContextValue);