import {createRoot} from "react-dom/client";

import {StrictMode} from "react";

import {BrowserRouter} from "react-router";

import App from "./App.tsx";

import "./index.css";
import "./syles/color.css";
import "./syles/shapes.css";
import "./syles/shadow.css";
import "./syles/typography.css"
import {ErrorBoundary} from "react-error-boundary";
import Toast from "@/components/Toast/Toast.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ErrorBoundary fallback={<div>there is a sheety problem</div>}>
            <BrowserRouter>
                <App/>
                <Toast />
            </BrowserRouter>,
        </ErrorBoundary>
    </StrictMode>
);
