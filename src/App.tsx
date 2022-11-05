import "@hydrophobefireman/kit/styles";

// javascript is supported
import "./App.css";

import {Motion} from "@hydrophobefireman/ui-anim";
import {VNode, render} from "@hydrophobefireman/ui-lib";

import {Header} from "./components/Header/Header";
import {RouteLoader} from "./components/RouteLoader";
// import "@hydrophobefireman/kit/css-reset";




function App(): VNode {
  return (
    <Motion>
      <Header />
      <RouteLoader />
    </Motion>
  );
}

render(<App />, document.getElementById("app-mount"));
