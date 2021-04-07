import { usePako } from "@/customHooks";
import { center } from "@/styles";
import { arrayBufferToBase64 } from "@hydrophobefireman/j-utils";
import { useEffect, useState } from "@hydrophobefireman/ui-lib";
import { outputWrapper } from "./NewNote.styles";

const typeToPathMap = { html: "h", text: "t" };
function getUrl(type: string, output: string) {
  return new URL(`/${typeToPathMap[type]}/#${output}`, location.href).href;
}
export function Output({ type, text }: { type: string; text: string }) {
  const output = usePakoGzip(text);
  const url = output && getUrl(type, output);
  const [copied, setCopied] = useState(false);
  function copy(t: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    const { currentTarget } = t;
    navigator.clipboard.writeText(currentTarget.dataset.copy);
    setCopied(true);
  }

  return (
    <div class={center}>
      <div class={outputWrapper}>
        <div>
          {output ? (
            <button data-copy={url} onClick={copy}>
              Click to copy your note URL ({url.length} chars){" "}
              {copied && "(copied!)"}
            </button>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
}

function usePakoGzip(text: string) {
  const [output, setOutput] = useState(null);
  const pako = usePako();
  useEffect(() => {
    (async () => {
      if (!pako) return;
      setOutput(await arrayBufferToBase64(pako.gzip(text)));
    })();
  }, [text, pako]);
  return output;
}
