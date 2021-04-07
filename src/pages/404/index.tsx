import { center } from "@/styles";
import { A, Router } from "@hydrophobefireman/ui-lib";
import { link } from "./404.styles";
export function NotFound() {
  return (
    <div class={center}>
      <div>
        <span>
          The requested URL "{decodeURIComponent(Router.path)}" was not found
        </span>
        <div class={link}>
          <A href="/">Back to the website</A>
        </div>
      </div>
    </div>
  );
}
