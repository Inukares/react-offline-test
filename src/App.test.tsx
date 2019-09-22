import ReactDOM from "react-dom";
import React from "react";
import { App } from "./App";

describe("App component tests", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
