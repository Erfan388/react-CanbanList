import {type BoardSlice, createBoardsSlice} from "@/stores/kanban-store/slices/boards-slices.ts";

import type {StateCreator} from "zustand";
import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {createListsSlice, type ListSlice} from "@/stores/kanban-store/slices/lists-slices.ts";
import {createItemsSlice, type ItemsSlice} from "@/stores/kanban-store/slices/items-slices.ts";

export type kanbanStore = BoardSlice & ListSlice & ItemsSlice;

export type kanbanStateCreator<T> = StateCreator<
    kanbanStore,
    [["zustand/immer", never]],
    [],
    T
>;


export const useKanbanStore = create<kanbanStore>()(
    persist(
        immer(
            (...args) =>({
                ...createBoardsSlice(...args),
                ...createListsSlice(...args),
                ...createItemsSlice(...args),
        })),
        {name : "boards"}
    )
);