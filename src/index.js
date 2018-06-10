import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import PlayerTracker from "./PlayerTracker";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<PlayerTracker />, document.getElementById("root"));
registerServiceWorker();
