import { useUnGzip } from "@/customHooks";
import { useState } from "@hydrophobefireman/ui-lib";
import { confDialog, iframeCss } from "./viewers.style";

export default function HtmlViewer() {
  const hash = window.location.hash.substr(1);

  const ungzipped = useUnGzip(hash);
  const [hasAgreed, setAgreed] = useState(false);

  if (!hasAgreed)
    return (
      <div class={confDialog}>
        <div>Are you sure you want to proceed?</div>
        <div>
          The contents of this page can be dangerous, they're not verified, and
          you should treat it like any dangerous {"<iframe>"}
        </div>
        <button onClick={() => setAgreed(true)}>I Understand</button>
      </div>
    );
  if (!hash.length) return <div>Nothing here...</div>;
  if (!ungzipped) return <div>Loading...</div>;
  return (
    <iframe
      class={iframeCss}
      sandbox="allow-scripts allow-forms allow-top-navigation allow-popups allow-modals allow-popups-to-escape-sandbox"
      src={`data:text/html;base64,${ungzipped}`}
    />
  );
}
