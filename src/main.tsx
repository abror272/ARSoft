import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Boot screen (2.1s) paytida 3D fon chunk'ini oldindan yuklab qo'yamiz
void import("./components/GlobeField");

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
