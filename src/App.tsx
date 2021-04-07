// javascript is supported
import "./App.css";

import { VNode, render } from "@hydrophobefireman/ui-lib";
import { RouteLoader } from "./components/RouteLoader";
import { Header } from "./components/Header/Header";
import { Motion } from "@hydrophobefireman/ui-anim";

function App(): VNode {
  return (
    <Motion>
      <Header />
      <RouteLoader />
    </Motion>
  );
}

render(<App />, document.getElementById("app-mount"));
