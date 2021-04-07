import { useUnGzip } from "@/customHooks";
import { center, textArea } from "@/styles";
import { css } from "catom";

export default function HtmlViewer() {
  const hash = window.location.hash.substr(1);

  const ungzipped = useUnGzip(hash, true);

  if (!hash.length) return <div>Nothing here...</div>;
  if (!ungzipped) return <div>Loading...</div>;
  return (
    <div class={center}>
      <textarea
        class={[textArea, css({ marginTop: "2rem" })]}
        value={ungzipped}
        readOnly
      />
    </div>
  );
}
