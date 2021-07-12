import { ViewText } from "@/components/Viewers/Text";
import { useUnGzip } from "@/customHooks";

export default function HtmlViewer() {
  const hash = window.location.hash.substr(1);
  const ungzipped = useUnGzip(hash, true);

  if (!hash.length) return <div>Nothing here...</div>;
  if (!ungzipped) return <div>Loading...</div>;
  return <ViewText ungzipped={ungzipped} />;
}
