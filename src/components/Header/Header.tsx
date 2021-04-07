import { useLocation } from "@/customHooks";
import { A } from "@hydrophobefireman/ui-lib";
import { headerLink } from "./Header.style";

export function Header() {
  const { path } = useLocation();
  return (
    <header>
      {path !== "/" && (
        <A href="/" class={headerLink}>
          Notes
        </A>
      )}
    </header>
  );
}
