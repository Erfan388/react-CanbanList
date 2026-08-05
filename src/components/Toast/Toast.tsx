import type {ReactNode} from "react";
import {Slide, ToastContainer} from "react-toastify";


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
        theme="light"
        transition={Slide}
    />
)
}