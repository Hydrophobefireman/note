import { Router } from "@hydrophobefireman/ui-lib";
export function NotFound() {
  return (
    <div>
      The requested URL "{decodeURIComponent(Router.path)}" was not found
    </div>
  );
}
