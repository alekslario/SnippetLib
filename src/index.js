import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
/*global chrome*/

chrome.storage.sync.get(["qouterQuotes"], result => {
  const quotes = result["qouterQuotes"] || [];

  chrome.storage.sync.get(["qouterRegex"], result => {
    const regex = result["qouterRegex"] || { text: "", options: "gi" };
    ReactDOM.render(
      <App quotes={quotes} regex={regex} />,
      document.getElementById("root")
    );
  });
});
serviceWorker.unregister();
