import React from "react";
import ReactDOM from "react-dom";
// @ts-expect-error TS(2307): Cannot find module 'react-redux' or its correspond... Remove this comment to see the full error message
import { Provider } from "react-redux";
import App from "../src/App";
import store from "../src/components/redux/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
