import {
  AsyncComponent,
  ComponentType,
  Path,
  Router,
  useMemo,
} from "@hydrophobefireman/ui-lib";

import { ChunkLoading } from "../ChunkLoadingComponent";
import { NotFound } from "@/pages/404";
import { Object_entries as entries } from "@hydrophobefireman/j-utils";

const getDefault: <T>(mod: { default: T }) => T = (mod) => mod.default;

// lazy load routes here
const componentMap = {
  "/": () => import("@/pages/Landing").then(getDefault),
  "/new/html": () => import("@/pages/NewNote/HtmlNote").then(getDefault),
  "/new/text": () => import("@/pages/NewNote/TextNote").then(getDefault),
  "/h": () => import("@/pages/Viewers/HtmlViewer").then(getDefault),
  "/t": () => import("@/pages/Viewers/TextViewer").then(getDefault),
};

export function RouteLoader() {
  return (
    <Router fallbackComponent={NotFound}>
      {entries(componentMap).map(([path, comp]) => (
        <Path match={path} component={RouteComponent} render={comp} />
      ))}
    </Router>
  );
}

function RouteComponent({ match, render, params }) {
  const func = useMemo(() => (R: ComponentType) => <R params={params} />, [
    params,
  ]);
  return (
    <main data-app-state={match} class="route-section">
      <AsyncComponent
        componentPromise={() => render().then(func)}
        fallback={ChunkLoading}
      />
    </main>
  );
}
