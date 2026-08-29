import type {ReactNode} from "react";
import {Slide, ToastContainer} from "react-toastify";
import {useThemeStore} from "@/stores/theme-store.ts";

const theme = useThemeStore(state => state.theme);

export default function Toast(): ReactNode {
return (
    <ToastContainer
        position="bottom-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        transition={Slide}
    />
)
}