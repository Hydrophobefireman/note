import { EditButton } from "@/components/EditButton/EditButton";
import { iframeCss } from "@/components/Viewers/viewers.style";
import { useMemo } from "@hydrophobefireman/ui-lib";
export function ViewHtml({ ungzipped }: { ungzipped: string }) {
  return (
    <>
      <iframe
        class={iframeCss}
        sandbox="allow-scripts allow-forms allow-top-navigation allow-popups allow-modals allow-popups-to-escape-sandbox"
        src={`data:text/html;base64,${ungzipped}`}
      />
      <EditButton
        type="html"
        text={useMemo(() => window.atob(ungzipped), [ungzipped])}
      />
    </>
  );
}
