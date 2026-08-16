import type {BoardType} from "@/types/board.ts";

export const boardsData: BoardType[] = [

    {
        id: "board-1",
        title: "sprint tasks",
        description: "welcome to jefery epstin website the site is full of MR. jeff boards.",
        color: "blue",
        lists: [
            {
                id: '1',
                title: "🟦 To Do",
                items: [
                    {id: '1', title: 'Setup Frontend Project', description: "", duaDate: ""},
                    {id: '2', title: 'Setup and Frontend Project', description: "", duaDate: ""},
                    {id: '3', title: 'Setup and Frontend Project', description: "", duaDate: ""},
                    {id: '4', title: 'Setup and Frontend Project', description: "", duaDate: ""},
                    {id: '5', title: 'Setup Frontend and Project', description: "", duaDate: ""}
                ]
            },
            {
                id: '2',
                title: "🔨 Doing",
                items: [
                    {id: '6', title: 'welcome to the ', description: "test test", duaDate: ""},
                    {id: '7', title: 'three thousend world', description: "", duaDate: ""},
                    {id: '8', title: 'three thousend world', description: "", duaDate: ""},
                    {id: '9', title: 'three thousend world', description: "", duaDate: ""},
                ]
            },
            {
                id: '3',
                title: "🎉 Done",
                items: [
                    {id: '10', title: 'Im alright ', description: "", duaDate: ""},
                    {id: '11', title: 'Im alright ', description: "", duaDate: ""},
                    {id: '12', title: 'Im alright ', description: "", duaDate: ""},
                ]
            }
        ]
    },
    {
        id: "board-2",
        title: "sprint tasks",
        description: "welcome to jefery epstin website the site is full of MR. jeff boards.",
        color: "yellow",
        lists: []
    },
    {
        id: "board-3",
        title: "sprint tasks",
        description: "welcome to jefery epstin website the site is full of MR. jeff boards.",
        color: "green",
        lists: []
    }
];