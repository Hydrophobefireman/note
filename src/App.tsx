// javascript is supported
import "./App.css";

import { VNode, render } from "@hydrophobefireman/ui-lib";

import { RouteLoader } from "./components/RouteLoader";

function App(): VNode {
  return (
    <main>
      <RouteLoader />
    </main>
  );
}

render(<App />, document.getElementById("app-mount"));
