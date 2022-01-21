import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { CookiesProvider } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <App />
        <ToastContainer />
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
