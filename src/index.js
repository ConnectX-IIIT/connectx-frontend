import React from "react";
import ReactDOM from "react-dom";
import "./styles/Landing/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StateProvider } from "./helper/state_provider";
import reducer, { initialState } from "./helper/reducer";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// cassita

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
