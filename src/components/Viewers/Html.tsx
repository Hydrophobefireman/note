import {EditButton} from "@/components/EditButton/EditButton";
import {iframeCss} from "@/components/Viewers/viewers.style";
import {base64ToArrayBuffer} from "@hydrophobefireman/j-utils";
import {useEffect, useState} from "@hydrophobefireman/ui-lib";

const decoder = new TextDecoder();
export function ViewHtml({ungzipped}: {ungzipped: string}) {
  const [bin, setBin] = useState<string>(null);
  useEffect(async () => {
    const ab = await base64ToArrayBuffer(ungzipped);
    setBin(decoder.decode(ab));
  }, [ungzipped]);
  return (
    <>
      <iframe
        class={iframeCss}
        sandbox="allow-scripts allow-forms allow-top-navigation allow-popups allow-modals allow-popups-to-escape-sandbox"
        src={`data:text/html;base64,${ungzipped}`}
      />
      {bin && <EditButton type="html" text={bin} />}
    </>
  );
}
