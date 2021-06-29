import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";
import { ProviderAlert } from "./components/backoffice/layout/Alert";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProviderAlert>
        <App />
      </ProviderAlert>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
